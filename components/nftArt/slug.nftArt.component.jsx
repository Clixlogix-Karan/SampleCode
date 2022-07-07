import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { styled } from '@mui/material/styles'

import styles from "../../styles/components/nftart/nftart.module.scss";
import CardInfo from "./CardInfo";
import SalesCardInfo from "./SalesCardInfo";
import { useRouter } from "next/router";
import { createPostReq, createGetReq, createPostReqWithParams } from "../../apis/factory.api";
import Link from 'next/link'
import useTransaction from "../../hooks/transaction.hook";
import { FETCH_ITEM_DETAIL, BUY_NFT_ITEM, PLACE_BID_NFT_ITEM, FETCH_COLLECTION ,CANCEL_BID_NFT_ITEM,OFFERS_BIDS_LIST,OFFERS_SALES_LIST,VISITER, opensea_items} from "../../apis/variables";
import { useAuth } from "../../contexts/auth.context";
import PlaceBidModal from './PlaceBidModal'
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import AlertBox from '../../components/layout/Modal'
import { parseDate, shortNum, shortStr } from "../../utils/common";
import { Injected } from "../../utils/walletConnection";
import Countdown from "react-countdown";

function detailsTable(name, value) {
  return { name, value };
}

const StyledButton = styled(Button)({
  borderRadius: 100,
  padding: '6px 34px',
  marginTop: 30,
  ":after": {
    borderRadius: 100
  }
})

const GraphCard = styled(Card)(styles.graphCard)

const details = [
  detailsTable("Contract Address ", "0xbc4cf13d"),
  detailsTable("Token ID", 7942),
  detailsTable("Token Standard ", "ERC - 721"),
  detailsTable("Blockchain", "Ethereum"),
  detailsTable("Metadata", "Frozen"),
];

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

const rowsListing = [createData("$749.16", "in 5 months", "CryptoCR")];
const rowsoffres = [
  createData("$749.16", "99.7% below", "in a day", "CryptoCR"),
  createData("$749.16", "100.0% below", "in 8 days", "HelpMeGetFirstApe"),
  createData("$749.16", "99.7% below", "in a month", "NextLevelNow"),
  createData("$749.16", "100.0% below", "in 7 days", "apexagency"),
  createData("$749.16", "99.7% below", "in 4 days", "Brokedudue"),
];

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

export default function NftArtComponent() {

  const { active, chainId, account, activate } = useWeb3React();
  const [isLoading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [isModal, setModal] = React.useState(false);
  const router = useRouter()
  const [itemDetails, setItemDetails] = React.useState({})
  const [collectionDetails, setCollectionDetails] = React.useState({})
  const { approveTransfer, transferNft, createMarketSale } = useTransaction();
  const { user } = useAuth()
  const [isAlert, setAlert] = React.useState("")
  const [isReload, setReload] = React.useState(false)
  const [bidOffersList, setBidOffersList] = React.useState([])
  const [salesList, setSalesList] = React.useState([])


  React.useEffect(() => {
    if (!account) {
      if (localStorage.getItem('isWalletConnected') == 'true') {
        activate(Injected)
      } else {
        setAlert("🦊 Connect to a Wallet using the top right button.");
        router.push('/connectWallet')
        return
      }
    }
  }, [active, account,router?.query?.item_contract_id])


  React.useEffect(() => {
    if (router?.query?.item_contract_id) {
    //   setLoading(true)
      createGetReq(`${opensea_items}?id=${router.query.item_contract_id}`).then((res) => {
        if (res?.data) {
          setItemDetails(res?.data)
        //   createPostReqWithParams(FETCH_COLLECTION, { id: res.data.collectionId._id })
        //     .then(res => {
        //       setCollectionDetails(res.data)
        //       setLoading(false)
        //     })
        //     .catch(err => {
        //       console.log(err.message)
        //       setLoading(false)
        //     })
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  }, [router?.query?.item_contract_id,isReload])

  React.useEffect(() => {
    //fetching sales and bids
    //here userId is the itemId
    if(router.query?.userId){
    const PAYLOAD = {
      limit:20,
      pageNo:1,
      itemId:router.query?.userId
    }
    createPostReq(OFFERS_BIDS_LIST,{...PAYLOAD})
    .then((res)=>{
      setBidOffersList(res?.data)
    }).catch((e)=>{
      console.log(e?.response?.data)
      if(e.response?.data?.message)
        setAlert(e.response?.data?.message)
    })

    createPostReq(OFFERS_SALES_LIST,{...PAYLOAD})
    .then((res)=>{
      setSalesList(res?.data)
    }).catch((e)=>{
      console.log(e?.response?.data)
      if(e.response?.data?.message)
        setAlert(e.response?.data?.message)
    })
   }
  }, [router.query?.userId,isReload])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const copyToClipBoard = (walletAddress = "") => {
    navigator.clipboard.writeText(walletAddress);
    setAlert('Copied ' + '"' + walletAddress + '"' + ' to clipboard')
  }

  const buyNftMain = (itemId) => {
    setLoading(true)
    const itemPayload = {
      collection_address: collectionDetails?.address,
      contractABI: collectionDetails?.contractABI,
      from_address: itemDetails?.tokenId.address,
      price: itemDetails?.saleType == 'fixed' ? itemDetails?.price : itemDetails?.checkBidData?.price,
      type: collectionDetails?.collectionType === "single" ? 721 : 1155,
      quantity: itemDetails?.supply,
      tokenId: itemDetails?.tokenId?.tokenNo,
      nftMarketItemId: itemDetails?.nftMarketItemId,
      saleType: itemDetails?.saleType
    }

    // createMarketSale(itemPayload.type, itemPayload.price, itemPayload.nftMarketItemId, itemPayload.saleType).then(res => {
      // approveTransfer(itemPayload).then(res => {
        // transferNft(itemPayload).then(res => {
          setAlert('buy successful')
          if (user?._id) {
            createPostReq(`${BUY_NFT_ITEM}?id=${itemId}`).then((res) => {
              if (res?.message) {
                setAlert(res?.message)
                router.push(`/profile/${user?._id}`)
              }
            }).catch((e) => {
              if (e?.response?.data) {
                setAlert(e?.response?.data?.message)
              }
            })
          }
        // }).catch(err =>{
        //     setAlert(err.message)
        //   })
      // }).catch(err =>{
      //     setAlert(err.message)
      //   })
    // }).catch(err =>{
    //     setAlert(err.message)
    //   })
  }

  const handleBidPlaceNFT = (data) => {
    if (user?._id) {
      createPostReq(`${PLACE_BID_NFT_ITEM}?id=${data?.itemId}`, { bidPrice: (data?.price + "") }).then((res) => {
        if (res?.message) {
          setModal(false)
          setReload(!isReload)
          setAlert(res?.message)
          // setTimeout(() => router.push(`/profile/${user?._id}`), 2000)
        }
      }).catch((e) => {
        if (e?.response?.data) {
          setAlert(e?.response?.data?.message)
        }
      })
    }
  }

  const handleBidCancelNFT = (id) => {
    if (user?._id) {
      createPostReq(`${CANCEL_BID_NFT_ITEM}?id=${id}`).then((res) => {
        if (res?.message) {
          setModal(false)
          setReload(!isReload)
          setAlert(res?.message)
          // setTimeout(() => router.push(`/profile/${user?._id}`), 2000)
        }
      }).catch((e) => {
        if (e?.response?.data) {
          setAlert(e?.response?.data?.message)
        }
      })
    }
  }


  return (
    <div>
      {isAlert ? <AlertBox textMessage={isAlert} onClose={() => { setAlert("") }} /> : null}
      <div className="blueBgPage">
        <div className="top-space-header">
          <div className="customContainer nftMainView">
            <div className={styles.nftArtMain}>
              <div className={styles.nftArtRow}>
                <div className={styles.nftArtLeftSideBar}>
                  <div className={styles.artImageContainer}>
                    <figure>
                      <img src={itemDetails?.asset_contract?.image_url ? itemDetails?.asset_contract?.image_url: "/images/placeholder.png"} />
                    </figure>
                  </div>
                  <div className={styles.nftArtRightSideBar}>
                    <div className={styles.nftOrgheading}>
                      <h2>{itemDetails?.name}</h2>

                      <h5>
                        <Link href={`/explore/slug/${itemDetails?.collection?.slug}`}>
                          <a>{itemDetails?.collection?.name}</a>
                        </Link>
                        {itemDetails?.creator?.isVerified && <span>
                          <img src="/images/Done.svg" />
                        </span>}
                      </h5><br/>
                      
                      {(itemDetails?.saleType=='timed_auction') && (itemDetails?.auctionData?.startDate && itemDetails?.auctionData?.endDate) && <><span style={{color:'white'}}>Auction ends in</span><h3 style={{color:'white'}}><Countdown date={parseDate(itemDetails?.auctionData?.endDate)} /></h3></>} 
                    </div>
                    <div className={styles.orgownerInfo}>
                      <ul>
                        <li>
                          <Grid spacing={2} container>
                            <Grid item>
                              <strong>Owner By :</strong>{" "}
                              <span>{shortStr(itemDetails?.creator?.address||itemDetails?.creator?.user)}</span>
                            </Grid>
                            <Grid item>
                              <div className={styles.iconwrp}>
                                <figure className={styles.icon}>
                                  <img src="/images/View.png" />
                                </figure>
                                <span>{shortNum(itemDetails?.visitCount)} Views</span>
                              </div>
                            </Grid>
                            <Grid item>
                              <div className={styles.iconwrp}>
                                <figure className={styles.icon}>
                                  <img src="/images/heart-icon.png" />
                                </figure>
                                <span>{shortNum(itemDetails?.likeCount)} favorites</span>
                              </div>
                            </Grid>
                          </Grid>
                        </li>
                        <li>
                          <div style={{ marginTop: -10 }}>
                            <ul>
                              <li>
                                <Grid container spacing={2}>
                                  {itemDetails?.saleType == 'fixed' && <Grid item>
                                    <span>Price: </span>
                                    <strong>{itemDetails?.price ? itemDetails?.price : 0} {itemDetails?.networkId?.nativeCurrency?.symbol}</strong></Grid>
                                  }
                                  {(itemDetails?.saleType == 'bid'||itemDetails?.saleType=='timed_auction') && <Grid item>
                                    <span>Top Bid: </span>
                                    <strong>{itemDetails?.topBidData?.price ? itemDetails?.topBidData?.price : itemDetails?.price ? itemDetails?.price : 0} {itemDetails?.networkId?.nativeCurrency?.symbol}</strong>
                                  </Grid>}
                                </Grid>
                              </li>
                            </ul>
                            {
                              // user?._id!=itemDetails?.userId?._id && (
                              <div className="d-flex justify-content-between">
 
                                {
                                  (itemDetails?.saleType == 'bid'||itemDetails?.saleType=='timed_auction') && !itemDetails?.checkBidData?.bidBy ? (
                                    <div className={styles.placeBidBtn} style={{ marginRight: 20 }}>
                                      <StyledButton onClick={() => setModal(itemDetails)} className="outline-theme" style={{ color: '#fff' }}>Place Bid</StyledButton>
                                    </div>
                                  ) : null
                                }
                                {
                                  (itemDetails?.saleType == 'bid'||itemDetails?.saleType=='timed_auction') && itemDetails?.checkBidData?.bidBy && itemDetails?.checkBidData?.status=='pending' ? (
                                    <div className={styles.placeBidBtn} style={{ marginRight: 20 }}>
                                      <StyledButton onClick={() => setModal(itemDetails)} className="outline-theme" style={{ color: '#fff' }}>Edit Bid</StyledButton>
                                    </div>
                                  ) : null
                                }
                                {
                                  (itemDetails?.saleType == 'bid'||itemDetails?.saleType=='timed_auction') && itemDetails?.checkBidData?.bidBy && itemDetails?.checkBidData?.status=='approved' ? (
                                    <div className={styles.buyNowBox} onClick={() => buyNftMain(itemDetails?._id)}>
                                    <StyledButton className="themeBg apply">Buy Now</StyledButton>
                                  </div>
                                  ) : null
                                }
                                {
                                  (itemDetails?.saleType == 'bid'||itemDetails?.saleType=='timed_auction') && itemDetails?.checkBidData?.bidBy && itemDetails?.checkBidData?.status=='pending' ? (
                                    <div className={styles.buyNowBox} style={{marginLeft:10}} onClick={() => handleBidCancelNFT(itemDetails?.checkBidData?._id)}>
                                    <StyledButton className="themeBg apply">Cancel bid</StyledButton>
                                  </div>
                                  ) : null
                                }
                                {
                                  itemDetails?.saleType == 'fixed' && <div className={styles.buyNowBox} onClick={() => buyNftMain(itemDetails?._id)}>
                                    <StyledButton className="themeBg apply">Buy Now</StyledButton>
                                  </div>
                                }
                              </div>
                              // )
                            }
                          </div>
                        </li>
                      </ul>
                    </div>
                    {/* <div className={styles.nftTopBidPanel}>
                      <div className={styles.panel}>
                        <div className={styles.pabelHeading}>
                          <h4>Sale ends December 31, 2021 at 1:11am IST</h4>
                        </div>
                        <div className={styles.panelBody}>
                          <h5>
                            Top Bid <strong>15,350 </strong> ETH
                          </h5>
                        </div>
                        <div className={styles.panelFooter}>
                          <div className="d-flex justify-content-between">
                            <div className={styles.placeBidBtn}>
                              <Button className="outline-theme">Place Bid</Button>
                            </div>
                            <div className={styles.buyNowBox}>
                              <Button className="themeBg apply">Buy Now</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {/* <div className={styles.nftAccordionContainer}>
                      <div className="nftACWrp">
                        <Accordion
                          expanded={expanded === "panel1"}
                          onChange={handleChangeAccordion("panel1")}
                          className={styles.artAcc}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            aria-label="Expand"
                          >
                            <div className={styles.artPanelHeading}>
                              <span className={styles.icon}>
                                <img src="/images/price-history-icon.png" />
                              </span>
                              <span className={styles.headingAcc}>
                                Price History
                              </span>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className={styles.priceHistory}>
                              <div className="d-flex justify-content-between">
                                <div className={styles.hisheading}>
                                  <h3>
                                    All Time Avg. Price :<strong>15.89</strong>
                                  </h3>
                                </div>

                                <div className="allTime">
                                  <FormControl>
                                    <InputLabel id="demo-simple-select-label">
                                      All Time
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      label="All Time"
                                      onChange={handleChange}
                                    >
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                  </FormControl>
                                </div>
                              </div>
                              <div className={styles.historyGraph}>
                                <figure>
                                  <img src="/images/graph.png" />
                                </figure>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                      <Accordion
                        expanded={expanded === "panel2"}
                        onChange={handleChangeAccordion("panel2")}
                        className={styles.artAcc}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <div className={styles.artPanelHeading}>
                            <span className={styles.icon}>
                              <img src="/images/Listing.png" />
                            </span>
                            <span className={styles.headingAcc}>Listing</span>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className={styles.artTable}>
                            <Table aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Price</TableCell>
                                  <TableCell>USD Price</TableCell>
                                  <TableCell>Experiration</TableCell>
                                  <TableCell>From</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rowsListing.map((row) => (
                                  <TableRow
                                    key={row.name}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell component="th" scope="row">
                                      <div className={styles.priceIcn}>
                                        <span className={styles.wethIcon}>
                                          <img src="/images/weth.png" />
                                        </span>
                                        <strong> 0.2</strong> &nbsp;WETH
                                      </div>
                                    </TableCell>
                                    <TableCell>{row.calories}</TableCell>
                                    <TableCell>{row.fat}</TableCell>
                                    <TableCell>
                                      <strong>{row.carbs}</strong>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion
                        expanded={expanded === "panel3"}
                        onChange={handleChangeAccordion("panel3")}
                        className={styles.artAcc}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <div className={styles.artPanelHeading}>
                            <span className={styles.icon}>
                              <img src="/images/Offers.png" />
                            </span>
                            <span className={styles.headingAcc}>Offers</span>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className={styles.artTable}>
                            <Table
                              sx={{ minWidth: 650 }}
                              aria-label="simple table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell>Price</TableCell>
                                  <TableCell>USD Price</TableCell>
                                  <TableCell>Floor Difference</TableCell>
                                  <TableCell>Experiration</TableCell>
                                  <TableCell>From</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rowsoffres.map((row) => (
                                  <TableRow
                                    key={row.name}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell component="th" scope="row">
                                      <div className={styles.priceIcn}>
                                        <span className={styles.wethIcon}>
                                          <img src="/images/weth.png" />
                                        </span>
                                        <strong> 0.2</strong> &nbsp;WETH
                                      </div>
                                    </TableCell>
                                    <TableCell>{row.calories}</TableCell>
                                    <TableCell>{row.fat}</TableCell>
                                    <TableCell>{row.carbs}</TableCell>
                                    <TableCell>
                                      <strong>{row.from}</strong>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div> */}
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
                          label="Details"
                          {...a11yProps(0)}
                          icon={
                            <Avatar
                              classsName="tab-icon"
                              src="/images/description-tab-iocn.png"
                            />
                          }
                        />

                        <Tab
                          className="tabBtn"
                          label="Current Bids"
                          {...a11yProps(1)}
                          icon={
                            <Avatar
                              classsName="tab-icon"
                              src="/images/Properties-tab-icon.png"
                            />
                          }
                        />
                        <Tab
                          className="tabBtn"
                          label="Sales History"
                          {...a11yProps(2)}
                          icon={
                            <Avatar
                              classsName="tab-icon"
                              src="/images/price-history-icon.png"
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
                        <div className="artTabWrp">
                          <div className="artDis">
                            <Grid container spacing={2}>
                              <Grid item lg={4}>
                                <p>Blockchain - <span><img style={{ width: 30, height: 30, marginBottom: -10 }} src={itemDetails?.networkData?.chainId == "0x13881" ? "/images/brandIcon.png" : "/images/token-icon.png"} /> {itemDetails?.networkId?.nativeCurrency?.symbol}</span></p>
                              </Grid>
                              <Grid item lg={4}>
                                <p>Contract Address - <span style={{ color: '#986efa', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => copyToClipBoard(itemDetails?.asset_contract?.address)} >{shortStr(itemDetails?.asset_contract?.address)}</span></p>
                              </Grid>
                              <Grid item lg={2}>
                                <p>Token - <span style={{ color: '#fff', fontWeight: 'bold' }}>ERC - {itemDetails?.collectionId?.collectionType == 'single' ? '721' : '1155'} </span></p>
                              </Grid>
                              <Grid item lg={2}>
                                <p>Token ID - <span style={{ color: '#fff', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => copyToClipBoard(itemDetails?.token_id)}>{shortStr(itemDetails?.token_id)} </span></p>
                              </Grid>
                            </Grid>
                          </div>
                          <hr style={{ borderColor: '#986efa' }} />
                          <div className="artDis">
                            <div style={{ padding: '22px 0px 51px 29px' }}>
                              <p>
                                <div className={styles.nftOrgheading}>
                                  <h3>
                                    {itemDetails?.name}{" "}
                                    {itemDetails?.collection?.safelist_request_status && <span>
                                      <img src="/images/Done.svg" />
                                    </span>}

                                  </h3>
                                  <p>{itemDetails?.asset_contract?.description}</p>
                                </div>
                              </p>
                            </div>
                            <div style={{ padding: '22px 0px 51px 29px' }}>
                              <Grid container spacing={2}>
                                {
                                  itemDetails?.properties?.length > 0 ? itemDetails?.properties?.map((value, key) => (
                                    <Grid item md={6} style={{ width: '100%' }} lg={6} key={key}>
                                      <div className={styles.tags}>
                                        <p><strong>{value?.type || 'Demo'}</strong>: <span>{value?.name || 'Test'}</span></p>
                                      </div>
                                    </Grid>)) : null
                                }
                              </Grid>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel
                        classsName="artTabPanel"
                        value={value}
                        index={1}
                      >
                        <div className="artTabWrp">
                          <div className="artDis" style={{ width: '100%' }}>
                            {
                              bidOffersList?.length>0 && bidOffersList.map((v, k) => <CardInfo key={k} symbol={itemDetails?.networkId?.nativeCurrency?.symbol} itemData={v} className={styles.cardInfo} />)
                            }
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel
                        classsName="artTabPanel"
                        value={value}
                        index={2}
                      >
                        <div className="artTabWrp">
                          <div className="artDis" style={{ width: '100%' }}>
                            {
                              salesList?.length>0 && salesList.map((v, k) => <SalesCardInfo key={k} symbol={itemDetails?.networkId?.nativeCurrency?.symbol} itemData={v} className={styles.cardInfo} />)
                            }
                          </div>
                          <div className={styles.graphCard}>
                            <div className={styles.priceHistory}>
                              <div className="d-flex justify-content-between">
                                <div className={styles.hisheading}>
                                  <h3>
                                    All Time Avg. Price :<strong>15.89</strong>
                                  </h3>
                                </div>

                                <div className="allTime">
                                  <FormControl>
                                    <InputLabel id="demo-simple-select-label">
                                      All Time
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      label="All Time"
                                    >
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                  </FormControl>
                                </div>
                              </div>
                              <div className={styles.historyGraph}>
                                <figure>
                                  <img src="/images/histrogram.png" style={{ width: '100%', marginTop: 10 }} />
                                </figure>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <PlaceBidModal isModal={isModal} placeBid={(e) => handleBidPlaceNFT(e)} handleClose={() => setModal(false)} />
    </div>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChangeAccordion = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

}