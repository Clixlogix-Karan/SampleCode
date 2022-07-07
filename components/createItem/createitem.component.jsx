import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import styles from "../../styles/components/createItem/createitem.module.scss";
import { styled } from "@mui/material/styles";
import Paper from '@mui/material/Paper';
import IconButton from "@mui/material/IconButton";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertBox from '../../components/layout/Modal';
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Web3 from 'web3';
import { useRouter } from 'next/router'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import PropertyInput from './PropertyInput'

const client = ipfsHttpClient('');

import SwitchUnstyled, {
  switchUnstyledClasses,
} from "@mui/base/SwitchUnstyled";
import { addWalletListener, getCurrentWalletConnected, Injected, walletConnection } from "../../utils/walletConnection";
import { useEffect } from "react";
import { FormHelperText } from "@mui/material";
import Link from "next/link";
import { switchNetwork, fetchNetwork } from "../../utils/network-switch";
import { fetchWalletActiveNetworks } from "../../redux/wallet-networks/wallet-networks.actions";
import { createGetReq, createPostReq, createPostReqWithParams, updatePatchReq } from "../../apis/factory.api";
import { FETCH_COLLECTIONS_USER, CREATE_TOKEN, CREATE_NFT_MARKET_ITEM, FETCH_ITEM_DETAIL, UPDATE_NFT_MARKET_ITEM } from "../../apis/variables";
import { useAuth } from "../../contexts/auth.context.jsx";
import path from 'path'
import ChooseTypeInput from "./ChooseTypeInput";
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector";

export default function CreateItemComponent({ edit }) {

  const { active, chainId, account, activate} = useWeb3React();
  const { user } = useAuth();
  const [web3, setWeb3] = useState(null);
  const [fileUrl, setFileUrl] = useState(null)
  const [image, setImage] = useState(null)
  const [formInput, updateFormInput] = useState({ name: '', description: '', collectionId: '', networkId: '', supply: 1, blockchain: '', collection: '', externalLink: '', freezeMetaData: '' })
  const [expanded, setExpanded] = React.useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [collectionId, setCollectionId] = useState(null);
  const [status, setStatus] = useState('');
  const [metamaskNetworks, setMetamaskNetworks] = useState([]);
  const [collectionsList, setCollectiondList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState({ activeStep: 0, error: false, errorMessage: {} });
  const [walletUserID, setWalletUserID] = useState(null);
  const [personName, setPersonName] = React.useState([]);

  const [properties, setProperties] = React.useState([{ type: '', name: '' }])
  const [isAlert, setAlert] = React.useState("")
  // const [isRedirect,setRedirect] = React.useState(false) 
  // const [itemId,setItemId] = React.useState("") 

  const router = useRouter();
  const { contract_type, item_id } = router.query;
  // const new_item_id = router.query.item_id
  const dispatch = useDispatch();
  var networkDetails = useSelector(state => state.walletNetworksReducer);

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const theme = useTheme();

  useEffect(async()=>{
      if(localStorage.getItem('isWalletConnected') == 'true'){
        await activate(Injected)
      }else{
        alert("🦊 Connect to a Wallet using the top right button.");
        router.push('/connectWallet')
        return
      }
  },[active,chainId,account,metamaskNetworks])

  // React.useEffect(()=>{
  //   if(isRedirect==true && itemId){
  //      router.push(`/item/${itemId}`)
  //   }
  // },[isRedirect,itemId])

  useEffect(async () => {
    if (user) {
      setWalletUserID(user)
      console.log(user)
    }
    const web3 = new Web3(window.ethereum);
    setWeb3(web3)
    dispatch(fetchWalletActiveNetworks(fetchWalletActiveNetworks()))
  }, []);

  useEffect(async () => {
    if (!account || !chainId) return
    const network = metamaskNetworks.filter(item => {
      return item.chainId === ('0x' + chainId);
    })
    if (!network.length) return
    updateFormInput({ ...formInput, networkId: network[0]._id })
    setWalletAddress(account)
  }, [chainId,account,metamaskNetworks])

  useEffect(() => {
    if (edit && router.query.item_id) {
      createPostReqWithParams(FETCH_ITEM_DETAIL, { id: item_id })
        .then(res => {
          console.log("asdasdasdasd", res?.data)
          let data = res?.data
          if (data?.properties?.length > 0) {
            setProperties(data?.properties)
            delete data?.properties
          }
          updateFormInput({ ...data, collectionId: data?.collectionId?._id, collection: typeof data?.collectionId?.name === "string" ? data?.collectionId?.name.split(",") : data?.collectionId?.name, networkId: data?.networkId?._id, freezeMetaData: data.freezeMetaData })
        })
        .catch(err => {
        })
    }
  }, [router.query]);


  React.useEffect(async () => {
    if (formInput.networkId && contract_type) {
      updateFormInput({ ...formInput, collection: '', collectionId: '' })
      createPostReqWithParams(FETCH_COLLECTIONS_USER, { networkId: formInput.networkId, userId: user._id, collectionType: contract_type })
        .then(res => {
          setCollectiondList(res.data)
        }).catch(err => {
          // alert('Error while fetching collections')
        })
    }
  }, [formInput.networkId, contract_type, isLoading])

  //Network Details useEffect
  useEffect(async () => {
    if (networkDetails.activeNetworks && networkDetails.activeNetworks.length > 0) {
      setMetamaskNetworks(networkDetails.activeNetworks)
    }
  }, [networkDetails, networkDetails.activeNetworks, networkDetails.activeNetworks.length > 0]);


  const handleCollectionChange = (event) => {
    const {
      target: { value },
    } = event;
    updateFormInput(
      // On autofill we get a stringified value.
      { ...formInput, collection: typeof value === "string" ? value.split(",") : value }
    );
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0]
    // JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF
    const filetypes = /jpeg|jpg|jpeg|jfif|png|gif|svg|webp/;
    const extname = filetypes.test((file?.name.split('.').pop() + "")?.toLowerCase());
    // console.log('file',file)
    // console.log('extname',extname)

    if (file && !extname) {
      setAlert("Invalid file type!")
    } else if (file) {
      setFileUrl(file)
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        setImage(e.target.result);
      }
      fileReader.readAsDataURL(file);
    }
  }

  const mintNFT = async (file) => {
    // console.log(formInput.collectionId)
    console.log(collectionId)
    console.log(formInput.collectionId)
    setLoading(true);
    // const { address, status } = await getCurrentWalletConnected();
    // if (!address) {
    //   const walletResponse = await walletConnection()
    //   setWalletAddress(walletResponse.address)
    // } else {
    //   setWalletAddress(address)
    // }
    //upload to ipfs
    if (edit) {
      updateNftToken()
    } else {
      try {
        const added = await client.add(file)
        const tokenURI = `https://ipfs.infura.io/ipfs/${added.path}`
        /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
        addNftItem(account, tokenURI)
      } catch (error) {
        console.log('Error uploading file: ', error)
      }
    }
  }

  const addNftItem = async (address, tokenURI) => {
    setLoading(true);
    let propertiesList = properties?.filter((v) => ((v?.type + "")?.trim() != '') && ((v?.name + "")?.trim() != ''))

    const payload = {
      item: {
        name: formInput.name, externalLink: formInput.externalLink || '', description: formInput.description || '',
        collectionId: collectionId, networkId: formInput.networkId,
        address: formInput.collection_address, freezeMetaData: formInput.freezeMetaData || "", supply: formInput.supply,
        properties: propertiesList?.length > 0 ? propertiesList : []
      },
      itemToken: {
        imageUrl: tokenURI, networkId: formInput.networkId,
        address: walletAddress || address
      }
    }
    createPostReq(CREATE_NFT_MARKET_ITEM, payload).then(res => {
      console.log(res)
      setLoading(false)
      setAlert("NFT item is added successfully!")
      // setItemId(res.data.item._id)
      setTimeout(() => router.push(`/item/${res.data.item._id}`), 2000)
    }).catch(err => {
      if (err?.response?.data?.message) {
        setAlert(err?.response?.data?.message)
      }
      // alert(err.message)
      setLoading(false);
    })
  }

  const updateNftToken = (address) => {
    setLoading(true);
    let propertiesList = properties?.filter((v) => ((v?.type + "")?.trim() != '') && ((v?.name + "")?.trim() != ''))

    const payload = {
      item: {
        name: formInput.name, externalLink: formInput.externalLink || '', description: formInput.description || '',
        collectionId: collectionId || formInput.collectionId, networkId: formInput.networkId,
        address: formInput.collection_address, freezeMetaData: "1", onSale: false,
        properties: propertiesList?.length > 0 ? propertiesList : []
      },
      itemToken: {
        imageUrl: formInput.tokenId?.imageUrl, networkId: formInput.networkId,
        address: walletAddress || address
      }
    }
    updatePatchReq(UPDATE_NFT_MARKET_ITEM, payload, { itemId: item_id, itemTokenId: formInput.tokenId?._id }).then(res => {
      setLoading(false)
      // setItemId(item_id)
      // router.push(`/item/${item_id}`)
      setAlert("NFT item is updated successfully!")
      setTimeout(() => router.push(`/item/${item_id}`), 2000)
    }).catch(err => {
      if (err?.response?.data?.message) {
        setAlert(err?.response?.data?.message)
      }
      setLoading(false);
    })
  }

  const setProvider = (value) => {
    // Mumbai: 0x13881, rinkby : 0x4;
    const nets = metamaskNetworks.filter(item => {
      return item._id === value;
    })
    if (!nets.length) return console.log('no match found')
    switchNetwork(nets[0]?.chainId)
  }

  const handleValidation = () => {
    //field Validation
    let error = false;
    if (formInput.name === '') {
      error = true;
      setError({
        ...isError,
        error: true,
        errorMessage: { ...isError.errorMessage, name: "NFT name can't be empty" }
      })
    }
    if (!edit && !fileUrl) {
      error = true;
      setError({
        ...isError,
        error: true,
        errorMessage: { ...isError.errorMessage, file: "Please add a file" }
      })
    }
    if (!formInput.networkId) {
      error = true;
      setError({
        ...isError,
        error: true,
        errorMessage: { ...isError.errorMessage, blockchain: "Please add a blockchain network" }
      })
    }
    if (!formInput.collection) {
      error = true;
      setError({
        ...isError,
        error: true,
        errorMessage: { ...isError.errorMessage, collection: "Please add a collection" }
      })
    }
    if (!formInput.supply || (formInput.supply < 1)) {
      error = true;
      setError({
        ...isError,
        error: true,
        errorMessage: { ...isError.errorMessage, suuply: "Invalid input, Supply should be 1 or greater." }
      })
    }
    if (!error) {
      //add else if for validating other fields (if any)
      setError({
        activeStep: isError.activeStep + 1,
        error: false,
        errorMessage: {}
      });
      //calling mint NFt if field validation are done.
      mintNFT(fileUrl)
    } else {
      setError({
        ...isError,
        error: true,
        errorMessage: { ...isError.errorMessage, validationError: "Please fix the error in fields above and try again" }
      })
      console.log(isError)
      return
    }
  }

  const handleSelectCollection = (obj) => {
    // console.log(obj)
    updateFormInput({ ...formInput, collectionId: obj._id, collection_address: obj.address })
    setCollectionId(obj._id)
  }

  const handleSelectNetwork = (e) => {
    setProvider(e.target.value)
    updateFormInput({ ...formInput, networkId: e.target.value })
  }


  const addProperty = () => {
    setProperties(() => [...properties, { type: '', name: '' }])
  }

  const removeProperty = (index) => {
    setProperties(properties?.filter((p, i) => i != index))
  }

  const handlePropertyChange = (e, index) => {
    const newArr = [...properties]
    newArr[index][e.target.name] = e.target.value
    setProperties(newArr)
  }

  const closeIconStyle = {
    display: 'block',
    position: 'absolute',
    zIndex: 999,
    display: 'flex',
    right: 508,
    bottom: 87,
    fontSize: 14,
    background: '#7359ce',
    borderRadius: 50,
    padding: '3px 5px',
    color: 'white',
    cursor: 'pointer'
  }

  const removeBtn = {
    display: 'block',
    marginLeft: 'auto',
padding: '5px 6px 0px',
color: 'white',
fontSize: 18,
height: 35,
borderRadius: 50,
cursor:'pointer'
}

  // const clearImage = () => {
  //   setImage("")
  // }

  const clearImage=(e)=>{
    e.preventDefault();
    setImage("")
    setFileUrl(null)
}

  return (
    <div>
      <div className="blueBgPage">
        <div className="top-space-header">
          <div className="customContainer1 createItemMain">
            {isAlert ? <AlertBox textMessage={isAlert} onClose={() => { setAlert(""); }} /> : null}

            <div className={styles.createItemHeader}>
              <div className="main-heading text-center">
                <h2>{edit ? 'Edit' : 'Create New'} Item</h2>
                <p className="subHeading textBlue">*Required fields</p>
              </div>
            </div>
            <div className={styles.createItemHeader}>
              <div className="main-heading" style={{ color: '#fff' }}>
                <p><strong>Choose Type</strong></p>
                <ChooseTypeInput />
              </div>
            </div>
            <div className={styles.createNewItemWrp}>
              <div className={styles.fileupload}>
                <Stack direction="row" className="uploadItemFile">
                  {
                    <Item style={{ width: '100%' }}>
                      <h3>Image, Video, Audio, or 3D Model*</h3>
                      <p>
                        File type supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3,
                        WAV, OGG, GLB, GLTF
                      </p>
                      <label
                        htmlFor="contained-button-file"
                        className="fileContainer"
                        style={image || formInput.tokenId?.imageUrl ? { height: 300 } : {}}
                      >
                        {
                          image || formInput.tokenId?.imageUrl ? (
                            <>
                            <span className="fa fa-close" onClick={(e)=>clearImage(e,name)} style={removeBtn}></span>
                              <h3>File Preview</h3>
                              <div class="nft-preview-file">
                                {(image || formInput.tokenId?.imageUrl) && <img src={edit ? formInput.tokenId?.imageUrl : image} alt="nft-file" style={{ width: "223px", height: '223px', zIndex: 0 }} />}
                              </div>
                              <Input
                                id="contained-button-file"
                                type="file"
                                accept="image/*"
                                onChange={onFileChange}
                              />
                            </>
                          ) : <>
                            <Input
                              id="contained-button-file"
                              type="file"
                              accept="image/*"
                              onChange={onFileChange}
                            />
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <FileUploadOutlinedIcon className="uploadicon" />
                            </IconButton>
                            <Button component="div" className="dropdrag">
                              {fileUrl ? fileUrl.name : 'Drop your NFT image here or click to upload'}
                            </Button>
                            <span className="maxsize">Max size: 100 MB</span>
                          </>
                        }

                      </label>
                    </Item>
                  }




                </Stack>
                <span className={styles.fileError}>{(!fileUrl && isError.error) && "File can't be empty"}</span>
              </div>


              {/*blockchain*/}
              <div className="selectWrp">

                <FormControl fullWidth disabled={edit}>
                  <InputLabel style={{ color: 'white' }} id="Blockchain">Blockchain *</InputLabel>
                  <Select
                    displayEmpty
                    size="small"
                    value={formInput?.networkId}
                    input={<FilledInput size="small" InputLabelProps={{ style: { color: '#fff' } }} sx={{ input: { color: '#ffffff' } }} color='secondary' />}
                    MenuProps={MenuProps}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    sx={{ input: { color: '#ffffff' } }}
                    label={'Blockchain *'}
                    onChange={handleSelectNetwork}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {metamaskNetworks.map((x, i) => (
                      <MenuItem
                        key={x.chainName + i + 1}
                        value={x._id}
                        style={getStyles(x.chainName, personName, theme)}
                      >
                        {x.chainName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              {/*collection*/}
              <div className="selectWrp">
                {/*<label className="inputLabel">Collection <span>*</span></label>*/}
                <p className="inputSugg">
                  <div className="info">
                    This is the collection where your item will appear.
                    <Link href={`/create-collection/${contract_type === 'single' ? '721' : '1155'}`}>
                      <InfoOutlinedIcon style={{ cursor: 'pointer' }} />
                    </Link>
                  </div>
                </p>
                <FormControl variant="filled" fullWidth>
                  {/*<InputLabel id="Collection">Collection *</InputLabel>*/}
                  <Select
                    displayEmpty
                    size="small"
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={formInput.collection}
                    defaultValue={formInput.collection}
                    onChange={handleCollectionChange}
                    input={<FilledInput size="small" color='secondary' secondaryColor='secondary' />}
                    renderValue={(selected) => {
                      if (!selected) {<span className="fa fa-close" onClick={(e)=>clearImage(e)} style={removeBtn}></span>
                        return (
                          <span style={{ color: 'white' }} className="placeholder-select">
                            Select collection
                          </span>
                        );
                      }

                      return selected.join(", ");
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="">
                      <span className="placeholder-select">
                        Select collection
                      </span>
                    </MenuItem>
                    <MenuItem value="">
                      <span className="placeholder-select">
                          <Button onClick={()=>router.push(`/create-collection/erc-${contract_type === 'single' ? '721' : '1155'}`)} className={styles.createBtn}>Create a collection</Button>
                      </span>
                    </MenuItem>
                    {collectionsList?.map((obj, i) => (
                      <MenuItem
                        key={obj.name + i}
                        value={obj.name}
                        style={getStyles(name, personName, theme)}
                        onClick={() => handleSelectCollection(obj)}
                      >
                        {obj.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>



              <Grid container spacing={2} style={{ marginBottom: 30 }}>
                <Grid item xs={6}>
                  <div className="inputwrp">
                    {/*<label className="inputLabel">
                  Name<span>*</span>
                </label>*/}
                    <TextField
                      size="small"
                      fullWidth
                      id="name"
                      label="Name *"
                      InputLabelProps={{ style: { color: '#fff' } }}
                      variant="filled"
                      type='text'
                      inputProps={{ maxLength: 20 }}
                      error={isError.error && isError.error}
                      helperText={
                        (!formInput.name && isError.error) && "Name can't be empty"
                      }
                      value={formInput.name}
                      onChange={(e) => { updateFormInput({ ...formInput, name: e.target.value }) }}
                    />
                    <span style={{ fontSize: 14, marginTop: 5, float: 'right', color: 'white' }}>{formInput.name ? formInput.name?.length : 0}/20</span>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="inputwrp">
                    {/*<label className="inputLabel">External link</label>
                <p className="inputSugg">
                  Polygon NFTs will include a link to this URL on this item’s
                  detail page, so that user can click to learn more about it.
                  you are welcome to link to your own webpage with more details.
                </p>*/}
                    <TextField
                      size="small"
                      fullWidth
                      label="Link *"
                      InputLabelProps={{ style: { color: '#fff' } }}
                      id="standard-bare"
                      variant="filled"
                      placeholder="https://yoursite,io/item/123"
                      value={formInput.externalLink}
                      onChange={(e) => { updateFormInput({ ...formInput, externalLink: e.target.value }) }}
                    />
                  </div>
                </Grid>
              </Grid>



              <div className="inputwrp">
                {/*  <label className="inputLabel">Description</label>
                <p className="inputSugg">
                  The description will be included on the item’s detail page
                  underneath its image. <a href="">Markdown</a> syntax is
                  supported.
                </p>*/}
                <div className="">
                  <TextField
                    size="small"
                    multiline
                    rows={6}
                    label="Description"
                    InputLabelProps={{ style: { color: '#fff' } }}
                    fullWidth
                    variant="filled"
                    aria-label="minimum height"
                    value={formInput.description}
                    onChange={(e) => { updateFormInput({ ...formInput, description: e.target.value }) }}
                  />
                </div>
              </div>

              <div className="accordionCreateItem">
                <div className="inputwrp">
                  <label className="inputLabel">Properties</label>

                  <div className="blue-bg contianer" style={{ padding: 15, borderRadius: 10 }}>
                    {properties?.map((value, index) => <PropertyInput handleChange={(e) => handlePropertyChange(e, index)} removeProperty={removeProperty} addProperty={addProperty} index={index} value={value} styles={styles} />)}
                  </div>
                </div>
                {/*<Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChangeAccordion("panel1")}
                  className="according-wrp"
                >
                  <AccordionSummary
                    expandIcon={
                      expanded === "panel1" ? (
                        <MinimizeIcon className="minues" />
                      ) : (
                        <AddIcon />
                      )
                    }
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <div className="createItemTopHeading">
                      <h4>Properties</h4>
                      <p>Textual traits that show up as rectangles</p>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam
                      mattis feugiat. Aliquam eget maximus est, id dignissim
                      quam.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={handleChangeAccordion("panel2")}
                  className="according-wrp"
                >
                  <AccordionSummary
                    expandIcon={
                      expanded === "panel2" ? (
                        <MinimizeIcon className="minues" />
                      ) : (
                        <AddIcon />
                      )
                    }
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                  >
                    <div className="createItemTopHeading">
                      <h4>Levels</h4>
                      <p>Numerical traits that show as a progress bar</p>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Donec placerat, lectus sed mattis semper, neque lectus
                      feugiat lectus, varius pulvinar diam eros in elit.
                      Pellentesque convallis laoreet laoreet.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={handleChangeAccordion("panel3")}
                  className="according-wrp"
                >
                  <AccordionSummary
                    expandIcon={
                      expanded === "panel3" ? (
                        <MinimizeIcon className="minues" />
                      ) : (
                        <AddIcon />
                      )
                    }
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                  >
                    <div className="createItemTopHeading">
                      <h4>Stats</h4>
                      <p>Numerical traits that just show as numbers</p>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                      Integer sit amet egestas eros, vitae egestas augue. Duis
                      vel est augue.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <div className="switch-container">
                  <div className="switch-row d-flex justify-content-between">
                    <div className="swith-heading">
                      <label className="inputLabel">Unlockable Content</label>
                      <p className="inputSugg">
                        Include unlockable content that can only be revealed by
                        the owner of the item.
                      </p>
                    </div>
                    <div className="switch-btn-box">
                      <SwitchUnstyled
                        component={Root}
                        {...label}
                        defaultChecked
                      />
                    </div>
                  </div>
                  <div className="switch-row d-flex justify-content-between">
                    <div className="swith-heading">
                      <label className="inputLabel">
                        Explicit & Sensitive Content
                      </label>
                      <p className="inputSugg">
                        <div className="info">
                          Set this item as explicit and sensitive content
                          <InfoOutlinedIcon />
                        </div>
                      </p>
                    </div>
                    <div className="switch-btn-box">
                      <SwitchUnstyled
                        component={Root}
                        {...label}
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>*/}
              </div>
              <div className="inputwrp">
                {/*<label className="inputLabel">Supply</label>*/}
                {/* <p className="inputSugg">
                  <div className="info">
                    The number of copies that can be minted. No gas cost to you!
                    Quantities above one coming soon.
                    <InfoOutlinedIcon />
                  </div>
                </p>*/}

                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  id="standard-bare"
                  label="Supply"
                  variant="filled"
                  InputLabelProps={{ style: { color: '#fff' } }}
                  sx={{ input: { color: '#ffffff' } }}
                  value={formInput.supply}
                  InputProps={{ inputProps: { min: 1 } }}
                  onChange={(e) => { updateFormInput({ ...formInput, supply: e.target.value }) }}
                  disabled={contract_type === 'single'}
                  error={isError.error && isError.error}
                  helperText={
                    (!formInput.supply && isError.error) && "Supply must be 1 or greater"
                  }
                />
              </div>

              <div className="inputwrp">
                {/*<label className="inputLabel info">
                  Freeze metadata
                  <InfoOutlinedIcon />
                </label>
                <p className="inputSugg">
                  Freezing your metadata will allow you to permanently lock and
                  store all of this item’s content in decentralized file
                  storage.
                </p>*/}

                <TextField
                  size="small"
                  variant="filled"
                  label="Freeze metadata"
                  InputLabelProps={{ style: { color: '#fff' } }}
                  sx={{ input: { color: '#ffffff' } }}
                  fullWidth
                  placeholder="To freeze your metadata, you must create your item first."
                  value={formInput.freezeMetaData}
                  onChange={(e) => { updateFormInput({ ...formInput, freezeMetaData: e.target.value }) }}
                />
              </div>
              {
                isError.error && <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="error">
                    <h3>Oops, validation errors </h3>
                    <p>{isError.errorMessage.validationError}</p></Alert>
                  {/* <Alert severity="warning">This is a warning alert — check it out!</Alert> */}
                  {/* <Alert severity="info">This is an info alert — check it out!</Alert> */}
                  {/* <Alert severity="success">This is a success alert — check it out!</Alert> */}
                </Stack>
              }
              <div className={styles.actionContainer}>
                <Button className={styles.actionLoader} onClick={handleValidation} disabled={isLoading}>{edit ? 'Edit' : 'Create'} Now

                </Button>
                {isLoading &&
                  <CircularProgress />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const label = { inputProps: { "aria-label": "Switch demo" } };

const grey = {
  400: "#BFC7CF",
  500: "#AAB4BE",
};

const Root = styled("span")`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 55px;
  height: 32px;

  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: ${grey[400]};
    border-radius: 55px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 18px;
    height: 18px;
    top: 7px;
    left: 6px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      left: 30px;
      top: 7px;
      background-color: #fff;
    }

    .${switchUnstyledClasses.track} {
      background: linear-gradient(244.58deg, #8b46ff -17.27%, #cf46ff 98.52%),
        linear-gradient(244.58deg, #8b46ff -17.27%, #cf46ff 98.52%);
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
`;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'inherit',
}));

const Input = styled("input")({
  display: "none",
});