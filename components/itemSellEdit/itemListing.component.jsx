import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "../../styles/components/nftart/nftart.module.scss";
import { CircularProgress, OutlinedInput, TextField } from "@mui/material";
import itemStyles from "../../styles/components/itemSellEdit/itemSellEdit.module.scss";
import useTransaction from "../../hooks/transaction.hook";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AlertBox from '../../components/layout/Modal'
import { Injected } from "../../utils/walletConnection";

import { create as ipfsHttpClient } from 'ipfs-http-client'
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

import NFTMarket from "../../contractsABI/NFTMarket.json";
console.log(NFTMarket)
import { createGetReq, createPostReq, createPostReqWithParams, getCryptoExchange, updatePatchReq } from "../../apis/factory.api";
import { fetchNetwork } from "../../utils/network-switch";
import { CREATE_NFT_MARKET_ITEM, FETCH_COLLECTION, FETCH_CRYPTO_PRICE, FETCH_NETWORKS, FETCH_SERVICE_CHARGE, UPDATE_NFT_MARKET_ITEM } from "../../apis/variables";
import { useRouter } from "next/router";
import useMetamask from "../../hooks/metamaskHook";
import { useAuth } from "../../contexts/auth.context";
import { useWeb3React } from '@web3-react/core'
import { parseDate } from "../../utils/common";

function detailsTable(name, value) {
  return { name, value };
}

function propertiesTable(name, value, trait) {
  return { name, value, trait };
}

const properties = [
  propertiesTable("Background :", " Aquamarine", "13% have this trait"),
  propertiesTable("Earring :", "Gold Stud", "13% have this trait"),
  propertiesTable("Eyes :", "Sleepy ", "8% have this trait"),
  propertiesTable("Fur :", "Black ", "12% have this trait"),
  propertiesTable("Hat :", "Party Hat 1", "1% have this trait"),
  propertiesTable("Mouth : ", "Bored", "23% have this trait"),
];

function createData(calories, fat, carbs, from) {
  return { calories, fat, carbs, from };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ItemListingComponent({ item, itemName, itemDescription, itemExternalLink, collectionId, tokenURI, userId, itemId, itemTokenId }) {
  const { user } = useAuth()
  const [value, setValue] = React.useState(0);
  const [price, setPrice] = React.useState(null);
  const [royalty, setRoyalty] = React.useState(null);
  const [serviceCharge, setServiceCharge] = React.useState(null);
  const [priceSymbol, setPriceSymbol] = React.useState('');
  const symbolList = [{ name: 'ETH' }, { name: 'MATIC' }]
  const [priceAlert, updatePriceAlert] = React.useState(false)
  const [royaltyAlert, updateRoyaltyAlert] = React.useState(false)
  const [convertedPrice, setConvertedPrice] = React.useState('')
  const [isLoading, setLoading] = React.useState(false);
  const [collection_address, setCollectionAddress] = React.useState(null);
  const [exchangeValue, setExchangeValue] = React.useState(null)
  const router = useRouter()

  const [isAlert, setAlert] = React.useState("")
  const [saleType, setSaleType] = React.useState("")
  const [dateAuction, setDateAuction] = React.useState({start_date:'',end_date:''})

  const details = [
    detailsTable("Contract Address ", collection_address),
    detailsTable("Token ID", itemTokenId),
    detailsTable("Token Standard ", item?.collectionId?.tokenSymbol),
    detailsTable("Blockchain", "Ethereum"),
    detailsTable("Metadata", "Frozen"),
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { mintToken, createItem } = useTransaction();
  const { active, chainId, account, activate } = useWeb3React();

  // console.log("dateAuction",dateAuction)

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSymbolChange = (event) => {
    const {
      target: { value },
    } = event;
    setPriceSymbol(typeof value === "string" ? value.split(",") : value)
    setPrice(null)
  };
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChangeAccordion = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (itemName && itemDescription && itemExternalLink && collectionId && tokenURI && userId && itemId) {
      console.log('All item data fetched')
    } else {
      console.log('Item detail missing')
    }
    //fetching collections
    createPostReqWithParams(FETCH_COLLECTION, { id: collectionId._id })
      .then(res => { setCollectionAddress(res.data.address) })
      .catch(err => { console.log(err.message) })
    createGetReq(FETCH_SERVICE_CHARGE)
      .then(res => {
        if (res?.data && res.data?.serviceCharge) {
          setServiceCharge(res.data?.serviceCharge)
        }
      })
      .catch(err => setAlert("can't fetch service charge"))
  }, [])

  React.useEffect(() => {
    if (!account) {
      if (localStorage.getItem('isWalletConnected') == 'true') {
        activate(Injected)
      } else {
        alert("🦊 Connect to a Wallet using the top right button.");
        router.push('/connectWallet')
        return
      }
    }
  }, [active, account])

  React.useEffect(async () => {
    if (chainId == '4') {
      setPriceSymbol(['ETH'])
    } else {
      setPriceSymbol(['MATIC'])
    }
  }, [chainId])

  React.useEffect(async () => {
    getCryptoExchange('/simple/price', { ids: priceSymbol[0] === 'ETH' ? 'ethereum' : 'matic-network', vs_currencies: 'usd' })
      .then(res => {
        setExchangeValue(priceSymbol[0] === 'ETH' ? res.ethereum.usd : res['matic-network'].usd)
        setConvertedPrice('')
        updatePriceAlert(false)
      })
  }, [priceSymbol])

  const handleValidation = () => {
    if (!price || priceAlert || isNaN(convertedPrice)) {
      return { error: true, message: 'Please add a valid price amount' }
    }
    if (!royalty || royaltyAlert) {
      return { error: true, message: 'Please enter a valid royalty value from 0 to max 50%' }
    }
    if (!itemDescription, !itemExternalLink, !itemId, !userId) {
      return { error: true, message: 'Please get all the current item details' }
    }
    if (!saleType) {
      return { error: true, message: 'Please select sale type.' }
    }

    if (saleType=='timed_auction' && !dateAuction?.start_date && !dateAuction?.end_date) {
      return { error: true, message: 'Please select start and end date' }
    }

    if (saleType=='timed_auction' && dateAuction?.start_date && !dateAuction?.end_date) {
      return { error: true, message: 'Please select end date' }
    }

    if (saleType=='timed_auction' && !dateAuction?.start_date && dateAuction?.end_date) {
      return { error: true, message: 'Please select start date' }
    }

    if (saleType=='timed_auction' && parseDate(dateAuction?.start_date) > parseDate(dateAuction?.end_date)) {
      return { error: true, message: 'End date must be more than start date' }
    }

    return { error: false, message: 'Validation is done' }
  }

  const addNftMetaData = async () => {
    setLoading(true)
    // const METADATA = {
    //   image: tokenURI,
    //   walletAdress: account, 
    //   name: itemName, 
    //   description: itemDescription
    // }
    try {
      const added = await client.add(JSON.stringify(NFTMarket.METADATA))
      const metaDataTokenUri = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      console.log('metadatauri', metaDataTokenUri)
      mintNFTTokenWithItem(metaDataTokenUri)
    } catch (error) {
      console.log('Error uploading file: ', error)
      setLoading(false)
    }
  }

  const mintNFTTokenWithItem = async (metaDataTokenUri) => {
    setLoading(true)
    const validation = handleValidation()
    if (validation.error) {
      setLoading(false)
      setAlert(validation.message)
      return
    }
    const address = collectionId.address;
    const collectionABI = collectionId.contractABI;
    const type = collectionId.collectionType;
    if (!type) {
      setLoading(false)
      return setAlert('something went wrong')
    };
    let contractType = type === 'single' ? 721 : 1155;
    contractType = parseInt(contractType)
    const quantity = item.supply || 1;
    console.log(contractType, 'contract address:', address, 'supply:', item.supply)

    // const metaDataTokenURI = await addingNFtMetadataToIpfs({itemName, itemDescription, tokenURI, itemExternalLink})
    // console.log("metaDataTokenURI",metaDataTokenURI)

    const tokenPayload = {
      type: contractType,
      col_address: address,
      url: metaDataTokenUri,
      quantity,
      collectionABI
    }

    let itemPayload = {
      type: contractType,
      col_address: address,
      price,
      quantity,
      royalty,
      saleType
    }

    if(itemPayload?.saleType=='timed_auction'){
      itemPayload.startDate= dateAuction?.start_date
      itemPayload.endDate= dateAuction?.end_date
    }

    let patchPayload = (tokenNo, hash, marketItemid) => {
      return {
        item: {
          name: itemName, externalLink: itemExternalLink || '', description: itemDescription || '',
          collectionId: collectionId._id, price: price, networkId: item.networkId._id,
          address: account, freezeMetaData: "1", onSale: true, hash, saleType, nftMarketItemId: marketItemid
        },
        itemToken: {
          imageUrl: tokenURI, networkId: item.networkId._id,
          address: account, hash: hash, tokenNo: tokenNo
        }
      }
    };

    mintToken(tokenPayload).then(res => {
      let tokenid = res.events?.TransferSingle?.returnValues?._id;
      if (!tokenid) tokenid = res.events?.Transfer?.returnValues?._tokenId;
      const payload = { ...itemPayload, tokenId: tokenid }
      // console.log('payload', payload)
      // console.log('required --type,col_address,price,tokenId,quantity,royalty,saleType: any;')
      // createItem(payload).then(res => {
        const txHash = res.blockHash;
        const marketItemId = res?.events?.MarketItemCreated?.returnValues?.itemId
        let body = patchPayload(tokenid, txHash, marketItemId)
        if(body?.item?.saleType=='timed_auction'){
          body.item.startDate= dateAuction?.start_date
          body.item.endDate= dateAuction?.end_date
          body.item.onSale= false
        }

        updatePatchReq(UPDATE_NFT_MARKET_ITEM, body, { itemId: itemId, itemTokenId: itemTokenId }).then(res => {
          console.log("updated NFT item place on Marketplace")
          router.push(`/profile/${user?._id}`)
          setLoading(false)
        }).catch(err => {
          setAlert(err)
          setLoading(false)
        })
      // }).catch(err => {
      //   setAlert(err.message)
      //   setLoading(false)
      // })
    }).catch(err => {
      setAlert(err.message)
      setLoading(false)
    })
  }

  const handlePriceChange = (e) => {
    if (!e.target.value) {
      updatePriceAlert(false)
      setPrice(null)
      setConvertedPrice('')
      return
    }
    setPrice(e.target.value)
    if (e.target.value.match("^[0-9.]+$") === null || isNaN(convertedPrice)) {
      updatePriceAlert(true)
      setConvertedPrice('')
    } else {
      setConvertedPrice(e.target.value * exchangeValue)
      updatePriceAlert(false)
    }
  }

  const handleRoyaltyChange = (e) => {
    if (!e.target.value) {
      updateRoyaltyAlert(false)
      setRoyalty(null)
      return
    }
    setRoyalty(e.target.value)
    if (e.target.value.match("^[0-9.]+$") === null) {
      updateRoyaltyAlert(true)
    } else {
      if(parseInt(e.target.value) <= 50){
        updateRoyaltyAlert(false)
      }else{
        updateRoyaltyAlert(true)
      }
    }
  }

  return (
    <div>
      <div className="blueBgPage">
        <div className="top-space-header">
          {isAlert ? <AlertBox textMessage={isAlert} onClose={() => { setAlert("") }} /> : null}
          <div className="customContainer nftMainView">
            <div className={styles.nftArtMain}>
              <div className={styles.nftArtRow}>
                <div className={styles.nftArtLeftSideBar}>
                  <div className={styles.artImageContainer}>
                    <figure>
                      <img src={tokenURI} />
                    </figure>
                  </div>
                  <div className="artInfoContainer">
                    <div className="artTabList">
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="scrollable force tabs example"
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                      >
                        <Tab
                          className="tabBtn"
                          label="About"
                          {...a11yProps(0)}
                          icon={
                            <Avatar
                              classsName="tab-icon"
                              src="/images/about-tab-icon.png"
                            />
                          }
                        />

                        <Tab
                          className="tabBtn"
                          label="Description"
                          {...a11yProps(1)}
                          icon={
                            <Avatar
                              classsName="tab-icon"
                              src="/images/description-tab-iocn.png"
                            />
                          }
                        />
                        <Tab
                          className="tabBtn"
                          label="Details"
                          {...a11yProps(2)}
                          icon={
                            <Avatar
                              classsName="tab-icon"
                              src="/images/Details-tab-icon.png"
                            />
                          }
                        />
                        <Tab
                          className="tabBtn"
                          label="Properties"
                          {...a11yProps(3)}
                          icon={
                            <Avatar
                              classsName="tab-icon"
                              src="/images/Properties-tab-icon.png"
                            />
                          }
                        />
                      </Tabs>
                    </div>
                    <div className="artTabsContent">
                      <TabPanel
                        classsName="artTabPanel"
                        value={value}
                        index={0}
                      >
                        <div className="ArtTabWrp">
                          <div className="aboutTitle">
                            <h3>
                              {itemName}
                              <span>
                                <img src="/images/Done.svg" />
                              </span>
                            </h3>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel
                        classsName="artTabPanel"
                        value={value}
                        index={1}
                      >
                        <div className="artTabWrp">
                          <div className="artDis">
                            <p>
                              {itemDescription && itemDescription}
                            </p>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel
                        classsName="artTabPanel"
                        value={value}
                        index={2}
                      >
                        <div className="artTabWrp">
                          <TableContainer component={Paper}>
                            <Table aria-label="caption table">
                              <TableBody>
                                {details.map((details) => (
                                  <TableRow key={details.name}>
                                    <TableCell component="th" scope="row">
                                      {details.name}
                                    </TableCell>
                                    <TableCell align="right">
                                      {details.value}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                      </TabPanel>
                      <TabPanel
                        classsName="artTabPanel"
                        value={value}
                        index={3}
                      >
                        <div className="artTabWrp Properties-table">
                          <TableContainer component={Paper}>
                            <Table aria-label="caption table">
                              <TableBody>
                                {item?.properties?.length > 0 && item?.properties.map((properties) => (
                                  <TableRow key={properties.name}>
                                    <TableCell component="th" scope="row">
                                      <strong>{properties.type} </strong>
                                      <span className={styles.pValue}>
                                        {properties.name}
                                      </span>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                      </TabPanel>
                    </div>
                  </div>

                  <div className={styles.nftArtRightSideBar}>
                    <div className={styles.nftOrgheading} style={{ marginTop: 30 }}>
                      <h2>List Item for sale</h2>
                    </div>
                    <div className={styles.orgownerInfo}>
                    </div>
                    <div className={styles.nftTopBidPanel}>
                      <div className={styles.panel}>
                        <div className={styles.panelBody}>

                          <FormControl>
                            <RadioGroup
                              style={{ color: 'white', marginBottom: '20px' }}
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                            >
                              <FormControlLabel value="fixed" onClick={() => setSaleType('fixed')} style={{ fontSize: '20px' }} control={<Radio style={{ color: 'white' }} />} label="Fixed Price" />
                              <FormControlLabel value="bid" onClick={() => setSaleType('bid')} control={<Radio style={{ color: 'white' }} />} label="Place Bid" />
                              {item?.collectionId?.collectionType == 'single' && <FormControlLabel value="timed_auction" onClick={() => setSaleType('timed_auction')} control={<Radio style={{ color: 'white' }} />} label="Auction" />}
                            </RadioGroup>
                          </FormControl>

                          <div className="inputwrp">
                            <label className="inputLabel">
                              Price<span>*</span>
                            </label>
                            <div className={itemStyles.priceFieldWrapper}>
                              <FormControl className={itemStyles.selectPriceSymbol} >
                                <Select
                                  displayEmpty
                                  value={priceSymbol}
                                  onChange={handleSymbolChange}
                                  input={<OutlinedInput />}
                                  renderValue={(selected) => {
                                    if (!selected) {
                                      return (
                                        <span className="placeholder-select">
                                          Select Symbol
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
                                      Select Symbol
                                    </span>
                                  </MenuItem>
                                  {symbolList?.map((obj, i) => (
                                    <MenuItem
                                      key={obj.name + i}
                                      value={obj.name}
                                    // style={getStyles(name, personName, theme)}
                                    // onClick={() => handleSelectCollection(obj)}
                                    >
                                      {obj.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <TextField
                                placeholder="Amount"
                                // kei="price"
                                id="standard-bare"
                                variant="outlined"
                                formInput={price}
                                value={price}
                                onChange={handlePriceChange}
                                helpText={true}
                              />
                            </div>
                            {price &&
                              <div className={itemStyles.priceAlert}>
                                {/* {priceAlert ? */}
                                <span className={itemStyles.alert}>{priceAlert && 'X Invalid amount'}</span> :
                                <span className={itemStyles.priceConvert}>{!priceAlert && ('$' + convertedPrice)}</span>
                                {/* } */}
                              </div>
                            }
                          </div>
                          {
                            saleType == 'timed_auction' && (
                              <div className="inputwrp">
                                <label className="inputLabel">
                                  Start date / End date<span>*</span>
                                </label>
                                <div className={itemStyles.priceFieldWrapper} style={{justifyContent:'left'}}>
                                  <TextField
                                    placeholder="Start date"
                                    // kei="price"
                                    id="standard-bare"
                                    variant="outlined"
                                    type={'date'}
                                    helpText={true}
                                    onChange={(e)=>setDateAuction((s)=>({...s,start_date:e.target.value}))}
                                    style={{marginRight: 10}}
                                    max={dateAuction?.end_date?dateAuction?.end_date:''}
                                  />
                                
                                   <TextField
                                    placeholder="End date"
                                    // kei="price"
                                    id="standard-bare2"
                                    variant="outlined"
                                    min={dateAuction?.start_date?dateAuction?.start_date:""}
                                    onChange={(e)=>setDateAuction((s)=>({...s,end_date:e.target.value}))}
                                    type={'date'}
                                    helpText={true}
                                  />
                                </div>
                              </div>
                            )
                          }
                          <div className={itemStyles.categoryRoW}>
                            <div className="nft-row ">
                              <div className="nft-col-12">
                                <div className="wrp-input-top">
                                  <label className="inputLabel"> Royalties</label>
                                  <p className="inputSugg">
                                    Collect a fee when a user re-sells on item you
                                    originally created. This is deducted from the
                                    final sale price and paid monthly to a payout
                                    address of your choosing. Suggested 0%,10%,20%, Maximum 50%.
                                    <strong className="drakBlueText ">
                                      Learn more
                                    </strong>
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="nft-row ">
                              <div className="nft-col-12">
                                <div className={itemStyles.inputWrp}>
                                  <div className="theme-input relative iconRightInput">
                                    <TextField fullWidth placeholder="e.g. 2.0"
                                      id="standard-bare"
                                      variant="outlined"
                                      formInput={royalty}
                                      value={royalty}
                                      onChange={handleRoyaltyChange}
                                    />
                                    <div className="inputRightIcon">
                                      <img src="/images/percentage.png" />
                                    </div>
                                  </div>
                                  {royalty &&
                                    <div className={itemStyles.priceAlert}>
                                      {/* {priceAlert ? */}
                                      <span className={itemStyles.alert}>{royaltyAlert && 'X Invalid royalty value entered'}</span> :
                                      {/* } */}
                                    </div>
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={itemStyles.serviceChargesWrap}>
                            <div className={itemStyles.primary}>
                              <p>
                                Fees
                              </p>
                              <Avatar
                                classsName="tab-icon"
                                src="/images/about-tab-icon.png"
                              />
                            </div>
                            <div className={itemStyles.secondary}>
                              <p>
                                Service Fees
                              </p>
                              <p>
                                {serviceCharge || 1.8}%
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={styles.panelFooter}>
                          <div className="d-flex justify-content-center">
                            <div className={styles.placeBidBtn}>
                              <Button className="outline-theme" disabled={isLoading} onClick={addNftMetaData}>Complete Listing</Button>
                              {isLoading &&
                                <CircularProgress styles={{ margin: '5px 20px 5px' }} />
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.nftAccordionContainer}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//Styles
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