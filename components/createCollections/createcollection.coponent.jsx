import * as React from "react";
import styles from "../../styles/components/createCollection/createCollection.module.scss";
import { getCurrentWalletConnected, walletConnection } from "../../utils/walletConnection";
import Web3 from 'web3';
import { useRouter } from "next/router";
import { collectionAbi, collection1155Abi } from "../../contractsABI/abi";
import { dataBytes, dataByte1155 } from "../../contractsABI/bytes";
import { handleValidation } from "./validation";
import CreateCollectionBottom from "./sections/collectionBottom.component";
import CreateCollectionTop from "./sections/collectionTop.component";
import { useDispatch, useSelector } from "react-redux";
import { addCollection } from "../../redux/collection/collection.actions"
import { fetchWalletActiveNetworks } from "../../redux/wallet-networks/wallet-networks.actions";
import { fetchNetwork } from "../../utils/network-switch";
import { useAuth } from "../../contexts/auth.context.jsx";
import { createPostReq } from "../../apis/factory.api";
import { FETCH_CATEGORY_LIST } from "../../apis/variables";
import AWS from 'aws-sdk'
import Alert from "../layout/Modal";

export default function CreateCollectionComponent() {
  const [formInput, setFormInput] = React.useState({
    collectionName: '', 
    collectionUrl: '', 
    collectionSymbol: '', 
    description: '', 
    collectionUrl: '',
    logo:null,
    bannerImage:null,
    featuredImage:null
  });

  AWS.config.update({
    accessKeyId: 'AKIA22UH35GJZH4BHB74',
    secretAccessKey: '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'
  })
  const S3_BUCKET = 'nft-paltform'
  const REGION = 'us-west-1'
  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  })

  const { user } = useAuth();
 
  const [isLoading, setLoading] = React.useState(false);
  const [isError, setError] = React.useState({ activeStep: 0, error: false, errorMessage: {} });
  const [walletAddress, setWalletAddress] = React.useState(null);
  const [step, setStep] = React.useState(1);
  const [txHash, setTxHash] = React.useState('')
  const [walletUserID, setWalletUserID] = React.useState(null)
  const [network, setNetwork] = React.useState('0x4');
  const [categoryId, setCategoryId] = React.useState('');
  const [categoryList, setCategoryList] = React.useState([]);
  const [isAlert, setAlert] = React.useState("");
  const [isProgress,setProgress] = React.useState({})

  const router = useRouter();
  const { contract_type } = router.query;
  let contractType = contract_type?.split("-")?.length>0?contract_type?.split("-")[1]:""
  const dispatch = useDispatch();
  var walletDetails = useSelector(state => state.addUserWalletReducer)
  var networksDetails = useSelector(state => state.walletNetworksReducer)

  React.useEffect(async () => {
    if (walletDetails && walletDetails.userId) {
      setWalletUserID(walletDetails.userId)
    } else {
      user ? setWalletUserID(user) : router.push('/connectWallet');
    }
    dispatch(fetchWalletActiveNetworks())
    const walletChainId = await fetchNetwork();
    setNetwork(walletChainId)

    //fetch categories
    createPostReq(FETCH_CATEGORY_LIST, { pageNo: 1, limit: 20 })
      .then(res => {
        setCategoryList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])



  const validate = () => {
    const val = handleValidation(formInput, setError, isError, deployCollection,'test');
    return val
  }

  const onFileChange = async (e) => {
    const file = e.target.files[0]
    const type = e.target.name

    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test((file?.name.split('.').pop()+"")?.toLowerCase());
    
    if(file && !extname){
      alert("Invalid file type!")
    }else if(file && type){
      setFormInput((s)=>({...s,[type]:file}))
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
      }
      fileReader.readAsDataURL(file);
      uploadToS3(file, type)
    }
  }

  const uploadToS3=(file, type)=>{
    setLoading(true)
    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name,
        // ContentType: 'image/png'
    };

    myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
           setProgress((prevState)=>({...prevState,[type]:Math.round((evt.loaded / evt.total) * 100)}))
        })
        .promise()
        .then(res=>{
            console.log(res)
            const imageUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file.name}`
            setFormInput((s)=>({...s,[type]:imageUrl}))
            setProgress((s)=>({...s,[type]:0}))
            setLoading(false)
        }).catch(
          function(err) {
            setProgress((s)=>({...s,[type]:0}))
            console.error(err, err.stack);
        });
        // .send((err) => {
        //     if (err) console.log(err)
        // })
        // console.log(`https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file.name}`);

}

  const fetchNetworkIdFromChainId = () => {
    const networkObj = networksDetails.activeNetworks.filter(x => {
      return x.chainId === network
    })
    console.log(networkObj[0]._id)
    return networkObj[0]
  }

  const deployCollection = async () => {
    handleStep()
    if(validate()){


    setLoading(true)
    const { address } = await getCurrentWalletConnected();
    if (!address) {
      const walletResponse = await walletConnection()
      setWalletAddress(walletResponse.address)
      dispatch(setUserWalletDetails({ walletAddress: walletResponse.address }))
    } else {
      setWalletAddress(address)
    }

    const networkChainId = await fetchNetwork();
    console.log(networkChainId)

    await window.ethereum.enable()
    console.log(contractType, typeof (contractType), 'contractType')
    const web3 = new Web3(window.ethereum);
    const ABI = contractType === '721' ? collectionAbi : collection1155Abi;
    const collectionContract = new web3.eth.Contract(ABI);

    const DATABYTE = contractType === '721' ? dataBytes : dataByte1155
    const payload = {
      data: DATABYTE,
      arguments: [formInput.collectionName, formInput.collectionSymbol]
    }
    const parameter = {
      from: walletAddress || address,
      gas: 5000000
    }
    let newTxHash = ''
    try {
      collectionContract.deploy(payload).send(parameter, (err, transactionHash) => {
        if (err) {
          setLoading(false)
          return console.log(err)
        }
        setTxHash(transactionHash)
        newTxHash = transactionHash
      }).on('confirmation', () => { }).then((newContractInstance) => {
        setLoading(false)
        
        addCollectionBackend(newContractInstance.options, newTxHash)
      })
    }
    catch (err) {
      setLoading(false)
    }
     }
  }

  const addCollectionBackend = (deployedContractInstance, newTxHash) => {
    const fetcedNetworkId = fetchNetworkIdFromChainId()
    setLoading(true)
    let PAYLOAD = {
      name: formInput.collectionName, tokenSymbol: formInput.collectionSymbol, url: formInput.collectionUrl, description: formInput.description, 
      address: deployedContractInstance?.address, contractABI: deployedContractInstance?.jsonInterface, 
      userId: user._id, networkId: fetcedNetworkId._id, 
      hash: txHash || newTxHash, collectionType: contractType === '721' ? 'single' : 'multiple',
      featuredImage: formInput?.featuredImage, bannerImage: formInput?.bannerImage, logo: formInput?.logo
    }
    categoryId && (PAYLOAD = { ...PAYLOAD, categoryId: categoryId })
    setAlert("Collection created successfully!")
    setTimeout(()=>router.push(`/create-item/${contractType === '721' ? 'single' : 'multiple'}`),2000)
    dispatch(addCollection(PAYLOAD))
      .then(res => {
        setLoading(false)
      })
      .catch(err => {
        setAlert("")
        setLoading(false)
      })
  }

  const handleStep = (type) => {
    if (type === 'back') {
      setCategoryId('')
      setStep(() => step - 1)
      window.scrollTo(0, 0)
    } else {
      const val = validate();
      if (!val) return
      setStep(() => step + 1)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div>
      <div className="blueBgPage">
        <div className="top-space-header">
          <div className="customContainer1 col-box">
            <div className={styles.stepContainer}>
              {isAlert?<Alert textMessage={isAlert} onClose={()=>{setAlert("");}}/>:null}
              
               <CreateCollectionTop
                  deployCollection={deployCollection}
                  onFileChange={onFileChange}
                  validate={validate}
                  formInput={formInput}
                  setFormInput={setFormInput}
                  isProgress={isProgress}
                  isError={isError}
                  isLoading={isLoading}
                  handleStep={handleStep}
                /> 

                <CreateCollectionBottom
                    validate={validate}
                    handleStep={handleStep}
                    isError={isError}
                    deployCollection={deployCollection}
                    isLoading={isLoading}
                    setNetwork={setNetwork}
                    network={network}
                    categoryList={categoryList}
                    setCategoryList={setCategoryList}
                    setCategoryId={setCategoryId}
                  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
