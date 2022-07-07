import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import styles from "../../styles/components/nftart/nftart.module.scss";
import itemStyles from "../../styles/components/itemSellEdit/itemSellEdit.module.scss";
import ItemListingComponent from "./itemListing.component";
import { createPostReqWithParams } from "../../apis/factory.api";
import { FETCH_ITEM_DETAIL } from "../../apis/variables";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from 'next/link'
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { parseDate, shortNum } from "../../utils/common";
import { Injected } from "../../utils/walletConnection";
import Countdown from "react-countdown";

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

export default function ItemSellEdit() {
  const router = useRouter()
  const { item_id } = router.query;
  const [step, setStep] = React.useState(1);
  const [itemData, setItemData] = React.useState({})
  const { active, chainId, account, activate } = useWeb3React();
  const details = [
    detailsTable("Contract Address ", itemData?.tokenId?.address),
    detailsTable("Token ID", itemData?.tokenId?._id),
    detailsTable("Token Standard ", itemData?.collectionId?.collectionType=='single'?'721':'1155'),
    detailsTable("Blockchain", itemData?.networkId?.chainName),
    detailsTable("Metadata", itemData?.freezeMetaData),
  ];

  const [value, setValue] = React.useState(0);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(()=>{
    if(!account){
      if(localStorage.getItem('isWalletConnected') == 'true'){
        activate(Injected)
      }else{
        alert("🦊 Connect to a Wallet using the top right button.");
        router.push('/connectWallet')
        return
      }
    }
  },[active, account])

  React.useEffect(() => {
    if (item_id) {
      createPostReqWithParams(FETCH_ITEM_DETAIL, { id: item_id })
        .then(res => {
          console.log(res)
          setItemData(res.data)
        })
        .catch(err => {
          console.log(err.message)
        });
    }
  }, [item_id])

  // console.log('item, data', itemData)

  const handleStep = (type) => {
    if (type === 'back') {
      setStep(() => step - 1)
      window.scrollTo(0, 0)
    } else {
      // const val = validate();
      // if(!val) return
      setStep(() => step + 1)
      window.scrollTo(0, 0)
    }
  }

  return (
    <>
      {
        step === 1 ? <div>
          <div className="blueBgPage">
            <div className="top-space-header">
              <div className="customContainer nftMainView">
                <div className={styles.nftArtMain}>
                  <div className={styles.nftArtRow}>
                    <div className={styles.nftArtLeftSideBar}>
                      <div className={styles.artImageContainer} style={{ display: 'block', margin: 'auto' }}>
                        <figure>
                          <img src={itemData?.tokenId?.imageUrl ? itemData?.tokenId?.imageUrl : "/images/placeholder.png"} />
                        </figure>
                      </div>

                      <div className={styles.nftArtRightSideBar}>
                        <div className={styles.nftOrgheading}>
                          <h5>
                            <Link href={`/explore/${itemData?.collectionId?._id}`}><a>{itemData?.collectionId?.name}</a></Link>
                            {itemData?.userId?.isVerified && <span>
                              <img src="/images/Done.svg" />
                            </span>}
                          </h5>
                          <h2>{itemData.name}</h2>
                      {(itemData?.saleType=='timed_auction') && (itemData?.auctionData?.startDate && itemData?.auctionData?.endDate) ? parseDate(itemData?.auctionData?.startDate)>new Date()?<><span style={{color:'white'}}>Auction starts in</span><h3 style={{color:'white'}}><Countdown date={parseDate(itemData?.auctionData?.startDate)} /></h3></>:<><span style={{color:'white'}}>Auction ends in</span><h3 style={{color:'white'}}><Countdown date={parseDate(itemData?.auctionData?.endDate)} /></h3></>:null} 
                        </div>
                        <div className={styles.orgownerInfo}>
                          <ul>
                            <li>
                              <strong>Owner By :</strong>
                              <span><Link href={`/profile/${itemData?.userId?._id}`}><a>{" "}{itemData?.userId?.name}</a></Link></span>
                            </li>
                            <li>
                              <div className={styles.iconwrp}>
                                <figure className={styles.icon}>
                                  <img src="/images/View.png" />
                                </figure>
                                <span>{shortNum(itemData?.visitCount)} Views</span>
                              </div>
                            </li>
                            <li>
                              <div className={styles.iconwrp}>
                                <figure className={styles.icon}>
                                  <img src="/images/heart-icon.png" />
                                </figure>
                                <span>{itemData?.likeCount} favorites</span>
                              </div>
                            </li>
                            <li>
                              <div className={itemStyles.itemEditSell}>
                                {!itemData?.onSale && !itemData?.auctionData?.startDate &&
                                  <>
                                    <button onClick={() => router.push(`/edit-item/${'single'}/${item_id}`)}>
                                      Edit
                                    </button>
                                    <button  onClick={() => handleStep()}>
                                      Sell
                                    </button>
                                  </>
                                }
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className={styles.nftAccordionContainer}>
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
                                      <img src="/images/graph.png" style={{ width: '100%' }} />
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
                        </div>
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
                                  {itemData.name}
                                  {itemData?.userId?.isVerified && <span>
                              <img src="/images/Done.svg" />
                            </span>}
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
                                  {itemData.description}
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
                                    {itemData?.properties?.length>0 && itemData?.properties.map((properties) => (
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

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> :

          <ItemListingComponent
            itemName={itemData.name}
            itemDescription={itemData.description}
            itemExternalLink={itemData.externalLink}
            collectionId={itemData.collectionId}
            tokenURI={itemData.tokenId?.imageUrl}
            userId={itemData.userId?._id}
            itemId={item_id}
            walletAdress={itemData.address}
            itemTokenId={itemData.tokenId?._id}
            item={itemData}
          >

          </ItemListingComponent>
      }
    </>
  );
}
