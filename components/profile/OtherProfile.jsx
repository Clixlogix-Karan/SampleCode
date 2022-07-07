import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "../../styles/components/profile/profile.module.scss";
import { createPostReq, getAllNftsAlchemy,createGetReq } from "../../apis/factory.api";
import {GET_USER,LIKE_ITEM,UNLIKE_ITEM,FETCH_ALL_MY_COLLECTIONS,FETCH_NFT_MY_LIST,FETCH_NFT_LIST,FETCH_NFT_LIST_LIKE} from "../../apis/variables";
import { useAuth } from "../../contexts/auth.context";
import { useRouter } from "next/router";
import ProfileSettings from './ProfileSettings'
import { Grid } from "@mui/material";
import Link from 'next/link'
import ActivityItem from "./ActivityItem";

const OtherProfile = ({value,TabPanel,activitiesList,router,handleSearch,handleLikeUnlike,unFollowHandler,FollowHandler,disableMore,label,userDetails,user,collectedNfts,handleChange,handleChangeTab,a11yProps,open,anchorEl,handleClose,expanded,handleClick,createdItemList,itemsOnSale,collectedFavNfts,loadMore})=>{
	
  const ActivityItems = () => activitiesList?.length>0?activitiesList?.map((itemDetails)=><ActivityItem itemDetails={itemDetails}/>):null

	return (
       <div className={styles.profiletabContainer}>
            <div className="profiletabsContainer">
              <div className="customContainer">
                <Tabs
                  value={value}
                  onChange={handleChangeTab}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="scrollable force tabs example"
                >
                  <Tab
                    className="tabBtn"
                    label="Collected"
                    {...a11yProps(0)}
                    icon={
                      <Avatar
                        classsName="tab-icon"
                        src="/images/Collected.svg"
                      />
                    }
                  />
                  <Tab
                    className="tabBtn"
                    label="Created"
                    {...a11yProps(1)}
                    icon={
                      <Avatar classsName="tab-icon" src="/images/Created.svg" />
                    }
                  />
                  <Tab
                    className="tabBtn"
                    label="On Sale"
                    {...a11yProps(2)}
                    icon={
                      <Avatar classsName="tab-icon" src="/images/Created.svg" />
                    }
                  />
                  <Tab
                    className="tabBtn"
                    label="Activity"
                    {...a11yProps(4)}
                    icon={
                      <Avatar
                        classsName="tab-icon"
                        src="/images/Activity.svg"
                      />
                    }
                  />
                </Tabs>
              </div>
            </div>

            <div className="containerFluid ProfileTabPanel">
              <div className="row d-flex justify-content-between sm-block align-items-center profileFilterPosition">
                <div className={styles.rightCol}>
                  <div className="d-flex align-items-center sm-space-between sm-t-20 profile">
                    <div className="latestFilter">
                      <div className="custom-select">
                        <select>
                          <option value="Latest First">Latest First</option>
                          <option value="Latest First">Latest First</option>
                          <option value="Latest First">Latest First</option>
                        </select>
                      </div>
                    </div>
                    <div className={styles.searchFormBox}>
                      <div className={styles.searchHeaderForm}>
                        <form>
                          <div className={styles.searchRow}>
                            <span className={styles.searchIcon}>
                              {" "}
                              <img src="/images/searchicon.png" />
                            </span>
                            <div className={styles.textFieldRadius}>
                              <TextField
                                fullWidth
                                id="standard-bare"
                                variant="outlined"
                                placeholder="Search"
                                autoComplete='off'
                                onChange={handleSearch}
                              />
                            </div>
                          </div>
                        </form>
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
              <TabPanel value={value} index={0}>
                <div className="row d-flex justify-content-between sm-block align-items-center">
                  <div className="main-heading">
                    <h2>Collected Nfts</h2>
                  </div>
                </div>

                <div className={styles.profilpanelContainer}>
                  <div className={styles.collectionArea}>
                      
                  <Grid container spacing={2}>
                  {collectedNfts?.map((collection, i) => {
                    return (
                      <Grid item style={{width:'100%'}} md={3} sm={6} lg={3}  key={collection._id}>
                          <div className={styles.collectionItemWrp}>
                          <div className={styles.imgWrp}>
                              <figure className={styles.mainImg}>
                                <img width={300} height={200} style={{height:280}}  src={collection?.metadata?.image} />
                              </figure>
                              <figure className={styles.btmImg}>
                                <img  height={100} width={100} src={collection?.authImg} />
                              </figure>
                            </div>
                            <div className={styles.collectionDetail}>
                              <h3>
                              {(collection?.title + "")?.length < 10 ? collection?.title : (collection?.title + "")?.substring(0, 10) + "..."}
                              {collection?.creatorData?.isVerified && <span>
                                          <img src="/images/Done.svg" />
                                        </span>
                                        }
                              </h3>
                              <h4>
                                by
                                <strong>
                                {(collection?.contract?.address + "")?.length < 15 ? collection?.contract?.address : (collection?.contract?.address + "")?.substring(0, 15) + "..."}
                                  </strong>
                                  {collection?.creatorData?.isVerified && <span>
                                          <img src="/images/Done.svg" />
                                        </span>
                                        }
                              </h4>
                              <p>
                              {(collection?.description + "")?.length < 18 ? collection?.description : (collection?.description + "")?.substring(0, 18) + "..."}</p>
                            </div>
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>

                  
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="profile-panel-wrp">
                  <div className="row d-flex justify-content-between sm-block align-items-center">
                    <div className="main-heading">
                      <h2>Items</h2>
                    </div>
                  </div>
                  <div className={styles.profilpanelContainer}>
                    <div className="collectionListArea">
                      <ul>
                        {createdItemList.map((itemsCollections) => {
                          return (
                            <li className="collection-box-container">
                              <div className="collection-item-wrp" onClick={()=>router.push(itemsCollections?.creatorData?._id==user?._id?`/item/${itemsCollections._id}`:`/nft-art/${itemsCollections?._id}`)}>
                                <div className="item-img-wrp">
                                  <figure>
                                    <img src={itemsCollections.tokenData.imageUrl} style={{height:280}} />
                                  </figure>
                                </div>
                                <div className="colllection-caontent">
                                  <div className="collection-top-info d-flex justify-content-between align-items-center">
                                    <div className="media align-items-center">
                                      <div className="collection-user-circle">
                                        <img src={itemsCollections.collectionData?.bannerImage} />
                                      </div>
                                      <div className="media-body">
                                        <h5 className="d-flex align-items-center">
                                        {(itemsCollections.name + "")?.length < 10 ? itemsCollections.name : (itemsCollections.name + "")?.substring(0, 10) + "..."}
                                        {itemsCollections?.creatorData?.isVerified && <span>
                                          <img src="/images/Done.svg" />
                                        </span>
                                        }
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="brandIcon">
                                     <span>
                                        {itemsCollections?.networkData?.chainId=="0x13881"?<img  src={"/images/brandIcon.png"} />:<img style={{width:33,height:33}} src={"/images/token-icon.png"} />}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="collection-btm">
                                    <h3> {itemsCollections.title}</h3>
                                      <h4>{(itemsCollections?.description + "")?.length < 10 ? itemsCollections?.description : (itemsCollections?.description + "")?.substring(0, 10) + "..."}</h4>
                                   <span style={{color:'#fff'}}>by <strong><Link href={`/profile/${itemsCollections?.creatorData?._id}`} ><a>{(itemsCollections?.creatorData?.name + "")?.length < 10 ? itemsCollections?.creatorData?.name : (itemsCollections?.creatorData?.name + "")?.substring(0, 10) + "..."}</a></Link></strong></span>
                                 
                                    <h4>
                                      <span>Top Bid - </span> {itemsCollections?.price?itemsCollections?.price:'15,330'} {' '}<strong>{itemsCollections?.networkData?.nativeCurrency?.name}</strong>

                                     </h4>
                                  </div>
                                  <div className="buy-row d-flex justify-content-between align-items-center">
                                   {
                                      itemsCollections?.creatorData?._id==user?._id?(
                                        <div className="left-col" onClick={()=>router.push(`/item/${itemsCollections._id}`)}>
                                          <a
                                            className="by-now-btn collection"
                                            // href="/nft-art"
                                          >
                                            Sell Now
                                          </a>
                                        </div>
                                        ):<div className="left-col" onClick={()=>router.push(`/nft-art/${itemsCollections?._id}`)}>
                                          <a
                                            className="by-now-btn collection"
                                            // href="/nft-art"
                                          >
                                            Buy Now
                                          </a>
                                        </div>
                                    }
                                    <div className="fav-col">
                                      <Checkbox
                                        {...label}
                                        icon={<FavoriteBorder />}
                                        defaultChecked={itemsCollections?.likedCount?itemsCollections?.likedCount>0:false}
                                        checkedIcon={<Favorite />}
                                        onChange={(e)=>handleLikeUnlike(e,itemsCollections?._id)}
                                      />
                                      <span className="fav-count">
                                        {itemsCollections.favCout}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>

                      {
                       createdItemList?.length>0 && createdItemList?.length>=20?(
                          !disableMore && <div onClick={()=>loadMore()} className={styles.morecollectionRow}>
                          <Button color="secondary">Explore more collection</Button>
                        </div>
                        ):null
                      }
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className="profile-panel-wrp">
                  <div className="row d-flex justify-content-between sm-block align-items-center">
                    <div className="main-heading">
                      <h2>On Sale</h2>
                    </div>
                  </div>
                  <div className={styles.profilpanelContainer}>
                    <div className="collectionListArea">
                      <ul>
                        {itemsOnSale.map((itemsCollections) => {
                          return (
                            <li className="collection-box-container">
                              <div className="collection-item-wrp">
                                <div className="item-img-wrp">
                                  <figure>
                                    <img src={itemsCollections.tokenData.imageUrl} style={{height:280}} />
                                  </figure>
                                </div>
                                <div className="colllection-caontent">
                                  <div className="collection-top-info d-flex justify-content-between align-items-center">
                                    <div className="media align-items-center">
                                      <div className="collection-user-circle">
                                        <img src={itemsCollections.collectionData?.logo} />
                                      </div>
                                      <div className="media-body">
                                        <h5 className="d-flex align-items-center">
                                        {(itemsCollections.name + "")?.length < 10 ? itemsCollections.name : (itemsCollections.name + "")?.substring(0, 10) + "..."}
                                        {itemsCollections?.creatorData?.isVerified && <span>
                                          <img src="/images/Done.svg" />
                                        </span>
                                        }
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="brandIcon">
                                      <span>
                                        <img
                                          src={'/images/brandIcon.png'}
                                        />
                                      </span>
                                    </div>
                                  </div>
                                  <div className="collection-btm">
                                    <h3>{(itemsCollections.title + "")?.length < 10 ? itemsCollections.title : (itemsCollections.title + "")?.substring(0, 10) + "..."}</h3>
                                        <h4>{(itemsCollections?.description + "")?.length < 10 ? itemsCollections?.description : (itemsCollections?.description + "")?.substring(0, 10) + "..."}</h4>
                                   <span style={{color:'#fff'}}>by <strong><Link href={`/profile/${itemsCollections?.creatorData?._id}`} ><a>{(itemsCollections?.creatorData?.name + "")?.length < 10 ? itemsCollections?.creatorData?.name : (itemsCollections?.creatorData?.name + "")?.substring(0, 10) + "..."}</a></Link></strong></span>
                                 
                                    <h4>
                                      <span>Top Bid - </span> {itemsCollections?.price?itemsCollections?.price:'15,330'} {' '}<strong>{itemsCollections?.networkData?.nativeCurrency?.name}</strong>

                                     </h4>
                                  </div>
                                  <div className="buy-row d-flex justify-content-between align-items-center">
                                    {
                                      itemsCollections?.creatorData?._id==user?._id?(
                                        <div className="left-col" onClick={()=>router.push(`/item/${itemsCollections._id}`)}>
                                          <a
                                            className="by-now-btn collection"
                                            // href="/nft-art"
                                          >
                                            On sale
                                          </a>
                                        </div>
                                        ):<div className="left-col" onClick={()=>router.push(`/nft-art/${itemsCollections?._id}`)}>
                                          <a
                                            className="by-now-btn collection"
                                            // href="/nft-art"
                                          >
                                            Buy Now
                                          </a>
                                        </div>
                                    }
                                    <div className="fav-col">
                                      <Checkbox
                                        {...label}
                                        icon={<FavoriteBorder />}
                                        onChange={(e)=>handleLikeUnlike(e,itemsCollections?._id)}
                                        checkedIcon={<Favorite />}
                                         defaultChecked={itemsCollections?.likedCount?itemsCollections?.likedCount>0:false}
                                      />
                                      <span className="fav-count">
                                        {itemsCollections.favCout}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                      {
                       itemsOnSale?.length>0 && itemsOnSale?.length>=20?(
                          !disableMore && <div onClick={()=>loadMore()} className={styles.morecollectionRow}>
                          <Button color="secondary">Explore more collection</Button>
                        </div>
                        ):null
                      }
                    </div>
                  </div>
                </div>
              </TabPanel>
              
              <TabPanel value={value} index={3}>
              <div className="profile-panel-wrp">
            <div className="row d-flex justify-content-between sm-block align-items-center">
              <div className="main-heading">
                <h2>Activity</h2>
              </div>
            </div>
            <div className={styles.profilpanelContainer}>
              <div className={styles.activityGraphRow}>
                <div className={styles.activityTOp}>
                  <div className="d-flex">
                    <div className={styles.activitybx}>
                      <span>90day Avg. Price</span>
                      <strong>15,35,450 ETH</strong>
                    </div>
                    <div className={styles.activitybx}>
                      <span>90day Avg. Price</span>
                      <strong>15,35,450 ETH</strong>
                    </div>
                  </div>
                </div>
                <div className={styles.activityGrapWrp}>
                  <figure>
                    <img src="/images/graph-img.png" />
                  </figure>
                </div>
              </div>
              <div className={styles.profileTableData}>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <span className={styles.emptyCell}>
                            Transfer
                          </span>
                        </TableCell>
                        <TableCell>Items</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <ActivityItems />
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
              </TabPanel>             
            </div>
          </div>
    )
}


export default OtherProfile