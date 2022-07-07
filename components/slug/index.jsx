import * as React from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import styles from "../../styles/components/explore/explore.module.scss";
import { createPostReq, createPostReqWithParams,createGetReq } from "../../apis/factory.api";
import { COLLECTION_SUMMARY, FETCH_COLLECTION, FETCH_NFT_LIST,LIKE_ITEM,UNLIKE_ITEM,opensea_collection_info, opensea_collection_items } from "../../apis/variables";
import { useAuth } from "../../contexts/auth.context.jsx";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link'
import { setCollection } from '../../redux/collection/collection.actions';
import millify from "millify";
import AlertBox from '../../components/layout/Modal'
import { objGetFromArray, parseDate, shortNum, shortStr } from "../../utils/common";
import Countdown from "react-countdown";


export default function ExploreComponent(props) {
  const router = useRouter();
  
  const { slug } = router.query;
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { user } = useAuth();
  const [itemList, setItemList] = React.useState([])
  const [loading, setLoading] = React.useState(false);
  const [reloadData, setReloadData] = React.useState(false);
  const [collection, setCollection] = React.useState(null)
  const [summaryDetails, setSummaryDetails] = React.useState({})
  const [isAlert,setAlert] = React.useState("") 

  React.useEffect(() => {
    if(slug){
        createGetReq(`${opensea_collection_info}/?slug_id=${slug}`, ).then(res => {
            //   console.log('asdasd',res?.data?.collection)
              if(res.data?.collection){
                setCollection(res.data?.collection)
              }
            })
    }
  }, [slug,router])

//   React.useEffect(() => {
//     if(!slug) return
//     createGetReq(`${COLLECTION_SUMMARY}?id=${slug}`).then(res => {
//       setSummaryDetails(res.data)
//     })
//   }, [slug])

  React.useEffect(async () => {
    if (!slug) return

    let PAYLOAD = {
      pageNo: 1,
      limit: 20,
      collectionId: slug,
      onSale: true
    }
     if(user?._id){
        PAYLOAD.userId = user?._id
      }

      createGetReq(`${opensea_collection_items}/?slug_id=${slug}`).then(res => {
      console.log('res?.data',res?.data?.asset_events)
      setItemList(res?.data?.asset_events)
      setLoading(false)
    }).catch(err => console.log(err))

  }, [slug,reloadData])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleLikeUnlike = (e,itemId)=>{
    // const checked = e.target.checked
    // const url = checked?LIKE_ITEM:UNLIKE_ITEM
    //  const req = checked?{itemId}:{likeItemId:itemId}
    //   createPostReq(url, req).then(res => {
    //     setReloadData(!reloadData)
    //       if(res?.message){
    //         setAlert(res?.message)
    //       }
    //     }).catch((e)=>{
    //       if(e?.response?.data && e?.response?.data?.message){
    //         setAlert(e?.response.data.message)
    //       }
    //     })
  }


  return (
    <div>
      <div className="blueBgPage">
        <div className="top-space-header">
        {isAlert?<AlertBox textMessage={isAlert} onClose={()=>{setAlert("");}}/>:null}

          <div className="customContainer">
            <div className={styles.expolreBannerTop}>
              <div className={styles.exloreImage}>
                <figure style={{backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center center',backgroundImage:`url(${collection?.banner_image_url?collection?.banner_image_url:'/images/placeholder.png'})`,}}>
                  {/* <img src="/images/explore-banner.png" /> */}
                </figure>
              </div>
              <div className={styles.exploreBtmInfo}>
                <div className={styles.userProfilInfo}>
                  <figure>
                    <img src={collection?.image_url?collection?.image_url:'/images/placeholder.png'} />
                  </figure>
                  <h3>
                    {
                      shortStr(collection?.name)
                    }
                    {collection?.creatorData?.isVerified && <span>
                      <img src="/images/Done.svg" />
                    </span>}
                  </h3>
                  <h4>
                    by
                    <strong>{shortStr(collection?.payout_address || "")}</strong>
                    {collection?.require_email && <span>
                      <img src="/images/Done.svg" />
                    </span>}
                    
                  </h4>
                </div>
                <div className={styles.userlisting}>
                  <ul>
                    <li>
                      <div className={styles.listWrp}>
                        <label>${shortNum(collection?.stats?.total_sales)}</label>
                        <span>Highest Sale</span>
                      </div>
                    </li>
                    <li>
                      <div className={styles.listWrp}>
                        <label>${shortNum(collection?.stats?.floor_price?collection?.stats?.floor_price:0)}</label>
                        <span>Floor price</span>
                      </div>
                    </li>
                    <li>
                      <div className={styles.listWrp}>
                        <label>${shortNum(collection?.stats?.market_cap)}</label>
                        <span>Market Cap</span>
                      </div>
                    </li>
                    <li>
                      <div className={styles.listWrp}>
                        <label>{shortNum(collection?.stats?.total_supply)}</label>
                        <span>Items</span>
                      </div>
                    </li>
                    <li>
                      <div className={styles.listWrp}>
                        <label>{shortNum(collection?.stats?.num_owners)}</label>
                        <span>Owners</span>
                      </div>
                    </li>
                    <li>
                      <div className={styles.listWrp}>
                        <label>${shortNum(collection?.stats?.total_volume)}</label>
                        <span>Total Volume</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className={styles.listInfoDis}>
                  <p>
                    {collection?.description }
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.exloreArtWork}>
              <div className="row d-flex justify-content-between sm-block">
                <div className={styles.leftCol}>
                  <div className="main-heading">
                    <h2>Explore Artwork</h2>
                    <p className="subHeading">Explore by 1,25,350 artwork</p>
                  </div>
                </div>
                <div className={styles.rightCol}>
                  <div className="d-flex align-items-center sm-space-between sm-t-20">
                    <div className="latestFilter">
                      <div className="custom-select">
                        <select>
                          <option value="Latest First">Latest First</option>
                          <option value="Latest First">Latest First</option>
                          <option value="Latest First">Latest First</option>
                        </select>
                      </div>
                    </div>
                    <div className="filtersBox">
                      <Button
                        id="fade-button"
                        aria-controls={open ? "fade-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      >
                        <span className="filterIcon">
                          <img src="/images/filter.png" />
                        </span>
                        <span className="filterHeading">Filter.</span>
                      </Button>
                      <Menu
                        className="filterDropWrp"
                        id="fade-menu"
                        MenuListProps={{
                          "aria-labelledby": "fade-button",
                        }}
                        // anchorOrigin={{
                        //   vertical: "top",
                        //   horizontal: "top",
                        // }}
                        // transformOrigin={{
                        //   vertical: "top",
                        //   horizontal: "center",
                        // }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                      >
                        <Accordion
                          expanded={expanded === "panel1"}
                          onChange={handleChange("panel1")}
                          className="filter-accordion"
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>Status</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className="filter-options-wrp">
                              <div className="filter-row d-flex space center mb-10">
                                <div className="filter-select-box col-6">
                                  <FormControl>
                                    <OutlinedInput placeholder="Buy now" />
                                  </FormControl>
                                </div>
                                <div className="filter-select-box col-6">
                                  <FormControl>
                                    <OutlinedInput placeholder="On Auction" />
                                  </FormControl>
                                </div>
                              </div>
                              <div className="filter-row d-flex space center">
                                <div className="filter-select-box col-6">
                                  <FormControl>
                                    <OutlinedInput placeholder="New" />
                                  </FormControl>
                                </div>
                                <div className="filter-select-box col-6">
                                  <FormControl>
                                    <OutlinedInput placeholder="Has Offers" />
                                  </FormControl>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion
                          expanded={expanded === "panel2"}
                          onChange={handleChange("panel2")}
                          className="filter-accordion"
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                          >
                            <Typography>Price</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className="filter-options-wrp">
                              <div className="filter-row d-flex mb-10">
                                <div className="filter-select-box col-12">
                                  <FormControl>
                                    <OutlinedInput placeholder="$ USD" />
                                  </FormControl>
                                </div>
                              </div>
                              <div className="filter-row d-flex ">
                                <div className="filter-select-box col-6">
                                  <FormControl>
                                    <OutlinedInput placeholder="$ Min" />
                                  </FormControl>
                                </div>
                                <span className="to">to</span>
                                <div className="filter-select-box col-6">
                                  <FormControl>
                                    <OutlinedInput placeholder="$ Max" />
                                  </FormControl>
                                </div>
                              </div>
                              <div className="applybtn">
                                <Button>Apply</Button>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion
                          expanded={expanded === "panel3"}
                          onChange={handleChange("panel3")}
                          className="filter-accordion"
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>Chains</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className="filter-options-wrp">
                              <div className="filter-row d-flex center">
                                <div className="filter-select-box col-4">
                                  <FormControl>
                                    <OutlinedInput placeholder="Ethereum" />
                                  </FormControl>
                                </div>
                                <div className="filter-select-box col-4">
                                  <FormControl>
                                    <OutlinedInput placeholder="Polygon" />
                                  </FormControl>
                                </div>

                                <div className="filter-select-box col-4">
                                  <FormControl>
                                    <OutlinedInput placeholder="Klaytn" />
                                  </FormControl>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion
                          expanded={expanded === "panel4"}
                          onChange={handleChange("panel4")}
                          className="filter-accordion"
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>On Sale In</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className="filter-options-wrp">
                              <div className="filter-row d-flex">
                                <div className="filter-select-box col-6">
                                  <div className="input-checkbox">
                                    <Checkbox
                                      label="My checkbox"
                                      labelStyle={{ color: "#F9F6FD;" }}
                                      iconStyle={{ fill: "#F9F6FD;" }}
                                      inputStyle={{ color: "#F9F6FD;" }}
                                      style={{ color: "#F9F6FD;" }}
                                    />
                                    <span className="check-title">ETH</span>
                                  </div>
                                </div>
                                <div className="filter-select-box col-6">
                                  <div className="input-checkbox">
                                    <Checkbox
                                      label="My checkbox"
                                      labelStyle={{ color: "#F9F6FD;" }}
                                      iconStyle={{ fill: "#F9F6FD;" }}
                                      inputStyle={{ color: "#F9F6FD;" }}
                                      style={{ color: "#F9F6FD;" }}
                                    />
                                    <span className="check-title">WETH</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="containerFluid">
            <div className="collectionListArea mt-70 ">
              <ul>
                {itemList?.length>0 && itemList.map((item, i) => {
                  return (
                    <li className="collection-box-container" key={item._id}>
                      <div className="collection-item-wrp">
                        <div className="item-img-wrp">
                        <Link href={`/nft-art/slug/${item?.asset?.asset_contract?.address}`} >
                        <a>
                          <figure>
                            <img src={item?.asset?.image_preview_url?item?.asset?.image_preview_url:'/images/placeholder.png'} style={{height: '280px',width:'100%'}} />
                          </figure>
                          </a>
                      </Link>
                        </div>
                        <div className="colllection-caontent">
                          <div className="collection-top-info d-flex justify-content-between align-items-center">
                            <div className="media align-items-center">
                              <div className="collection-user-circle">
                                <img src={item?.asset?.owner?.profile_img_url?item?.asset?.owner?.profile_img_url:'/images/placeholder.png'} />
                              </div>
                              <div className="media-body">
                                <h5 className="d-flex align-items-center">
                                {shortStr(item?.asset?.name)}
                                  {item?.creatorData?.approved_account && <span>
                                    <img src="/images/Done.svg" />
                                  </span>}
                                </h5>
                              </div>
                            </div>
                            <div className="brandIcon">
                              <span>
                                {item?.networkData?.chainId=="0x13881"?<img src={"/images/brandIcon.png"} />:<img src={"/images/token-icon.png"} />}
                              </span>
                            </div>
                          </div>
                          <div className="collection-btm">
                          <h3> 
                          {shortStr(item?.asset?.description)?shortStr(item?.asset?.description):"----"}</h3>
                            <span style={{color:'white',fontSize:14}}>by <strong>{shortStr(item?.asset?.owner?.address||item?.asset?.owner?.user)}</strong></span>
                            <h4>
                              {/* <span>{item.saleType!=='bid'?'Fixed Price':'Top Bid'} - </span> {objGetFromArray(item?.topBidData)?.price ? objGetFromArray(item?.topBidData)?.price : item?.price ? item?.price : 0}{" "} */}
                              <strong>{item?.networkData?.nativeCurrency?.symbol}</strong>
                            </h4>
                            <h3 style={{color:'white',fontWeight:'bold',fontSize:12,margin:0}}>{(objGetFromArray(item?.item_auction)?.endDate && objGetFromArray(item?.item_auction)?.startDate)?parseDate(objGetFromArray(item?.item_auction)?.startDate)>new Date()?<span>Auction starts in: <Countdown date={parseDate(objGetFromArray(item?.item_auction)?.startDate)} /></span>:<span>Auction ends in: <Countdown date={parseDate(objGetFromArray(item?.item_auction)?.endDate)} /></span>:null}</h3>
                          </div>
                          <div className="buy-row d-flex justify-content-between align-items-center">
                            <div className="left-col">
                              {/* <Link href={`/nft-art/${item?._id}`} > */}
                                <a className="by-now-btn collection">
                                  {item.saleType!=='bid'?'Buy Now':'Place Bid'}
                                </a>
                                {/* </Link> */}

                            </div> 
                            {/* <div className="fav-col">
                              <Checkbox
                                {...label}
                                onChange={(e)=>handleLikeUnlike(e,item?._id)}
                                icon={<FavoriteBorder />}
                                checked={item?.likedCount?item?.likedCount>0:false}
                                checkedIcon={<Favorite />}
                              />
                              <span className="fav-count">
                                {shortNum(item.likedCount)!=0?shortNum(item.likedCount):null}
                              </span>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
