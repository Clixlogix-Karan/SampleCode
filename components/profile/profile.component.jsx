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
import {GET_USER,LIKE_ITEM,UNLIKE_ITEM,ACTIVITY_GET_LIST,FETCH_ALL_MY_COLLECTIONS,FETCH_NFT_MY_LIST,FETCH_NFT_LIST,FETCH_NFT_LIST_LIKE,GET_OFFERS_LIST, ACCEPT_OFFERS} from "../../apis/variables";
import { useAuth } from "../../contexts/auth.context";
import { useRouter } from "next/router";
import ProfileSettings from './ProfileSettings'
import { Grid } from "@mui/material";
import LoggedIn from './LoggedIn'
import OtherProfile from './OtherProfile'
import AlertBox from '../../components/layout/Modal'

export default function ProfileComponent() {
  const { user } = useAuth()
  const [readMore, setReadMore] = useState(false);
  const [createdItemList, setCreatedItemList] = useState([]);
  const [itemsOnSale, setItemsOnSale] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState('');
  const router = useRouter()
  const [pageNumber, setPageNumber] = React.useState(1);
  const [value, setValue] = React.useState(0);
  const [disableMore, setDisableMore] = React.useState(false);
  const [collectedNfts, setCollectedNfts] = useState([]);
  const [collectedFavNfts, setCollectedFavNfts] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [activeTabIndex,setActiveTabIndex] = useState(0)
  const [reloadData,setReloadData] = useState(false)
  const [reloadData2,setReloadData2] = useState(false)
  const [reloadData3,setReloadData3] = useState(false)
  const [activitiesList,setActivitList] = useState([])
  const [offersLists,setOffersList] = useState([])
  const [isAlert,setAlert] = React.useState("")
  const [sortBy,setSortBy] = React.useState("last")

  useEffect(()=>{
    if(value){
      setPageNumber(1)
      setDisableMore(false)
    }
  },[value])

// console.log("router",router?.query?.userId)

  useEffect(()=>{
      if(router?.query?.userId){
        let url = `${GET_USER}?id=${router?.query?.userId}`
        //for checking follow and unfollow logic
        if(user?._id && router?.query?.userId!=user?._id){
          url +=`&visitUserId=${user?._id}`
        }
        createGetReq(url)
        .then((res)=>{
          if(res?.data){
            setUserDetails(res?.data)
            getAllNftsAlchemy({owner: res.data.walletAddress})
              .then(res=>{
                setCollectedNfts(res.ownedNfts)
              })
          }
        }).catch((e)=>{
          console.log(e)
        })
      }
  },[router?.query?.userId,user,reloadData])

  useEffect(async()=>{
    if (!user) return 
    let PAYLOAD = {
      pageNo: pageNumber,
      limit: 20,
      userId : router?.query?.userId
    }
    if(user?._id){
      PAYLOAD.visitUserId = user?._id
    }
    let url = user?._id?FETCH_NFT_MY_LIST:FETCH_NFT_LIST
  
    createPostReq(url, { ...PAYLOAD, onSale: false}).then(res => {
      if(res.data?.length==0){
        setDisableMore(true)
      }
      setCreatedItemList(createdItemList.concat(res.data))
    }).catch(err => console.log(err))
    createPostReq(url, { ...PAYLOAD, onSale : true}).then(res => {
      if(res.data?.length==0){
        setDisableMore(true)
      }
      setItemsOnSale(itemsOnSale.concat(res.data))
    }).catch(err => console.log(err))
  },[user,pageNumber,router?.query?.userId])

  //fav
   useEffect(async()=>{
    if (!user) return 
    let PAYLOAD = {
      pageNo: pageNumber,
      limit: 20,
      userId : router?.query?.userId
    }
    if(user?._id){
      PAYLOAD.visitUserId = user?._id
    }
    createPostReq(FETCH_NFT_LIST_LIKE, { ...PAYLOAD}).then(res => {
      if(res.data?.length==0){
        setDisableMore(true)
      }
      setCollectedFavNfts(res?.data)

    }).catch(err => console.log(err))
  },[reloadData2,pageNumber,value,router?.query?.userId])

  useEffect(()=>{
     if (!user) return 
    let PAYLOAD = {
      pageNo: 1,
      limit: 20,
      userId : router?.query?.userId,
    }
    if(user?._id){
      PAYLOAD.visitUserId = user?._id
    }
    let url = user?._id?FETCH_NFT_MY_LIST:FETCH_NFT_LIST
    createPostReq(url, { ...PAYLOAD, onSale: false}).then(res => {
      if(res.data?.length==0){
        setDisableMore(true)
      }
      setCreatedItemList(res.data)
    }).catch(err => console.log(err))
    createPostReq(url, { ...PAYLOAD, onSale : true}).then(res => {
      if(res.data?.length==0){
        setDisableMore(true)
      }
      setItemsOnSale(res.data)
    }).catch(err => console.log(err))
  },[value,router?.query?.userId])
  
  useEffect(()=>{
    // if(searchName && (searchName+"")?.length>0){
      if (!user) return 
      let PAYLOAD = {
      pageNo: 1,
      limit: 20,
      name:searchName,
      userId : router?.query?.userId,
      sortBy
    }
    if(user?._id){
      PAYLOAD.visitUserId = user?._id
    }

    if(!PAYLOAD?.name){
      delete PAYLOAD.name
    }

    let url = user?._id?FETCH_NFT_MY_LIST:FETCH_NFT_LIST

    setPageNumber(1)
    createPostReq(url, { ...PAYLOAD, onSale: false}).then(res => {
        setDisableMore(false)
      setCreatedItemList(res.data)
    }).catch(err => console.log(err))
    createPostReq(url, { ...PAYLOAD, onSale : true}).then(res => {
        setDisableMore(false)
      setItemsOnSale(res.data)
    }).catch(err => console.log(err))
    createPostReq(FETCH_NFT_LIST_LIKE, { ...PAYLOAD}).then(res => {
      if(res.data?.length==0){
        setDisableMore(true)
      }
      setCollectedFavNfts(res?.data)

    }).catch(err => console.log(err))
    const myPayload = {
      pageNo: 1,
      limit: 20,
    }
    createPostReq(ACTIVITY_GET_LIST, {...myPayload}).then(res => {
      if(res.data?.length==0){
        setDisableMore(true)
      }
      setActivitList(res?.data)

    }).catch(err => console.log(err))

    // }
  },[searchName,router?.query?.userId,sortBy])


  useEffect(()=>{
    if(!router?.query?.userId) return
    const payload ={
      pageNo: 1,
      limit: 20,
      userId: router?.query?.userId
    }
    createPostReq(GET_OFFERS_LIST, payload).then(res => {
      if(res.data?.length==0){
        setDisableMore(true)
      }
      setOffersList(res?.data)

    }).catch(err => console.log(err))
  },[router?.query?.userId,reloadData3])


  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const extraContent = (
    <span className="more-content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt.
    </span>
  );
  const linkName = readMore ? "Less  " : "More  ";

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
    setActiveTabIndex(index)
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
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

  const loadMore=()=>{
    setPageNumber(pageNumber+1)
  }

  const hiddenFileInput = useRef(null);

  const handleSearch = (e)=>{
    // console.log('handleSearch',e.target.value)
    setSearchName(e.target.value)
  }


  const FollowHandler= ()=>{
    if(user?._id){
      setLoading(true)
        createPostReq('/user/follow', {userId: router?.query?.userId}).then(res => {
          setLoading(false)
          if(res?.message && (res?.message+"")?.length>0){
            setAlert(res?.message)
          }
          setReloadData(!reloadData)
      }).catch(err =>{
          setLoading(false)        
         if(err?.response?.data && err?.response?.data?.message){
          setAlert(err?.response?.data?.message)
         }
      })
     }else{
      setAlert("Need to login")
     }
  }

  const unFollowHandler= ()=>{
    if(user?._id){
      setLoading(true)
        createPostReq('/user/unfollow', {userId: router?.query?.userId}).then(res => {
          setLoading(false)
          if(res?.message && (res?.message+"")?.length>0){
            setAlert(res?.message)
          }
          setReloadData(!reloadData)
      }).catch(err =>{
        setLoading(false)
         if(err?.response?.data && err?.response?.data?.message){
          setAlert(err?.response?.data?.message)
         }
      })
     }else{
      setAlert("Need to login")
     }
  }


const styleAddress = {
  background: '#3b1478',
    borderRadius: 10,
    padding: '5px 4px 0px 5px',
    marginLeft: 5,
    cursor: 'pointer',
    color:'#ffffff'
}

  const copyToClipBoard=(walletAddress="")=>{
    navigator.clipboard.writeText(walletAddress);
    setAlert('Copied address ' + '"' + walletAddress + '"' + ' to clipboard')
  }

  const followStylebtn = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    background: '#fff',
    width: 100,
    borderRadius: 30,
    color:'#5843a0',
    marginTop:10
  }

   const handleLikeUnlike = (e,itemId)=>{
    const checked = e.target.checked
    const url = checked?LIKE_ITEM:UNLIKE_ITEM
     const req = checked?{itemId}:{likeItemId:itemId}
      createPostReq(url, req).then(res => {
        // console.log("res",res?.message)
        // if(value==3){
         setReloadData2(!reloadData2)
        // }
          if(res?.message){
            setAlert(res?.message)
          }
        }).catch((e)=>{
          if(e?.response?.data?.message){
            setAlert(e?.response?.data?.message)
          }
        })
  }



  // const LoggedIn = ({setName})=>(
  //      <div className={styles.profiletabContainer}>
  //           <div className="profiletabsContainer">
  //             <div className="customContainer">
  //               <Tabs
  //                 value={value}
  //                 onChange={handleChangeTab}
  //                 variant="scrollable"
  //                 scrollButtons
  //                 allowScrollButtonsMobile
  //                 aria-label="scrollable force tabs example"
  //               >
  //                 <Tab
  //                   className="tabBtn"
  //                   label="Collected"
  //                   {...a11yProps(0)}
  //                   icon={
  //                     <Avatar
  //                       classsName="tab-icon"
  //                       src="/images/Collected.svg"
  //                     />
  //                   }
  //                 />
  //                 <Tab
  //                   className="tabBtn"
  //                   label="Created"
  //                   {...a11yProps(1)}
  //                   icon={
  //                     <Avatar classsName="tab-icon" src="/images/Created.svg" />
  //                   }
  //                 />
  //                 <Tab
  //                   className="tabBtn"
  //                   label="On Sale"
  //                   {...a11yProps(2)}
  //                   icon={
  //                     <Avatar classsName="tab-icon" src="/images/Created.svg" />
  //                   }
  //                 />
  //                 <Tab
  //                   className="tabBtn"
  //                   label="Favorited"
  //                   {...a11yProps(3)}
  //                   icon={
  //                     <Avatar
  //                       classsName="tab-icon"
  //                       src="/images/Favorited.svg"
  //                     />
  //                   }
  //                 />
  //                 <Tab
  //                   className="tabBtn"
  //                   label="Activity"
  //                   {...a11yProps(4)}
  //                   icon={
  //                     <Avatar
  //                       classsName="tab-icon"
  //                       src="/images/Activity.svg"
  //                     />
  //                   }
  //                 />

  //                 <Tab
  //                   className="tabBtn"
  //                   label="Offers"
  //                   {...a11yProps(5)}
  //                   icon={
  //                     <Avatar classsName="tab-icon" src="/images/Offers.svg" />
  //                   }
  //                 />
  //                 <Tab
  //                   className="tabBtn"
  //                   label="Settings"
  //                   {...a11yProps(6)}
  //                   icon={
  //                     <Avatar
  //                       classsName="tab-icon"
  //                       src="/images/Settings.svg"
  //                     />
  //                   }
  //                 />
  //               </Tabs>
  //             </div>
  //           </div>

  //           <div className="containerFluid ProfileTabPanel">
  //             <div className="row d-flex justify-content-between sm-block align-items-center profileFilterPosition">
  //               <div className={styles.rightCol}>
  //                 <div className="d-flex align-items-center sm-space-between sm-t-20 profile">
  //                   <div className="latestFilter">
  //                     <div className="custom-select">
  //                       <select>
  //                         <option value="Latest First">Latest First</option>
  //                         <option value="Latest First">Latest First</option>
  //                         <option value="Latest First">Latest First</option>
  //                       </select>
  //                     </div>
  //                   </div>
  //                   <div className={styles.searchFormBox}>
  //                     <div className={styles.searchHeaderForm}>
  //                         <div className={styles.searchRow}>
  //                           <span className={styles.searchIcon}>
  //                             {" "}
  //                             <img src="/images/searchicon.png" />
  //                           </span>
  //                           <div className={styles.textFieldRadius}>
  //                             <TextField
  //                               fullWidth
  //                               id="standard-bare2"
  //                               variant="outlined"
  //                               placeholder="Search"
  //                               value={searchName}
  //                               autoComplete='off'
  //                               onChange={setName}
  //                             />
  //                           </div>
  //                         </div>
  //                     </div>
  //                   </div>
  //                   <div className="filtersBox">
  //                     <Button
  //                       id="fade-button"
  //                       aria-controls={open ? "fade-menu" : undefined}
  //                       aria-haspopup="true"
  //                       aria-expanded={open ? "true" : undefined}
  //                       onClick={handleClick}
  //                     >
  //                       <span className="filterIcon">
  //                         <img src="/images/filter.png" />
  //                       </span>
  //                       <span className="filterHeading">Filter.</span>
  //                     </Button>
  //                     <Menu
  //                       className="filterDropWrp"
  //                       id="fade-menu"
  //                       MenuListProps={{
  //                         "aria-labelledby": "fade-button",
  //                       }}
  //                       // anchorOrigin={{
  //                       //   vertical: "top",
  //                       //   horizontal: "top",
  //                       // }}
  //                       // transformOrigin={{
  //                       //   vertical: "top",
  //                       //   horizontal: "center",
  //                       // }}
  //                       anchorEl={anchorEl}
  //                       open={open}
  //                       onClose={handleClose}
  //                       TransitionComponent={Fade}
  //                     >
  //                       <Accordion
  //                         expanded={expanded === "panel1"}
  //                         onChange={handleChange("panel1")}
  //                         className="filter-accordion"
  //                       >
  //                         <AccordionSummary
  //                           expandIcon={<ExpandMoreIcon />}
  //                           aria-controls="panel1a-content"
  //                           id="panel1a-header"
  //                         >
  //                           <Typography>Status</Typography>
  //                         </AccordionSummary>
  //                         <AccordionDetails>
  //                           <div className="filter-options-wrp">
  //                             <div className="filter-row d-flex space center mb-10">
  //                               <div className="filter-select-box col-6">
  //                                 <FormControl>
  //                                   <OutlinedInput placeholder="Buy now" />
  //                                 </FormControl>
  //                               </div>
  //                               <div className="filter-select-box col-6">
  //                                 <FormControl>
  //                                   <OutlinedInput placeholder="On Auction" />
  //                                 </FormControl>
  //                               </div>
  //                             </div>
  //                             <div className="filter-row d-flex space center">
  //                               <div className="filter-select-box col-6">
  //                                 <FormControl>
  //                                   <OutlinedInput placeholder="New" />
  //                                 </FormControl>
  //                               </div>
  //                               <div className="filter-select-box col-6">
  //                                 <FormControl>
  //                                   <OutlinedInput placeholder="Has Offers" />
  //                                 </FormControl>
  //                               </div>
  //                             </div>
  //                           </div>
  //                         </AccordionDetails>
  //                       </Accordion>

  //                       <Accordion
  //                         expanded={expanded === "panel2"}
  //                         onChange={handleChange("panel2")}
  //                         className="filter-accordion"
  //                       >
  //                         <AccordionSummary
  //                           expandIcon={<ExpandMoreIcon />}
  //                           aria-controls="panel2a-content"
  //                           id="panel2a-header"
  //                         >
  //                           <Typography>Price</Typography>
  //                         </AccordionSummary>
  //                         <AccordionDetails>
  //                           <div className="filter-options-wrp">
  //                             <div className="filter-row d-flex mb-10">
  //                               <div className="filter-select-box col-12">
  //                                 <FormControl>
  //                                   <OutlinedInput placeholder="$ USD" />
  //                                 </FormControl>
  //                               </div>
  //                             </div>
  //                             <div className="filter-row d-flex ">
  //                               <div className="filter-select-box col-6">
  //                                 <FormControl>
  //                                   <OutlinedInput placeholder="$ Min" />
  //                                 </FormControl>
  //                               </div>
  //                               <span className="to">to</span>
  //                               <div className="filter-select-box col-6">
  //                                 <FormControl>
  //                                   <OutlinedInput placeholder="$ Max" />
  //                                 </FormControl>
  //                               </div>
  //                             </div>
  //                             <div className="applybtn">
  //                               <Button>Apply</Button>
  //                             </div>
  //                           </div>
  //                         </AccordionDetails>
  //                       </Accordion>

  //                       <Accordion
  //                         expanded={expanded === "panel3"}
  //                         onChange={handleChange("panel3")}
  //                         className="filter-accordion"
  //                       >
  //                         <AccordionSummary
  //                           expandIcon={<ExpandMoreIcon />}
  //                           aria-controls="panel1a-content"
  //                           id="panel1a-header"
  //                         >
  //                           <Typography>Chains</Typography>
  //                         </AccordionSummary>
  //                         <AccordionDetails>
  //                           <div className="filter-options-wrp">
  //                             <div className="filter-row d-flex center">
  //                               <div className="filter-select-box col-4">
  //                                 <FormControl>
  //                                   <OutlinedInput placeholder="Ethereum" />
  //                                 </FormControl>
  //                               </div>
  //                               <div className="filter-select-box col-4">
  //                                 <FormControl>
  //                                   <OutlinedInput placeholder="Polygon" />
  //                                 </FormControl>
  //                               </div>

  //                               <div className="filter-select-box col-4">
  //                                 <FormControl>
  //                                   <OutlinedInput placeholder="Klaytn" />
  //                                 </FormControl>
  //                               </div>
  //                             </div>
  //                           </div>
  //                         </AccordionDetails>
  //                       </Accordion>

  //                       <Accordion
  //                         expanded={expanded === "panel4"}
  //                         onChange={handleChange("panel4")}
  //                         className="filter-accordion"
  //                       >
  //                         <AccordionSummary
  //                           expandIcon={<ExpandMoreIcon />}
  //                           aria-controls="panel1a-content"
  //                           id="panel1a-header"
  //                         >
  //                           <Typography>On Sale In</Typography>
  //                         </AccordionSummary>
  //                         <AccordionDetails>
  //                           <div className="filter-options-wrp">
  //                             <div className="filter-row d-flex">
  //                               <div className="filter-select-box col-6">
  //                                 <div className="input-checkbox">
  //                                   <Checkbox
  //                                     label="My checkbox"
  //                                     labelStyle={{ color: "#F9F6FD;" }}
  //                                     iconStyle={{ fill: "#F9F6FD;" }}
  //                                     inputStyle={{ color: "#F9F6FD;" }}
  //                                     style={{ color: "#F9F6FD;" }}
  //                                   />
  //                                   <span className="check-title">ETH</span>
  //                                 </div>
  //                               </div>
  //                               <div className="filter-select-box col-6">
  //                                 <div className="input-checkbox">
  //                                   <Checkbox
  //                                     label="My checkbox"
  //                                     labelStyle={{ color: "#F9F6FD;" }}
  //                                     iconStyle={{ fill: "#F9F6FD;" }}
  //                                     inputStyle={{ color: "#F9F6FD;" }}
  //                                     style={{ color: "#F9F6FD;" }}
  //                                   />
  //                                   <span className="check-title">WETH</span>
  //                                 </div>
  //                               </div>
  //                             </div>
  //                           </div>
  //                         </AccordionDetails>
  //                       </Accordion>
  //                     </Menu>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //             <TabPanel value={value} index={0}>
  //               <div className="row d-flex justify-content-between sm-block align-items-center">
  //                 <div className="main-heading">
  //                   <h2>Collected Nfts</h2>
  //                 </div>
  //               </div>

  //               <div className={styles.profilpanelContainer}>
  //                 <div className={styles.collectionArea}>
                      
  //                 <Grid container spacing={2}>
  //                 {collectedNfts?.map((collection, i) => {
  //                   return (
  //                     <Grid item style={{width:'100%'}} md={3} sm={6} lg={3}  key={collection._id}>
  //                         <div className={styles.collectionItemWrp}>
  //                         <div className={styles.imgWrp}>
  //                             <figure className={styles.mainImg}>
  //                               <img width={300} height={200} style={{height:280}}  src={collection?.metadata?.image} />
  //                             </figure>
  //                             <figure className={styles.btmImg}>
  //                               <img  height={100} width={100} src={collection?.authImg} />
  //                             </figure>
  //                           </div>
  //                           <div className={styles.collectionDetail}>
  //                             <h3>
  //                             {(collection?.title + "")?.length < 10 ? collection?.title : (collection?.title + "")?.substring(0, 10) + "..."}
  //                               <span>
  //                                 <img src="/images/Done.svg" />
  //                               </span>
  //                             </h3>
  //                             <h4>
  //                               by
  //                               <strong>
  //                               {(collection?.contract?.address + "")?.length < 15 ? collection?.contract?.address : (collection?.contract?.address + "")?.substring(0, 15) + "..."}
  //                                 </strong>
  //                               <span>
  //                                 <img src="/images/Done.svg" />
  //                               </span>
  //                             </h4>
  //                             <p>
  //                             {(collection?.description + "")?.length < 18 ? collection?.description : (collection?.description + "")?.substring(0, 18) + "..."}</p>
  //                           </div>
  //                       </div>
  //                     </Grid>
  //                   );
  //                 })}
  //               </Grid>

                  
  //                 </div>
  //               </div>
  //             </TabPanel>
  //             <TabPanel value={value} index={1}>
  //               <div className="profile-panel-wrp">
  //                 <div className="row d-flex justify-content-between sm-block align-items-center">
  //                   <div className="main-heading">
  //                     <h2>Items</h2>
  //                   </div>
  //                 </div>
  //                 <div className={styles.profilpanelContainer}>
  //                   <div className="collectionListArea">
  //                     <ul>
  //                       {createdItemList.map((itemsCollections) => {
  //                         return (
  //                           <li className="collection-box-container">
  //                             <div className="collection-item-wrp">
  //                               <div className="item-img-wrp">
  //                                 <figure>
  //                                   <img src={itemsCollections.tokenData.imageUrl} style={{height:280}} />
  //                                 </figure>
  //                               </div>
  //                               <div className="colllection-caontent">
  //                                 <div className="collection-top-info d-flex justify-content-between align-items-center">
  //                                   <div className="media align-items-center">
  //                                     <div className="collection-user-circle">
  //                                       <img src={itemsCollections.collectionData?.bannerImage} />
  //                                     </div>
  //                                     <div className="media-body">
  //                                       <h5 className="d-flex align-items-center">
  //                                       {(itemsCollections.name + "")?.length < 10 ? itemsCollections.name : (itemsCollections.name + "")?.substring(0, 10) + "..."}
  //                                         <span>
  //                                           <img src="/images/Done.svg" />
  //                                         </span>
  //                                       </h5>
  //                                     </div>
  //                                   </div>
  //                                   <div className="brandIcon">
  //                                     <span>
  //                                       {itemsCollections?.networkData?.chainId=="0x13881"?<img  src={"/images/brandIcon.png"} />:<img style={{width:33,height:33}} src={"/images/token-icon.png"} />}
  //                                     </span>
  //                                   </div>
  //                                 </div>
  //                                 <div className="collection-btm">
  //                                   <h3> {itemsCollections.title}</h3>
  //                                   <h4>
  //                                     <span>Top Bid - </span> 15,350{" "}
  //                                     <strong>{(itemsCollections?.collectionData?.tokenSymbol + "")?.length < 10 ? itemsCollections?.collectionData?.tokenSymbol : (itemsCollections?.collectionData?.tokenSymbol + "")?.substring(0, 10) + "..."}</strong>
  //                                    </h4>
  //                                 </div>
  //                                 <div className="buy-row d-flex justify-content-between align-items-center">
  //                                   {
  //                                     itemsCollections?.creatorData?._id==user?._id?(
  //                                       <div className="left-col" onClick={()=>router.push(`/item/${itemsCollections._id}`)}>
  //                                         <a
  //                                           className="by-now-btn collection"
  //                                           // href="/nft-art"
  //                                         >
  //                                           Sell Now
  //                                         </a>
  //                                       </div>
  //                                       ):<div className="left-col" onClick={()=>router.push(`/nft-art`)}>
  //                                         <a
  //                                           className="by-now-btn collection"
  //                                           // href="/nft-art"
  //                                         >
  //                                           Buy Now
  //                                         </a>
  //                                       </div>
  //                                   }
  //                                   <div className="fav-col">
  //                                     <Checkbox
  //                                       {...label}
  //                                       defaultChecked={itemsCollections?.likedCount==1}
  //                                       icon={<FavoriteBorder />}
  //                                       onChange={(e)=>handleLikeUnlike(e,itemsCollections?._id)}
  //                                       checkedIcon={<Favorite />}
  //                                     />
  //                                     <span className="fav-count">
  //                                       {itemsCollections.favCout}
  //                                     </span>
  //                                   </div>
  //                                 </div>
  //                               </div>
  //                             </div>
  //                           </li>
  //                         );
  //                       })}
  //                     </ul>

  //                     {
  //                       createdItemList?.length>0 && createdItemList?.length>=20?(
  //                         !disableMore && <div onClick={()=>loadMore()} className={styles.morecollectionRow}>
  //                         <Button color="secondary">Explore more collection</Button>
  //                       </div>
  //                       ):null
  //                     }
  //                   </div>
  //                 </div>
  //               </div>
  //             </TabPanel>
  //             <TabPanel value={value} index={2}>
  //               <div className="profile-panel-wrp">
  //                 <div className="row d-flex justify-content-between sm-block align-items-center">
  //                   <div className="main-heading">
  //                     <h2>On Sale</h2>
  //                   </div>
  //                 </div>
  //                 <div className={styles.profilpanelContainer}>
  //                   <div className="collectionListArea">
  //                     <ul>
  //                       {itemsOnSale.map((itemsCollections) => {
  //                         return (
  //                           <li className="collection-box-container">
  //                             <div className="collection-item-wrp">
  //                               <div className="item-img-wrp">
  //                                 <figure>
  //                                   <img src={itemsCollections.tokenData.imageUrl} style={{height:280}} />
  //                                 </figure>
  //                               </div>
  //                               <div className="colllection-caontent">
  //                                 <div className="collection-top-info d-flex justify-content-between align-items-center">
  //                                   <div className="media align-items-center">
  //                                     <div className="collection-user-circle">
  //                                       <img src={itemsCollections.collectionData?.logo} />
  //                                     </div>
  //                                     <div className="media-body">
  //                                       <h5 className="d-flex align-items-center">
  //                                       {(itemsCollections.name + "")?.length < 10 ? itemsCollections.name : (itemsCollections.name + "")?.substring(0, 10) + "..."}
  //                                         <span>
  //                                           <img src="/images/Done.svg" />
  //                                         </span>
  //                                       </h5>
  //                                     </div>
  //                                   </div>
  //                                   <div className="brandIcon">
  //                                     <span>
  //                                       {itemsCollections?.networkData?.chainId=="0x13881"?<img  src={"/images/brandIcon.png"} />:<img style={{width:33,height:33}} src={"/images/token-icon.png"} />}
  //                                     </span>
  //                                   </div>
  //                                 </div>
  //                                 <div className="collection-btm">
  //                                   <h3>{(itemsCollections.title + "")?.length < 10 ? itemsCollections.title : (itemsCollections.title + "")?.substring(0, 10) + "..."}</h3>
  //                                   <h4>
  //                                     <span>Top Bid - </span> {itemsCollections?.price}{" "}
  //                                     <strong>{(itemsCollections?.collectionData?.tokenSymbol + "")?.length < 10 ? itemsCollections?.collectionData?.tokenSymbol : (itemsCollections?.collectionData?.tokenSymbol + "")?.substring(0, 10) + "..."}</strong>
  //                                   </h4>
  //                                 </div>
  //                                 <div className="buy-row d-flex justify-content-between align-items-center">
  //                                   {
  //                                     itemsCollections?.creatorData?._id==user?._id?(
  //                                       <div className="left-col" onClick={()=>router.push(`/item/${itemsCollections._id}`)}>
  //                                         <a
  //                                           className="by-now-btn collection"
  //                                           // href="/nft-art"
  //                                         >
  //                                           On sale
  //                                         </a>
  //                                       </div>
  //                                       ):<div className="left-col" onClick={()=>router.push(`/nft-art`)}>
  //                                         <a
  //                                           className="by-now-btn collection"
  //                                           // href="/nft-art"
  //                                         >
  //                                           Buy Now
  //                                         </a>
  //                                       </div>
  //                                   }
  //                                   <div className="fav-col">
  //                                     <Checkbox
  //                                       {...label}
  //                                       icon={<FavoriteBorder />}
  //                                       checkedIcon={<Favorite />}
  //                                       defaultChecked={itemsCollections?.likedCount==1}
  //                                       onChange={(e)=>handleLikeUnlike(e,itemsCollections?._id)}
  //                                     />
  //                                     <span className="fav-count">
  //                                       {itemsCollections.favCout}
  //                                     </span>
  //                                   </div>
  //                                 </div>
  //                               </div>
  //                             </div>
  //                           </li>
  //                         );
  //                       })}
  //                     </ul>
  //                     {
  //                       itemsOnSale?.length>0?(
  //                         !disableMore && <div onClick={()=>loadMore()} className={styles.morecollectionRow}>
  //                         <Button color="secondary">Explore more collection</Button>
  //                       </div>
  //                       ):null
  //                     }
  //                   </div>
  //                 </div>
  //               </div>
  //             </TabPanel>
  //             <TabPanel value={value} index={3}>
  //               <div className="profile-panel-wrp">
  //                 <div className="row d-flex justify-content-between sm-block align-items-center">
  //                   <div className="main-heading">
  //                     <h2>Favorited</h2>
  //                   </div>
  //                 </div>
  //                 <div className={styles.profilpanelContainer}>
  //                   <div className="collectionListArea">
  //                     <ul>
  //                       {collectedFavNfts?.map((itemsCollections) => {
  //                         return (
  //                            <li className="collection-box-container">
  //                             <div className="collection-item-wrp">
  //                               <div className="item-img-wrp">
  //                                 <figure>
  //                                   <img src={itemsCollections.tokenData.imageUrl} style={{height:280}} />
  //                                 </figure>
  //                               </div>
  //                               <div className="colllection-caontent">
  //                                 <div className="collection-top-info d-flex justify-content-between align-items-center">
  //                                   <div className="media align-items-center">
  //                                     <div className="collection-user-circle">
  //                                       <img src={itemsCollections.collectionData?.logo} />
  //                                     </div>
  //                                     <div className="media-body">
  //                                       <h5 className="d-flex align-items-center">
  //                                       {(itemsCollections?.itemDetails?.name + "")?.length < 10 ? itemsCollections?.itemDetails?.name : (itemsCollections?.itemDetails?.name + "")?.substring(0, 10) + "..."}
  //                                         <span>
  //                                           <img src="/images/Done.svg" />
  //                                         </span>
  //                                       </h5>
  //                                     </div>
  //                                   </div>
  //                                   <div className="brandIcon">
  //                                     <span>
  //                                       {itemsCollections?.networkData?.chainId=="0x13881"?<img  src={"/images/brandIcon.png"} />:<img style={{width:33,height:33}} src={"/images/token-icon.png"} />}
  //                                     </span>
  //                                   </div>
  //                                 </div>
  //                                 <div className="collection-btm">
  //                                   <h3>{(itemsCollections.title + "")?.length < 10 ? itemsCollections.title : (itemsCollections.title + "")?.substring(0, 10) + "..."}</h3>
  //                                   <h4>
  //                                     <span>Top Bid - </span> {itemsCollections?.price}{" "}
  //                                     <strong>{(itemsCollections?.collectionData?.tokenSymbol + "")?.length < 10 ? itemsCollections?.collectionData?.tokenSymbol : (itemsCollections?.collectionData?.tokenSymbol + "")?.substring(0, 10) + "..."}</strong>
  //                                   </h4>
  //                                 </div>
  //                                 <div className="buy-row d-flex justify-content-between align-items-center">
  //                                   {
  //                                     itemsCollections?.creatorData?._id==user?._id?(
  //                                       <div className="left-col" onClick={()=>router.push(`/item/${itemsCollections._id}`)}>
  //                                         <a
  //                                           className="by-now-btn collection"
  //                                           // href="/nft-art"
  //                                         >
  //                                           On sale
  //                                         </a>
  //                                       </div>
  //                                       ):<div className="left-col" onClick={()=>router.push(`/nft-art`)}>
  //                                         <a
  //                                           className="by-now-btn collection"
  //                                           // href="/nft-art"
  //                                         >
  //                                           Buy Now
  //                                         </a>
  //                                       </div>
  //                                   }
  //                                   <div className="fav-col">
  //                                     <Checkbox
  //                                       {...label}
  //                                       icon={<FavoriteBorder />}
  //                                       checkedIcon={<Favorite />}
  //                                       checked
  //                                       onChange={(e)=>handleLikeUnlike(e,itemsCollections?.itemDetails?._id)}
  //                                     />
  //                                     <span className="fav-count">
  //                                       {itemsCollections.favCout}
  //                                     </span>
  //                                   </div>
  //                                 </div>
  //                               </div>
  //                             </div>
  //                           </li>
  //                         );
  //                       })}
  //                     </ul>
  //                   </div>
  //                   {
  //                       collectedFavNfts?.length>0 && collectedFavNfts?.length>=20?(
  //                         !disableMore && <div onClick={()=>loadMore()} className={styles.morecollectionRow}>
  //                         <Button color="secondary">Explore more collection</Button>
  //                       </div>
  //                       ):null
  //                     }
  //                 </div>
  //               </div>
  //             </TabPanel>
  //             <TabPanel value={value} index={4}>
  //               <div className="profile-panel-wrp">
  //                 <div className="row d-flex justify-content-between sm-block align-items-center">
  //                   <div className="main-heading">
  //                     <h2>Activity</h2>
  //                   </div>
  //                 </div>
  //                 <div className={styles.profilpanelContainer}>
  //                   <div className={styles.activityGraphRow}>
  //                     <div className={styles.activityTOp}>
  //                       <div className="d-flex">
  //                         <div className={styles.activitybx}>
  //                           <span>90day Avg. Price</span>
  //                           <strong>15,35,450 ETH</strong>
  //                         </div>
  //                         <div className={styles.activitybx}>
  //                           <span>90day Avg. Price</span>
  //                           <strong>15,35,450 ETH</strong>
  //                         </div>
  //                       </div>
  //                     </div>
  //                     <div className={styles.activityGrapWrp}>
  //                       <figure>
  //                         <img src="/images/graph-img.png" />
  //                       </figure>
  //                     </div>
  //                   </div>
  //                   <div className={styles.profileTableData}>
  //                     <TableContainer>
  //                       <Table aria-label="simple table">
  //                         <TableHead>
  //                           <TableRow>
  //                             <TableCell>
  //                               <span className={styles.emptyCell}>
  //                                 Transfer
  //                               </span>
  //                             </TableCell>
  //                             <TableCell>Items</TableCell>
  //                             <TableCell>Price</TableCell>
  //                             <TableCell align="center">Quantity</TableCell>
  //                             <TableCell>From</TableCell>
  //                             <TableCell>To</TableCell>
  //                             <TableCell>Time</TableCell>
  //                           </TableRow>
  //                         </TableHead>
  //                         <TableBody>
  //                           <TableRow>
  //                             <TableCell>
  //                               <div className="d-flex align-items-center">
  //                                 <span className={styles.trnsfrIcon}>
  //                                   <img src="/images/transfer.png" />
  //                                 </span>
  //                                 <span> Transfer</span>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <div className={styles.itemRow}>
  //                                 <div className={styles.itemImg}>
  //                                   <figure>
  //                                     <img src="/images/itemtable.png" />
  //                                   </figure>
  //                                 </div>
  //                                 <div className={styles.iteContent}>
  //                                   <h5>Bored Ape Club Golden Statues</h5>
  //                                   <p>Bored Ape Statues #034</p>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <span className={styles.priceContent}>
  //                                 15,000 <strong>ETH</strong>
  //                               </span>
  //                             </TableCell>
  //                             <TableCell align="center">1</TableCell>
  //                             <TableCell>PunkApeArts</TableCell>
  //                             <TableCell>
  //                               <div className={styles.toContent}>
  //                                 <span>Bored Ape Ya...</span>
  //                                 <img src="/images/Done.svg" />
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <div className={styles.timebx}>
  //                                 <div className="d-flex align-items-center">
  //                                   <span> 5min ago</span>
  //                                   <a className={styles.link} href="">
  //                                     <img src="/images/link.png" />
  //                                   </a>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                           </TableRow>
  //                           <TableRow>
  //                             <TableCell>
  //                               <div className="d-flex align-items-center">
  //                                 <span className={styles.trnsfrIcon}>
  //                                   <img src="/images/transfer.png" />
  //                                 </span>
  //                                 <span> Transfer</span>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <div className={styles.itemRow}>
  //                                 <div className={styles.itemImg}>
  //                                   <figure>
  //                                     <img src="/images/itemtable.png" />
  //                                   </figure>
  //                                 </div>
  //                                 <div className={styles.iteContent}>
  //                                   <h5>Bored Ape Club Golden Statues</h5>
  //                                   <p>Bored Ape Statues #034</p>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <span className={styles.priceContent}>
  //                                 15,000 <strong>ETH</strong>
  //                               </span>
  //                             </TableCell>
  //                             <TableCell align="center">1</TableCell>
  //                             <TableCell>PunkApeArts</TableCell>
  //                             <TableCell>
  //                               <div className={styles.toContent}>
  //                                 <span>Bored Ape Ya...</span>
  //                                 <img src="/images/Done.svg" />
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <div className={styles.timebx}>
  //                                 <div className="d-flex align-items-center">
  //                                   <span> 5min ago</span>
  //                                   <a className={styles.link} href="">
  //                                     <img src="/images/link.png" />
  //                                   </a>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                           </TableRow>
  //                           <TableRow>
  //                             <TableCell>
  //                               <div className="d-flex align-items-center">
  //                                 <span className={styles.trnsfrIcon}>
  //                                   <img src="/images/transfer.png" />
  //                                 </span>
  //                                 <span> Transfer</span>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <div className={styles.itemRow}>
  //                                 <div className={styles.itemImg}>
  //                                   <figure>
  //                                     <img src="/images/itemtable.png" />
  //                                   </figure>
  //                                 </div>
  //                                 <div className={styles.iteContent}>
  //                                   <h5>Bored Ape Club Golden Statues</h5>
  //                                   <p>Bored Ape Statues #034</p>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <span className={styles.priceContent}>
  //                                 15,000 <strong>ETH</strong>
  //                               </span>
  //                             </TableCell>
  //                             <TableCell align="center">1</TableCell>
  //                             <TableCell>PunkApeArts</TableCell>
  //                             <TableCell>
  //                               <div className={styles.toContent}>
  //                                 <span>Bored Ape Ya...</span>
  //                                 <img src="/images/Done.svg" />
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <div className={styles.timebx}>
  //                                 <div className="d-flex align-items-center">
  //                                   <span> 5min ago</span>
  //                                   <a className={styles.link} href="">
  //                                     <img src="/images/link.png" />
  //                                   </a>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                           </TableRow>
  //                           <TableRow>
  //                             <TableCell>
  //                               <div className="d-flex align-items-center">
  //                                 <span className={styles.trnsfrIcon}>
  //                                   <img src="/images/transfer.png" />
  //                                 </span>
  //                                 <span> Transfer</span>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <div className={styles.itemRow}>
  //                                 <div className={styles.itemImg}>
  //                                   <figure>
  //                                     <img src="/images/itemtable.png" />
  //                                   </figure>
  //                                 </div>
  //                                 <div className={styles.iteContent}>
  //                                   <h5>Bored Ape Club Golden Statues</h5>
  //                                   <p>Bored Ape Statues #034</p>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <span className={styles.priceContent}>
  //                                 15,000 <strong>ETH</strong>
  //                               </span>
  //                             </TableCell>
  //                             <TableCell align="center">1</TableCell>
  //                             <TableCell>PunkApeArts</TableCell>
  //                             <TableCell>
  //                               <div className={styles.toContent}>
  //                                 <span>Bored Ape Ya...</span>
  //                                 <img src="/images/Done.svg" />
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <div className={styles.timebx}>
  //                                 <div className="d-flex align-items-center">
  //                                   <span> 5min ago</span>
  //                                   <a className={styles.link} href="">
  //                                     <img src="/images/link.png" />
  //                                   </a>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                           </TableRow>
  //                           <TableRow>
  //                             <TableCell>
  //                               <div className="d-flex align-items-center">
  //                                 <span className={styles.trnsfrIcon}>
  //                                   <img src="/images/transfer.png" />
  //                                 </span>
  //                                 <span> Transfer</span>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <div className={styles.itemRow}>
  //                                 <div className={styles.itemImg}>
  //                                   <figure>
  //                                     <img src="/images/itemtable.png" />
  //                                   </figure>
  //                                 </div>
  //                                 <div className={styles.iteContent}>
  //                                   <h5>Bored Ape Club Golden Statues</h5>
  //                                   <p>Bored Ape Statues #034</p>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <span className={styles.priceContent}>
  //                                 15,000 <strong>ETH</strong>
  //                               </span>
  //                             </TableCell>
  //                             <TableCell align="center">1</TableCell>
  //                             <TableCell>PunkApeArts</TableCell>
  //                             <TableCell>
  //                               <div className={styles.toContent}>
  //                                 <span>Bored Ape Ya...</span>
  //                                 <img src="/images/Done.svg" />
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <div className={styles.timebx}>
  //                                 <div className="d-flex align-items-center">
  //                                   <span> 5min ago</span>
  //                                   <a className={styles.link} href="">
  //                                     <img src="/images/link.png" />
  //                                   </a>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                           </TableRow>
  //                           <TableRow>
  //                             <TableCell>
  //                               <div className="d-flex align-items-center">
  //                                 <span className={styles.trnsfrIcon}>
  //                                   <img src="/images/transfer.png" />
  //                                 </span>
  //                                 <span> Transfer</span>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <div className={styles.itemRow}>
  //                                 <div className={styles.itemImg}>
  //                                   <figure>
  //                                     <img src="/images/itemtable.png" />
  //                                   </figure>
  //                                 </div>
  //                                 <div className={styles.iteContent}>
  //                                   <h5>Bored Ape Club Golden Statues</h5>
  //                                   <p>Bored Ape Statues #034</p>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <span className={styles.priceContent}>
  //                                 15,000 <strong>ETH</strong>
  //                               </span>
  //                             </TableCell>
  //                             <TableCell align="center">1</TableCell>
  //                             <TableCell>PunkApeArts</TableCell>
  //                             <TableCell>
  //                               <div className={styles.toContent}>
  //                                 <span>Bored Ape Ya...</span>
  //                                 <img src="/images/Done.svg" />
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <div className={styles.timebx}>
  //                                 <div className="d-flex align-items-center">
  //                                   <span> 5min ago</span>
  //                                   <a className={styles.link} href="">
  //                                     <img src="/images/link.png" />
  //                                   </a>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                           </TableRow>
  //                           <TableRow>
  //                             <TableCell>
  //                               <div className="d-flex align-items-center">
  //                                 <span className={styles.trnsfrIcon}>
  //                                   <img src="/images/transfer.png" />
  //                                 </span>
  //                                 <span> Transfer</span>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <div className={styles.itemRow}>
  //                                 <div className={styles.itemImg}>
  //                                   <figure>
  //                                     <img src="/images/itemtable.png" />
  //                                   </figure>
  //                                 </div>
  //                                 <div className={styles.iteContent}>
  //                                   <h5>Bored Ape Club Golden Statues</h5>
  //                                   <p>Bored Ape Statues #034</p>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <span className={styles.priceContent}>
  //                                 15,000 <strong>ETH</strong>
  //                               </span>
  //                             </TableCell>
  //                             <TableCell align="center">1</TableCell>
  //                             <TableCell>PunkApeArts</TableCell>
  //                             <TableCell>
  //                               <div className={styles.toContent}>
  //                                 <span>Bored Ape Ya...</span>
  //                                 <img src="/images/Done.svg" />
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <div className={styles.timebx}>
  //                                 <div className="d-flex align-items-center">
  //                                   <span> 5min ago</span>
  //                                   <a className={styles.link} href="">
  //                                     <img src="/images/link.png" />
  //                                   </a>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                           </TableRow>
  //                           <TableRow>
  //                             <TableCell>
  //                               <div className="d-flex align-items-center">
  //                                 <span className={styles.trnsfrIcon}>
  //                                   <img src="/images/transfer.png" />
  //                                 </span>
  //                                 <span> Transfer</span>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <div className={styles.itemRow}>
  //                                 <div className={styles.itemImg}>
  //                                   <figure>
  //                                     <img src="/images/itemtable.png" />
  //                                   </figure>
  //                                 </div>
  //                                 <div className={styles.iteContent}>
  //                                   <h5>Bored Ape Club Golden Statues</h5>
  //                                   <p>Bored Ape Statues #034</p>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <span className={styles.priceContent}>
  //                                 15,000 <strong>ETH</strong>
  //                               </span>
  //                             </TableCell>
  //                             <TableCell align="center">1</TableCell>
  //                             <TableCell>PunkApeArts</TableCell>
  //                             <TableCell>
  //                               <div className={styles.toContent}>
  //                                 <span>Bored Ape Ya...</span>
  //                                 <img src="/images/Done.svg" />
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <div className={styles.timebx}>
  //                                 <div className="d-flex align-items-center">
  //                                   <span> 5min ago</span>
  //                                   <a className={styles.link} href="">
  //                                     <img src="/images/link.png" />
  //                                   </a>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                           </TableRow>
  //                         </TableBody>
  //                       </Table>
  //                     </TableContainer>
  //                   </div>
  //                 </div>
  //               </div>
  //             </TabPanel>
  //             <TabPanel value={value} index={5}>
  //               <div className="profile-panel-wrp">
  //                 <div className="row d-flex justify-content-between sm-block align-items-center">
  //                   <div className="main-heading">
  //                     <h2>Offers Received</h2>
  //                   </div>
  //                 </div>
  //                 <div className={styles.profilpanelContainer}>
  //                   <div className={styles.profileTableData}>
  //                     <TableContainer>
  //                       <Table aria-label="simple table">
  //                         <TableHead>
  //                           <TableRow>
  //                             <TableCell>Items</TableCell>
  //                             <TableCell>Unit Price</TableCell>
  //                             <TableCell>USD Unit Price</TableCell>
  //                             <TableCell>Floor Difference</TableCell>
  //                             <TableCell>From</TableCell>
  //                             <TableCell>Expiration</TableCell>
  //                             <TableCell>Received</TableCell>
  //                             <TableCell>
  //                               <span className={styles.emptyCell}>-</span>
  //                             </TableCell>
  //                           </TableRow>
  //                         </TableHead>
  //                         <TableBody>
  //                           <TableRow>
  //                             <TableCell>
  //                               <div className={styles.itemRow}>
  //                                 <div className={styles.itemImg}>
  //                                   <figure>
  //                                     <img src="/images/itemtable.png" />
  //                                   </figure>
  //                                 </div>
  //                                 <div className={styles.iteContent}>
  //                                   <h5>Bored Ape Club Golden Statues</h5>
  //                                   <p>Bored Ape Statues #034</p>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <span className={styles.priceContent}>
  //                                 15,000 <strong>ETH</strong>
  //                               </span>
  //                             </TableCell>
  //                             <TableCell>$818.10</TableCell>
  //                             <TableCell>99.7% below</TableCell>
  //                             <TableCell>
  //                               <span className={styles.blueText}>
  //                                 NFT-Art-Device
  //                               </span>
  //                             </TableCell>
  //                             <TableCell>In 21 hours</TableCell>
  //                             <TableCell>3 h ago</TableCell>
  //                             <TableCell>-</TableCell>
  //                           </TableRow>
  //                           <TableRow>
  //                             <TableCell>
  //                               <div className={styles.itemRow}>
  //                                 <div className={styles.itemImg}>
  //                                   <figure>
  //                                     <img src="/images/itemtable.png" />
  //                                   </figure>
  //                                 </div>
  //                                 <div className={styles.iteContent}>
  //                                   <h5>Bored Ape Club Golden Statues</h5>
  //                                   <p>Bored Ape Statues #034</p>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <span className={styles.priceContent}>
  //                                 15,000 <strong>ETH</strong>
  //                               </span>
  //                             </TableCell>
  //                             <TableCell>$818.10</TableCell>
  //                             <TableCell>99.7% below</TableCell>
  //                             <TableCell>
  //                               <span className={styles.blueText}>
  //                                 NFT-Art-Device
  //                               </span>
  //                             </TableCell>
  //                             <TableCell>In 21 hours</TableCell>
  //                             <TableCell>3 h ago</TableCell>
  //                             <TableCell>-</TableCell>
  //                           </TableRow>
  //                           <TableRow>
  //                             <TableCell>
  //                               <div className={styles.itemRow}>
  //                                 <div className={styles.itemImg}>
  //                                   <figure>
  //                                     <img src="/images/itemtable.png" />
  //                                   </figure>
  //                                 </div>
  //                                 <div className={styles.iteContent}>
  //                                   <h5>Bored Ape Club Golden Statues</h5>
  //                                   <p>Bored Ape Statues #034</p>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <span className={styles.priceContent}>
  //                                 15,000 <strong>ETH</strong>
  //                               </span>
  //                             </TableCell>
  //                             <TableCell>$818.10</TableCell>
  //                             <TableCell>99.7% below</TableCell>
  //                             <TableCell>
  //                               <span className={styles.blueText}>
  //                                 NFT-Art-Device
  //                               </span>
  //                             </TableCell>
  //                             <TableCell>In 21 hours</TableCell>
  //                             <TableCell>3 h ago</TableCell>
  //                             <TableCell>-</TableCell>
  //                           </TableRow>
  //                           <TableRow>
  //                             <TableCell>
  //                               <div className={styles.itemRow}>
  //                                 <div className={styles.itemImg}>
  //                                   <figure>
  //                                     <img src="/images/itemtable.png" />
  //                                   </figure>
  //                                 </div>
  //                                 <div className={styles.iteContent}>
  //                                   <h5>Bored Ape Club Golden Statues</h5>
  //                                   <p>Bored Ape Statues #034</p>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <span className={styles.priceContent}>
  //                                 15,000 <strong>ETH</strong>
  //                               </span>
  //                             </TableCell>
  //                             <TableCell>$818.10</TableCell>
  //                             <TableCell>99.7% below</TableCell>
  //                             <TableCell>
  //                               <span className={styles.blueText}>
  //                                 NFT-Art-Device
  //                               </span>
  //                             </TableCell>
  //                             <TableCell>In 21 hours</TableCell>
  //                             <TableCell>3 h ago</TableCell>
  //                             <TableCell>-</TableCell>
  //                           </TableRow>
  //                           <TableRow>
  //                             <TableCell>
  //                               <div className={styles.itemRow}>
  //                                 <div className={styles.itemImg}>
  //                                   <figure>
  //                                     <img src="/images/itemtable.png" />
  //                                   </figure>
  //                                 </div>
  //                                 <div className={styles.iteContent}>
  //                                   <h5>Bored Ape Club Golden Statues</h5>
  //                                   <p>Bored Ape Statues #034</p>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <span className={styles.priceContent}>
  //                                 15,000 <strong>ETH</strong>
  //                               </span>
  //                             </TableCell>
  //                             <TableCell>$818.10</TableCell>
  //                             <TableCell>99.7% below</TableCell>
  //                             <TableCell>
  //                               <span className={styles.blueText}>
  //                                 NFT-Art-Device
  //                               </span>
  //                             </TableCell>
  //                             <TableCell>In 21 hours</TableCell>
  //                             <TableCell>3 h ago</TableCell>
  //                             <TableCell>-</TableCell>
  //                           </TableRow>
  //                           <TableRow>
  //                             <TableCell>
  //                               <div className={styles.itemRow}>
  //                                 <div className={styles.itemImg}>
  //                                   <figure>
  //                                     <img src="/images/itemtable.png" />
  //                                   </figure>
  //                                 </div>
  //                                 <div className={styles.iteContent}>
  //                                   <h5>Bored Ape Club Golden Statues</h5>
  //                                   <p>Bored Ape Statues #034</p>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <span className={styles.priceContent}>
  //                                 15,000 <strong>ETH</strong>
  //                               </span>
  //                             </TableCell>
  //                             <TableCell>$818.10</TableCell>
  //                             <TableCell>99.7% below</TableCell>
  //                             <TableCell>
  //                               <span className={styles.blueText}>
  //                                 NFT-Art-Device
  //                               </span>
  //                             </TableCell>
  //                             <TableCell>In 21 hours</TableCell>
  //                             <TableCell>3 h ago</TableCell>
  //                             <TableCell>-</TableCell>
  //                           </TableRow>
  //                           <TableRow>
  //                             <TableCell>
  //                               <div className={styles.itemRow}>
  //                                 <div className={styles.itemImg}>
  //                                   <figure>
  //                                     <img src="/images/itemtable.png" />
  //                                   </figure>
  //                                 </div>
  //                                 <div className={styles.iteContent}>
  //                                   <h5>Bored Ape Club Golden Statues</h5>
  //                                   <p>Bored Ape Statues #034</p>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <span className={styles.priceContent}>
  //                                 15,000 <strong>ETH</strong>
  //                               </span>
  //                             </TableCell>
  //                             <TableCell>$818.10</TableCell>
  //                             <TableCell>99.7% below</TableCell>
  //                             <TableCell>
  //                               <span className={styles.blueText}>
  //                                 NFT-Art-Device
  //                               </span>
  //                             </TableCell>
  //                             <TableCell>In 21 hours</TableCell>
  //                             <TableCell>3 h ago</TableCell>
  //                             <TableCell>-</TableCell>
  //                           </TableRow>
  //                           <TableRow>
  //                             <TableCell>
  //                               <div className={styles.itemRow}>
  //                                 <div className={styles.itemImg}>
  //                                   <figure>
  //                                     <img src="/images/itemtable.png" />
  //                                   </figure>
  //                                 </div>
  //                                 <div className={styles.iteContent}>
  //                                   <h5>Bored Ape Club Golden Statues</h5>
  //                                   <p>Bored Ape Statues #034</p>
  //                                 </div>
  //                               </div>
  //                             </TableCell>
  //                             <TableCell>
  //                               <span className={styles.priceContent}>
  //                                 15,000 <strong>ETH</strong>
  //                               </span>
  //                             </TableCell>
  //                             <TableCell>$818.10</TableCell>
  //                             <TableCell>99.7% below</TableCell>
  //                             <TableCell>
  //                               <span className={styles.blueText}>
  //                                 NFT-Art-Device
  //                               </span>
  //                             </TableCell>
  //                             <TableCell>In 21 hours</TableCell>
  //                             <TableCell>3 h ago</TableCell>
  //                             <TableCell>-</TableCell>
  //                           </TableRow>
  //                         </TableBody>
  //                       </Table>
  //                     </TableContainer>
  //                   </div>
  //                 </div>
  //               </div>
  //             </TabPanel>
  //             <TabPanel value={value} index={6}>
  //                       <ProfileSettings/>
  //             </TabPanel>
  //           </div>
  //         </div>
  //   )

 // const OtherProfile = ()=>(
 //       <div className={styles.profiletabContainer}>
 //            <div className="profiletabsContainer">
 //              <div className="customContainer">
 //                <Tabs
 //                  value={value}
 //                  onChange={handleChangeTab}
 //                  variant="scrollable"
 //                  scrollButtons
 //                  allowScrollButtonsMobile
 //                  aria-label="scrollable force tabs example"
 //                >
 //                  <Tab
 //                    className="tabBtn"
 //                    label="Collected"
 //                    {...a11yProps(0)}
 //                    icon={
 //                      <Avatar
 //                        classsName="tab-icon"
 //                        src="/images/Collected.svg"
 //                      />
 //                    }
 //                  />
 //                  <Tab
 //                    className="tabBtn"
 //                    label="Created"
 //                    {...a11yProps(1)}
 //                    icon={
 //                      <Avatar classsName="tab-icon" src="/images/Created.svg" />
 //                    }
 //                  />
 //                  <Tab
 //                    className="tabBtn"
 //                    label="On Sale"
 //                    {...a11yProps(2)}
 //                    icon={
 //                      <Avatar classsName="tab-icon" src="/images/Created.svg" />
 //                    }
 //                  />
 //                  <Tab
 //                    className="tabBtn"
 //                    label="Favorited"
 //                    {...a11yProps(3)}
 //                    icon={
 //                      <Avatar
 //                        classsName="tab-icon"
 //                        src="/images/Favorited.svg"
 //                      />
 //                    }
 //                  />
 //                  <Tab
 //                    className="tabBtn"
 //                    label="Activity"
 //                    {...a11yProps(4)}
 //                    icon={
 //                      <Avatar
 //                        classsName="tab-icon"
 //                        src="/images/Activity.svg"
 //                      />
 //                    }
 //                  />
 //                </Tabs>
 //              </div>
 //            </div>

 //            <div className="containerFluid ProfileTabPanel">
 //              <div className="row d-flex justify-content-between sm-block align-items-center profileFilterPosition">
 //                <div className={styles.rightCol}>
 //                  <div className="d-flex align-items-center sm-space-between sm-t-20 profile">
 //                    <div className="latestFilter">
 //                      <div className="custom-select">
 //                        <select>
 //                          <option value="Latest First">Latest First</option>
 //                          <option value="Latest First">Latest First</option>
 //                          <option value="Latest First">Latest First</option>
 //                        </select>
 //                      </div>
 //                    </div>
 //                    <div className={styles.searchFormBox}>
 //                      <div className={styles.searchHeaderForm}>
 //                        <form>
 //                          <div className={styles.searchRow}>
 //                            <span className={styles.searchIcon}>
 //                              {" "}
 //                              <img src="/images/searchicon.png" />
 //                            </span>
 //                            <div className={styles.textFieldRadius}>
 //                              <TextField
 //                                fullWidth
 //                                id="standard-bare"
 //                                variant="outlined"
 //                                placeholder="Search"
 //                                autoComplete='off'
 //                                // onChange={handleSearch}
 //                              />
 //                            </div>
 //                          </div>
 //                        </form>
 //                      </div>
 //                    </div>
 //                    <div className="filtersBox">
 //                      <Button
 //                        id="fade-button"
 //                        aria-controls={open ? "fade-menu" : undefined}
 //                        aria-haspopup="true"
 //                        aria-expanded={open ? "true" : undefined}
 //                        onClick={handleClick}
 //                      >
 //                        <span className="filterIcon">
 //                          <img src="/images/filter.png" />
 //                        </span>
 //                        <span className="filterHeading">Filter.</span>
 //                      </Button>
 //                      <Menu
 //                        className="filterDropWrp"
 //                        id="fade-menu"
 //                        MenuListProps={{
 //                          "aria-labelledby": "fade-button",
 //                        }}
 //                        // anchorOrigin={{
 //                        //   vertical: "top",
 //                        //   horizontal: "top",
 //                        // }}
 //                        // transformOrigin={{
 //                        //   vertical: "top",
 //                        //   horizontal: "center",
 //                        // }}
 //                        anchorEl={anchorEl}
 //                        open={open}
 //                        onClose={handleClose}
 //                        TransitionComponent={Fade}
 //                      >
 //                        <Accordion
 //                          expanded={expanded === "panel1"}
 //                          onChange={handleChange("panel1")}
 //                          className="filter-accordion"
 //                        >
 //                          <AccordionSummary
 //                            expandIcon={<ExpandMoreIcon />}
 //                            aria-controls="panel1a-content"
 //                            id="panel1a-header"
 //                          >
 //                            <Typography>Status</Typography>
 //                          </AccordionSummary>
 //                          <AccordionDetails>
 //                            <div className="filter-options-wrp">
 //                              <div className="filter-row d-flex space center mb-10">
 //                                <div className="filter-select-box col-6">
 //                                  <FormControl>
 //                                    <OutlinedInput placeholder="Buy now" />
 //                                  </FormControl>
 //                                </div>
 //                                <div className="filter-select-box col-6">
 //                                  <FormControl>
 //                                    <OutlinedInput placeholder="On Auction" />
 //                                  </FormControl>
 //                                </div>
 //                              </div>
 //                              <div className="filter-row d-flex space center">
 //                                <div className="filter-select-box col-6">
 //                                  <FormControl>
 //                                    <OutlinedInput placeholder="New" />
 //                                  </FormControl>
 //                                </div>
 //                                <div className="filter-select-box col-6">
 //                                  <FormControl>
 //                                    <OutlinedInput placeholder="Has Offers" />
 //                                  </FormControl>
 //                                </div>
 //                              </div>
 //                            </div>
 //                          </AccordionDetails>
 //                        </Accordion>

 //                        <Accordion
 //                          expanded={expanded === "panel2"}
 //                          onChange={handleChange("panel2")}
 //                          className="filter-accordion"
 //                        >
 //                          <AccordionSummary
 //                            expandIcon={<ExpandMoreIcon />}
 //                            aria-controls="panel2a-content"
 //                            id="panel2a-header"
 //                          >
 //                            <Typography>Price</Typography>
 //                          </AccordionSummary>
 //                          <AccordionDetails>
 //                            <div className="filter-options-wrp">
 //                              <div className="filter-row d-flex mb-10">
 //                                <div className="filter-select-box col-12">
 //                                  <FormControl>
 //                                    <OutlinedInput placeholder="$ USD" />
 //                                  </FormControl>
 //                                </div>
 //                              </div>
 //                              <div className="filter-row d-flex ">
 //                                <div className="filter-select-box col-6">
 //                                  <FormControl>
 //                                    <OutlinedInput placeholder="$ Min" />
 //                                  </FormControl>
 //                                </div>
 //                                <span className="to">to</span>
 //                                <div className="filter-select-box col-6">
 //                                  <FormControl>
 //                                    <OutlinedInput placeholder="$ Max" />
 //                                  </FormControl>
 //                                </div>
 //                              </div>
 //                              <div className="applybtn">
 //                                <Button>Apply</Button>
 //                              </div>
 //                            </div>
 //                          </AccordionDetails>
 //                        </Accordion>

 //                        <Accordion
 //                          expanded={expanded === "panel3"}
 //                          onChange={handleChange("panel3")}
 //                          className="filter-accordion"
 //                        >
 //                          <AccordionSummary
 //                            expandIcon={<ExpandMoreIcon />}
 //                            aria-controls="panel1a-content"
 //                            id="panel1a-header"
 //                          >
 //                            <Typography>Chains</Typography>
 //                          </AccordionSummary>
 //                          <AccordionDetails>
 //                            <div className="filter-options-wrp">
 //                              <div className="filter-row d-flex center">
 //                                <div className="filter-select-box col-4">
 //                                  <FormControl>
 //                                    <OutlinedInput placeholder="Ethereum" />
 //                                  </FormControl>
 //                                </div>
 //                                <div className="filter-select-box col-4">
 //                                  <FormControl>
 //                                    <OutlinedInput placeholder="Polygon" />
 //                                  </FormControl>
 //                                </div>

 //                                <div className="filter-select-box col-4">
 //                                  <FormControl>
 //                                    <OutlinedInput placeholder="Klaytn" />
 //                                  </FormControl>
 //                                </div>
 //                              </div>
 //                            </div>
 //                          </AccordionDetails>
 //                        </Accordion>

 //                        <Accordion
 //                          expanded={expanded === "panel4"}
 //                          onChange={handleChange("panel4")}
 //                          className="filter-accordion"
 //                        >
 //                          <AccordionSummary
 //                            expandIcon={<ExpandMoreIcon />}
 //                            aria-controls="panel1a-content"
 //                            id="panel1a-header"
 //                          >
 //                            <Typography>On Sale In</Typography>
 //                          </AccordionSummary>
 //                          <AccordionDetails>
 //                            <div className="filter-options-wrp">
 //                              <div className="filter-row d-flex">
 //                                <div className="filter-select-box col-6">
 //                                  <div className="input-checkbox">
 //                                    <Checkbox
 //                                      label="My checkbox"
 //                                      labelStyle={{ color: "#F9F6FD;" }}
 //                                      iconStyle={{ fill: "#F9F6FD;" }}
 //                                      inputStyle={{ color: "#F9F6FD;" }}
 //                                      style={{ color: "#F9F6FD;" }}
 //                                    />
 //                                    <span className="check-title">ETH</span>
 //                                  </div>
 //                                </div>
 //                                <div className="filter-select-box col-6">
 //                                  <div className="input-checkbox">
 //                                    <Checkbox
 //                                      label="My checkbox"
 //                                      labelStyle={{ color: "#F9F6FD;" }}
 //                                      iconStyle={{ fill: "#F9F6FD;" }}
 //                                      inputStyle={{ color: "#F9F6FD;" }}
 //                                      style={{ color: "#F9F6FD;" }}
 //                                    />
 //                                    <span className="check-title">WETH</span>
 //                                  </div>
 //                                </div>
 //                              </div>
 //                            </div>
 //                          </AccordionDetails>
 //                        </Accordion>
 //                      </Menu>
 //                    </div>
 //                  </div>
 //                </div>
 //              </div>
 //              <TabPanel value={value} index={0}>
 //                <div className="row d-flex justify-content-between sm-block align-items-center">
 //                  <div className="main-heading">
 //                    <h2>Collected Nfts</h2>
 //                  </div>
 //                </div>

 //                <div className={styles.profilpanelContainer}>
 //                  <div className={styles.collectionArea}>
                      
 //                  <Grid container spacing={2}>
 //                  {collectedNfts?.map((collection, i) => {
 //                    return (
 //                      <Grid item style={{width:'100%'}} md={3} sm={6} lg={3}  key={collection._id}>
 //                          <div className={styles.collectionItemWrp}>
 //                          <div className={styles.imgWrp}>
 //                              <figure className={styles.mainImg}>
 //                                <img width={300} height={200} style={{height:280}}  src={collection?.metadata?.image} />
 //                              </figure>
 //                              <figure className={styles.btmImg}>
 //                                <img  height={100} width={100} src={collection?.authImg} />
 //                              </figure>
 //                            </div>
 //                            <div className={styles.collectionDetail}>
 //                              <h3>
 //                              {(collection?.title + "")?.length < 10 ? collection?.title : (collection?.title + "")?.substring(0, 10) + "..."}
 //                                <span>
 //                                  <img src="/images/Done.svg" />
 //                                </span>
 //                              </h3>
 //                              <h4>
 //                                by
 //                                <strong>
 //                                {(collection?.contract?.address + "")?.length < 15 ? collection?.contract?.address : (collection?.contract?.address + "")?.substring(0, 15) + "..."}
 //                                  </strong>
 //                                <span>
 //                                  <img src="/images/Done.svg" />
 //                                </span>
 //                              </h4>
 //                              <p>
 //                              {(collection?.description + "")?.length < 18 ? collection?.description : (collection?.description + "")?.substring(0, 18) + "..."}</p>
 //                            </div>
 //                        </div>
 //                      </Grid>
 //                    );
 //                  })}
 //                </Grid>

                  
 //                  </div>
 //                </div>
 //              </TabPanel>
 //              <TabPanel value={value} index={1}>
 //                <div className="profile-panel-wrp">
 //                  <div className="row d-flex justify-content-between sm-block align-items-center">
 //                    <div className="main-heading">
 //                      <h2>Items</h2>
 //                    </div>
 //                  </div>
 //                  <div className={styles.profilpanelContainer}>
 //                    <div className="collectionListArea">
 //                      <ul>
 //                        {createdItemList.map((itemsCollections) => {
 //                          return (
 //                            <li className="collection-box-container">
 //                              <div className="collection-item-wrp">
 //                                <div className="item-img-wrp">
 //                                  <figure>
 //                                    <img src={itemsCollections.tokenData.imageUrl} style={{height:280}} />
 //                                  </figure>
 //                                </div>
 //                                <div className="colllection-caontent">
 //                                  <div className="collection-top-info d-flex justify-content-between align-items-center">
 //                                    <div className="media align-items-center">
 //                                      <div className="collection-user-circle">
 //                                        <img src={itemsCollections.collectionData?.bannerImage} />
 //                                      </div>
 //                                      <div className="media-body">
 //                                        <h5 className="d-flex align-items-center">
 //                                        {(itemsCollections.name + "")?.length < 10 ? itemsCollections.name : (itemsCollections.name + "")?.substring(0, 10) + "..."}
 //                                          <span>
 //                                            <img src="/images/Done.svg" />
 //                                          </span>
 //                                        </h5>
 //                                      </div>
 //                                    </div>
 //                                    <div className="brandIcon">
 //                                     <span>
 //                                        {itemsCollections?.networkData?.chainId=="0x13881"?<img  src={"/images/brandIcon.png"} />:<img style={{width:33,height:33}} src={"/images/token-icon.png"} />}
 //                                      </span>
 //                                    </div>
 //                                  </div>
 //                                  <div className="collection-btm">
 //                                    <h3> {itemsCollections.title}</h3>
 //                                    <h4>
 //                                      <span>Top Bid - </span> 15,350{" "}
 //                                      <strong>{(itemsCollections?.collectionData?.tokenSymbol + "")?.length < 10 ? itemsCollections?.collectionData?.tokenSymbol : (itemsCollections?.collectionData?.tokenSymbol + "")?.substring(0, 10) + "..."}</strong>
 //                                     </h4>
 //                                  </div>
 //                                  <div className="buy-row d-flex justify-content-between align-items-center">
 //                                   {
 //                                      itemsCollections?.creatorData?._id==user?._id?(
 //                                        <div className="left-col" onClick={()=>router.push(`/item/${itemsCollections._id}`)}>
 //                                          <a
 //                                            className="by-now-btn collection"
 //                                            // href="/nft-art"
 //                                          >
 //                                            Sell Now
 //                                          </a>
 //                                        </div>
 //                                        ):<div className="left-col" onClick={()=>router.push(`/nft-art`)}>
 //                                          <a
 //                                            className="by-now-btn collection"
 //                                            // href="/nft-art"
 //                                          >
 //                                            Buy Now
 //                                          </a>
 //                                        </div>
 //                                    }
 //                                    <div className="fav-col">
 //                                      <Checkbox
 //                                        {...label}
 //                                        icon={<FavoriteBorder />}
 //                                        defaultChecked={itemsCollections?.likedCount?itemsCollections?.likedCount>0:false}
 //                                        checkedIcon={<Favorite />}
 //                                        onChange={(e)=>handleLikeUnlike(e,itemsCollections?._id)}
 //                                      />
 //                                      <span className="fav-count">
 //                                        {itemsCollections.favCout}
 //                                      </span>
 //                                    </div>
 //                                  </div>
 //                                </div>
 //                              </div>
 //                            </li>
 //                          );
 //                        })}
 //                      </ul>

 //                      {
 //                        createdItemList?.length>0?(
 //                          !disableMore && <div onClick={()=>loadMore()} className={styles.morecollectionRow}>
 //                          <Button color="secondary">Explore more collection</Button>
 //                        </div>
 //                        ):null
 //                      }
 //                    </div>
 //                  </div>
 //                </div>
 //              </TabPanel>
 //              <TabPanel value={value} index={2}>
 //                <div className="profile-panel-wrp">
 //                  <div className="row d-flex justify-content-between sm-block align-items-center">
 //                    <div className="main-heading">
 //                      <h2>On Sale</h2>
 //                    </div>
 //                  </div>
 //                  <div className={styles.profilpanelContainer}>
 //                    <div className="collectionListArea">
 //                      <ul>
 //                        {itemsOnSale.map((itemsCollections) => {
 //                          return (
 //                            <li className="collection-box-container">
 //                              <div className="collection-item-wrp">
 //                                <div className="item-img-wrp">
 //                                  <figure>
 //                                    <img src={itemsCollections.tokenData.imageUrl} style={{height:280}} />
 //                                  </figure>
 //                                </div>
 //                                <div className="colllection-caontent">
 //                                  <div className="collection-top-info d-flex justify-content-between align-items-center">
 //                                    <div className="media align-items-center">
 //                                      <div className="collection-user-circle">
 //                                        <img src={itemsCollections.collectionData?.logo} />
 //                                      </div>
 //                                      <div className="media-body">
 //                                        <h5 className="d-flex align-items-center">
 //                                        {(itemsCollections.name + "")?.length < 10 ? itemsCollections.name : (itemsCollections.name + "")?.substring(0, 10) + "..."}
 //                                          <span>
 //                                            <img src="/images/Done.svg" />
 //                                          </span>
 //                                        </h5>
 //                                      </div>
 //                                    </div>
 //                                    <div className="brandIcon">
 //                                      <span>
 //                                        <img
 //                                          src={'/images/brandIcon.png'}
 //                                        />
 //                                      </span>
 //                                    </div>
 //                                  </div>
 //                                  <div className="collection-btm">
 //                                    <h3>{(itemsCollections.title + "")?.length < 10 ? itemsCollections.title : (itemsCollections.title + "")?.substring(0, 10) + "..."}</h3>
 //                                    <h4>
 //                                      <span>Top Bid - </span> {itemsCollections?.price}{" "}
 //                                      <strong>{(itemsCollections?.collectionData?.tokenSymbol + "")?.length < 10 ? itemsCollections?.collectionData?.tokenSymbol : (itemsCollections?.collectionData?.tokenSymbol + "")?.substring(0, 10) + "..."}</strong>
 //                                    </h4>
 //                                  </div>
 //                                  <div className="buy-row d-flex justify-content-between align-items-center">
 //                                    {
 //                                      itemsCollections?.creatorData?._id==user?._id?(
 //                                        <div className="left-col" onClick={()=>router.push(`/item/${itemsCollections._id}`)}>
 //                                          <a
 //                                            className="by-now-btn collection"
 //                                            // href="/nft-art"
 //                                          >
 //                                            On sale
 //                                          </a>
 //                                        </div>
 //                                        ):<div className="left-col" onClick={()=>router.push(`/nft-art`)}>
 //                                          <a
 //                                            className="by-now-btn collection"
 //                                            // href="/nft-art"
 //                                          >
 //                                            Buy Now
 //                                          </a>
 //                                        </div>
 //                                    }
 //                                    <div className="fav-col">
 //                                      <Checkbox
 //                                        {...label}
 //                                        icon={<FavoriteBorder />}
 //                                        onChange={(e)=>handleLikeUnlike(e,itemsCollections?._id)}
 //                                        checkedIcon={<Favorite />}
 //                                         defaultChecked={itemsCollections?.likedCount?itemsCollections?.likedCount>0:false}
 //                                      />
 //                                      <span className="fav-count">
 //                                        {itemsCollections.favCout}
 //                                      </span>
 //                                    </div>
 //                                  </div>
 //                                </div>
 //                              </div>
 //                            </li>
 //                          );
 //                        })}
 //                      </ul>
 //                      {
 //                        itemsOnSale?.length>0?(
 //                          !disableMore && <div onClick={()=>loadMore()} className={styles.morecollectionRow}>
 //                          <Button color="secondary">Explore more collection</Button>
 //                        </div>
 //                        ):null
 //                      }
 //                    </div>
 //                  </div>
 //                </div>
 //              </TabPanel>
 //              <TabPanel value={value} index={3}>
 //                <div className="profile-panel-wrp">
 //                  <div className="row d-flex justify-content-between sm-block align-items-center">
 //                    <div className="main-heading">
 //                      <h2>Favorited</h2>
 //                    </div>
 //                  </div>
 //                  <div className={styles.profilpanelContainer}>
 //                    <div className="collectionListArea">
 //                      <ul>
 //                        {collectedNfts?.map((itemsCollections) => {
 //                          return (
 //                            <li className="collection-box-container">
 //                              <div className="collection-item-wrp">
 //                                <div className="item-img-wrp">
 //                                  <figure>
 //                                    <img src={itemsCollections?.metadata?.image} style={{height:280}} />
 //                                  </figure>
 //                                </div>
 //                                <div className="colllection-caontent">
 //                                  <div className="collection-top-info d-flex justify-content-between align-items-center">
 //                                    <div className="media align-items-center">
 //                                      <div className="collection-user-circle">
 //                                        <img src={itemsCollections.authImg} />
 //                                      </div>
 //                                      <div className="media-body">
 //                                        <h5 className="d-flex align-items-center">
 //                                      {(itemsCollections?.contract?.address + "")?.length < 10 ? itemsCollections?.contract?.address : (itemsCollections?.contract?.address + "")?.substring(0, 10) + "..."}

 //                                        <span>
 //                                            <img src="/images/Done.svg" />
 //                                          </span>
 //                                        </h5>
 //                                      </div>
 //                                    </div>
 //                                    <div className="brandIcon">
 //                                     <span>
 //                                        {itemsCollections?.networkData?.chainId=="0x13881"?<img  src={"/images/brandIcon.png"} />:<img style={{width:33,height:33}} src={"/images/token-icon.png"} />}
 //                                      </span>
 //                                    </div>
 //                                  </div>
 //                                  <div className="collection-btm">
 //                                  <h3>{(itemsCollections.title + "")?.length < 10 ? itemsCollections.title : (itemsCollections.title + "")?.substring(0, 10) + "..."}</h3>

 //                                    <h4>
 //                                      <span>Top Bid - </span> 15,350{" "}
 //                                      <strong>ETH</strong>
 //                                    </h4>
 //                                  </div>
 //                                  <div className="buy-row d-flex justify-content-between align-items-center">
 //                                    <div className="left-col">
 //                                      <a
 //                                        className="by-now-btn collection"
 //                                        href="/nft-art"
 //                                      >
 //                                        Buy Now
 //                                      </a>
 //                                    </div>
 //                                    <div className="fav-col">
 //                                      <Checkbox
 //                                        {...label}
 //                                        icon={<FavoriteBorder />}
 //                                        onChange={(e)=>handleLikeUnlike(e,itemsCollections?._id)}
 //                                        checkedIcon={<Favorite />}
 //                                        defaultChecked={itemsCollections?.likedCount==1}
 //                                      />
 //                                      <span className="fav-count">
 //                                        {itemsCollections.favCout}
 //                                      </span>
 //                                    </div>
 //                                  </div>
 //                                </div>
 //                              </div>
 //                            </li>
 //                          );
 //                        })}
 //                      </ul>
 //                    </div>
 //                    <div className={styles.morecollectionRow}>
 //                      <Button color="secondary">Explore more collection</Button>
 //                    </div>
 //                  </div>
 //                </div>
 //              </TabPanel>
 //              <TabPanel value={value} index={4}>
 //                <div className="profile-panel-wrp">
 //                  <div className="row d-flex justify-content-between sm-block align-items-center">
 //                    <div className="main-heading">
 //                      <h2>Activity</h2>
 //                    </div>
 //                  </div>
 //                  <div className={styles.profilpanelContainer}>
 //                    <div className={styles.activityGraphRow}>
 //                      <div className={styles.activityTOp}>
 //                        <div className="d-flex">
 //                          <div className={styles.activitybx}>
 //                            <span>90day Avg. Price</span>
 //                            <strong>15,35,450 ETH</strong>
 //                          </div>
 //                          <div className={styles.activitybx}>
 //                            <span>90day Avg. Price</span>
 //                            <strong>15,35,450 ETH</strong>
 //                          </div>
 //                        </div>
 //                      </div>
 //                      <div className={styles.activityGrapWrp}>
 //                        <figure>
 //                          <img src="/images/graph-img.png" />
 //                        </figure>
 //                      </div>
 //                    </div>
 //                    <div className={styles.profileTableData}>
 //                      <TableContainer>
 //                        <Table aria-label="simple table">
 //                          <TableHead>
 //                            <TableRow>
 //                              <TableCell>
 //                                <span className={styles.emptyCell}>
 //                                  Transfer
 //                                </span>
 //                              </TableCell>
 //                              <TableCell>Items</TableCell>
 //                              <TableCell>Price</TableCell>
 //                              <TableCell align="center">Quantity</TableCell>
 //                              <TableCell>From</TableCell>
 //                              <TableCell>To</TableCell>
 //                              <TableCell>Time</TableCell>
 //                            </TableRow>
 //                          </TableHead>
 //                          <TableBody>
 //                            <TableRow>
 //                              <TableCell>
 //                                <div className="d-flex align-items-center">
 //                                  <span className={styles.trnsfrIcon}>
 //                                    <img src="/images/transfer.png" />
 //                                  </span>
 //                                  <span> Transfer</span>
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <div className={styles.itemRow}>
 //                                  <div className={styles.itemImg}>
 //                                    <figure>
 //                                      <img src="/images/itemtable.png" />
 //                                    </figure>
 //                                  </div>
 //                                  <div className={styles.iteContent}>
 //                                    <h5>Bored Ape Club Golden Statues</h5>
 //                                    <p>Bored Ape Statues #034</p>
 //                                  </div>
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <span className={styles.priceContent}>
 //                                  15,000 <strong>ETH</strong>
 //                                </span>
 //                              </TableCell>
 //                              <TableCell align="center">1</TableCell>
 //                              <TableCell>PunkApeArts</TableCell>
 //                              <TableCell>
 //                                <div className={styles.toContent}>
 //                                  <span>Bored Ape Ya...</span>
 //                                  <img src="/images/Done.svg" />
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <div className={styles.timebx}>
 //                                  <div className="d-flex align-items-center">
 //                                    <span> 5min ago</span>
 //                                    <a className={styles.link} href="">
 //                                      <img src="/images/link.png" />
 //                                    </a>
 //                                  </div>
 //                                </div>
 //                              </TableCell>
 //                            </TableRow>
 //                            <TableRow>
 //                              <TableCell>
 //                                <div className="d-flex align-items-center">
 //                                  <span className={styles.trnsfrIcon}>
 //                                    <img src="/images/transfer.png" />
 //                                  </span>
 //                                  <span> Transfer</span>
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <div className={styles.itemRow}>
 //                                  <div className={styles.itemImg}>
 //                                    <figure>
 //                                      <img src="/images/itemtable.png" />
 //                                    </figure>
 //                                  </div>
 //                                  <div className={styles.iteContent}>
 //                                    <h5>Bored Ape Club Golden Statues</h5>
 //                                    <p>Bored Ape Statues #034</p>
 //                                  </div>
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <span className={styles.priceContent}>
 //                                  15,000 <strong>ETH</strong>
 //                                </span>
 //                              </TableCell>
 //                              <TableCell align="center">1</TableCell>
 //                              <TableCell>PunkApeArts</TableCell>
 //                              <TableCell>
 //                                <div className={styles.toContent}>
 //                                  <span>Bored Ape Ya...</span>
 //                                  <img src="/images/Done.svg" />
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <div className={styles.timebx}>
 //                                  <div className="d-flex align-items-center">
 //                                    <span> 5min ago</span>
 //                                    <a className={styles.link} href="">
 //                                      <img src="/images/link.png" />
 //                                    </a>
 //                                  </div>
 //                                </div>
 //                              </TableCell>
 //                            </TableRow>
 //                            <TableRow>
 //                              <TableCell>
 //                                <div className="d-flex align-items-center">
 //                                  <span className={styles.trnsfrIcon}>
 //                                    <img src="/images/transfer.png" />
 //                                  </span>
 //                                  <span> Transfer</span>
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <div className={styles.itemRow}>
 //                                  <div className={styles.itemImg}>
 //                                    <figure>
 //                                      <img src="/images/itemtable.png" />
 //                                    </figure>
 //                                  </div>
 //                                  <div className={styles.iteContent}>
 //                                    <h5>Bored Ape Club Golden Statues</h5>
 //                                    <p>Bored Ape Statues #034</p>
 //                                  </div>
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <span className={styles.priceContent}>
 //                                  15,000 <strong>ETH</strong>
 //                                </span>
 //                              </TableCell>
 //                              <TableCell align="center">1</TableCell>
 //                              <TableCell>PunkApeArts</TableCell>
 //                              <TableCell>
 //                                <div className={styles.toContent}>
 //                                  <span>Bored Ape Ya...</span>
 //                                  <img src="/images/Done.svg" />
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <div className={styles.timebx}>
 //                                  <div className="d-flex align-items-center">
 //                                    <span> 5min ago</span>
 //                                    <a className={styles.link} href="">
 //                                      <img src="/images/link.png" />
 //                                    </a>
 //                                  </div>
 //                                </div>
 //                              </TableCell>
 //                            </TableRow>
 //                            <TableRow>
 //                              <TableCell>
 //                                <div className="d-flex align-items-center">
 //                                  <span className={styles.trnsfrIcon}>
 //                                    <img src="/images/transfer.png" />
 //                                  </span>
 //                                  <span> Transfer</span>
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <div className={styles.itemRow}>
 //                                  <div className={styles.itemImg}>
 //                                    <figure>
 //                                      <img src="/images/itemtable.png" />
 //                                    </figure>
 //                                  </div>
 //                                  <div className={styles.iteContent}>
 //                                    <h5>Bored Ape Club Golden Statues</h5>
 //                                    <p>Bored Ape Statues #034</p>
 //                                  </div>
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <span className={styles.priceContent}>
 //                                  15,000 <strong>ETH</strong>
 //                                </span>
 //                              </TableCell>
 //                              <TableCell align="center">1</TableCell>
 //                              <TableCell>PunkApeArts</TableCell>
 //                              <TableCell>
 //                                <div className={styles.toContent}>
 //                                  <span>Bored Ape Ya...</span>
 //                                  <img src="/images/Done.svg" />
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <div className={styles.timebx}>
 //                                  <div className="d-flex align-items-center">
 //                                    <span> 5min ago</span>
 //                                    <a className={styles.link} href="">
 //                                      <img src="/images/link.png" />
 //                                    </a>
 //                                  </div>
 //                                </div>
 //                              </TableCell>
 //                            </TableRow>
 //                            <TableRow>
 //                              <TableCell>
 //                                <div className="d-flex align-items-center">
 //                                  <span className={styles.trnsfrIcon}>
 //                                    <img src="/images/transfer.png" />
 //                                  </span>
 //                                  <span> Transfer</span>
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <div className={styles.itemRow}>
 //                                  <div className={styles.itemImg}>
 //                                    <figure>
 //                                      <img src="/images/itemtable.png" />
 //                                    </figure>
 //                                  </div>
 //                                  <div className={styles.iteContent}>
 //                                    <h5>Bored Ape Club Golden Statues</h5>
 //                                    <p>Bored Ape Statues #034</p>
 //                                  </div>
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <span className={styles.priceContent}>
 //                                  15,000 <strong>ETH</strong>
 //                                </span>
 //                              </TableCell>
 //                              <TableCell align="center">1</TableCell>
 //                              <TableCell>PunkApeArts</TableCell>
 //                              <TableCell>
 //                                <div className={styles.toContent}>
 //                                  <span>Bored Ape Ya...</span>
 //                                  <img src="/images/Done.svg" />
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <div className={styles.timebx}>
 //                                  <div className="d-flex align-items-center">
 //                                    <span> 5min ago</span>
 //                                    <a className={styles.link} href="">
 //                                      <img src="/images/link.png" />
 //                                    </a>
 //                                  </div>
 //                                </div>
 //                              </TableCell>
 //                            </TableRow>
 //                            <TableRow>
 //                              <TableCell>
 //                                <div className="d-flex align-items-center">
 //                                  <span className={styles.trnsfrIcon}>
 //                                    <img src="/images/transfer.png" />
 //                                  </span>
 //                                  <span> Transfer</span>
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <div className={styles.itemRow}>
 //                                  <div className={styles.itemImg}>
 //                                    <figure>
 //                                      <img src="/images/itemtable.png" />
 //                                    </figure>
 //                                  </div>
 //                                  <div className={styles.iteContent}>
 //                                    <h5>Bored Ape Club Golden Statues</h5>
 //                                    <p>Bored Ape Statues #034</p>
 //                                  </div>
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <span className={styles.priceContent}>
 //                                  15,000 <strong>ETH</strong>
 //                                </span>
 //                              </TableCell>
 //                              <TableCell align="center">1</TableCell>
 //                              <TableCell>PunkApeArts</TableCell>
 //                              <TableCell>
 //                                <div className={styles.toContent}>
 //                                  <span>Bored Ape Ya...</span>
 //                                  <img src="/images/Done.svg" />
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <div className={styles.timebx}>
 //                                  <div className="d-flex align-items-center">
 //                                    <span> 5min ago</span>
 //                                    <a className={styles.link} href="">
 //                                      <img src="/images/link.png" />
 //                                    </a>
 //                                  </div>
 //                                </div>
 //                              </TableCell>
 //                            </TableRow>
 //                            <TableRow>
 //                              <TableCell>
 //                                <div className="d-flex align-items-center">
 //                                  <span className={styles.trnsfrIcon}>
 //                                    <img src="/images/transfer.png" />
 //                                  </span>
 //                                  <span> Transfer</span>
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <div className={styles.itemRow}>
 //                                  <div className={styles.itemImg}>
 //                                    <figure>
 //                                      <img src="/images/itemtable.png" />
 //                                    </figure>
 //                                  </div>
 //                                  <div className={styles.iteContent}>
 //                                    <h5>Bored Ape Club Golden Statues</h5>
 //                                    <p>Bored Ape Statues #034</p>
 //                                  </div>
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <span className={styles.priceContent}>
 //                                  15,000 <strong>ETH</strong>
 //                                </span>
 //                              </TableCell>
 //                              <TableCell align="center">1</TableCell>
 //                              <TableCell>PunkApeArts</TableCell>
 //                              <TableCell>
 //                                <div className={styles.toContent}>
 //                                  <span>Bored Ape Ya...</span>
 //                                  <img src="/images/Done.svg" />
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <div className={styles.timebx}>
 //                                  <div className="d-flex align-items-center">
 //                                    <span> 5min ago</span>
 //                                    <a className={styles.link} href="">
 //                                      <img src="/images/link.png" />
 //                                    </a>
 //                                  </div>
 //                                </div>
 //                              </TableCell>
 //                            </TableRow>
 //                            <TableRow>
 //                              <TableCell>
 //                                <div className="d-flex align-items-center">
 //                                  <span className={styles.trnsfrIcon}>
 //                                    <img src="/images/transfer.png" />
 //                                  </span>
 //                                  <span> Transfer</span>
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <div className={styles.itemRow}>
 //                                  <div className={styles.itemImg}>
 //                                    <figure>
 //                                      <img src="/images/itemtable.png" />
 //                                    </figure>
 //                                  </div>
 //                                  <div className={styles.iteContent}>
 //                                    <h5>Bored Ape Club Golden Statues</h5>
 //                                    <p>Bored Ape Statues #034</p>
 //                                  </div>
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <span className={styles.priceContent}>
 //                                  15,000 <strong>ETH</strong>
 //                                </span>
 //                              </TableCell>
 //                              <TableCell align="center">1</TableCell>
 //                              <TableCell>PunkApeArts</TableCell>
 //                              <TableCell>
 //                                <div className={styles.toContent}>
 //                                  <span>Bored Ape Ya...</span>
 //                                  <img src="/images/Done.svg" />
 //                                </div>
 //                              </TableCell>
 //                              <TableCell>
 //                                <div className={styles.timebx}>
 //                                  <div className="d-flex align-items-center">
 //                                    <span> 5min ago</span>
 //                                    <a className={styles.link} href="">
 //                                      <img src="/images/link.png" />
 //                                    </a>
 //                                  </div>
 //                                </div>
 //                              </TableCell>
 //                            </TableRow>
 //                          </TableBody>
 //                        </Table>
 //                      </TableContainer>
 //                    </div>
 //                  </div>
 //                </div>
 //              </TabPanel>             
 //            </div>
 //          </div>
 //    )
 
 const iconStyle = {
      background:'#fd4c4c',
    padding: 7,
    fontSize: 20,
    borderRadius: 50,
    color:"#3e3179",
    padding: 8,
    margin:'13px 0px 0px',
    marginRight:10,
    cursor:'pointer',
    boxShadow:'0px 1px 5px #31245d'
 }

 const acceptCallback = (item)=>{
    //Accept the Offer
    if(!item?._id) return
    createPostReq(`${ACCEPT_OFFERS}${item?._id}`).then(res => {
      setReloadData3(!reloadData3)
        if(res?.message){
          setAlert(res?.message)
        }
      }).catch((e)=>{
        if(e?.response?.data?.message){
          setAlert(e?.response?.data?.message)
        }
      })
 }

  return (
    <div>
      <div className="blue-bg">
        <div className="top-space-header">
          <div className="containerFluid">
          {isAlert?<AlertBox textMessage={isAlert} onClose={()=>{setAlert("")}}/>:null}

          {
            userDetails?._id?(
<div className={styles.expolreBannerTop}>
              <div className={styles.exloreImage}>
                <figure style={{background:`url(${userDetails?.profileBanner?userDetails?.profileBanner:'/images/explore-banner.png'})`,backgroundRepeat:'none',backgroundSize:'cover',backgroundPosition:'center center'}}></figure>
              </div>
              <div className={styles.exploreBtmInfo}>
                <div className={styles.userProfilInfo}>
                  <figure>
                    <img src={userDetails?.profilePic?userDetails?.profilePic:"/images/user-pic.png"} />
                  </figure>
                  <h3>
                  {(userDetails?.name + "")?.length < 18 ? userDetails?.name : (userDetails?.name + "")?.substring(0, 18) + "..."}
                    {userDetails?.isVerified && <span>
                      <img src="/images/Done.svg" />
                    </span>}
                  </h3>
                  <h4>
                    by
                    <strong onClick={()=>copyToClipBoard(userDetails?.walletAddress)} style={styleAddress}> {(userDetails?.walletAddress + "")?.length < 10 ? userDetails?.walletAddress : (userDetails?.walletAddress + "")?.substring(0, 10) + "..."}</strong>
                    {userDetails?.isVerified && <span>
                      <img src="/images/Done.svg" />
                    </span>}
                  </h4>
                   <div>
                    {userDetails?.socialLink?.youtube?<a href={userDetails?.socialLink?.youtube} target="_blank"><span style={iconStyle} className="fa fa-youtube-play"></span></a>:null}
                    {userDetails?.socialLink?.twitter?<a href={userDetails?.socialLink?.twitter} target="_blank"><span style={{...iconStyle,background:'rgb(71 187 251)'}} className="fa fa-twitter"></span></a>:null}
                    {userDetails?.socialLink?.instagram?<a href={userDetails?.socialLink?.instagram} target="_blank"><span style={{...iconStyle,background:'#3e3179',color:'#fff'}} className="fa fa-globe"></span></a>:null}
                    </div>
                </div>

                <div className={styles.listInfoDis}>
                  <p style={{wordBreak:'break-all',color:'white !important',padding:'0px 30px 4px 30px'}}>
                  {(userDetails?.about + "")?.length < 100 ? userDetails?.about : <span>{(userDetails?.about + "")?.substring(0, readMore?userDetails?.about?.length:100)}<strong onClick={()=>setReadMore(!readMore)} style={{cursor:'pointer'}}>... {readMore?'LESS':'MORE'}</strong></span>}
                  </p>
                  <p style={{marginTop:15}}>
                  <span>{userDetails?.followerCount?userDetails?.followerCount:0} <strong>followers</strong></span>{" "}
                  <span>{userDetails?.followingCount?userDetails?.followingCount:0} <strong>following</strong></span>
                  </p>
                  {user?._id!=userDetails?._id?(userDetails?.followedByMe?.length>0 && user?._id==userDetails?.followedByMe[0]?.followedBy)?<Button disabled={loading} onClick={()=>unFollowHandler()} style={followStylebtn}>Unfollow</Button>:<Button disabled={loading} onClick={()=>FollowHandler()} style={followStylebtn}>Follow</Button>:null}</div>
              </div>
            </div>
              ):null
          }            
          </div>
          {userDetails?._id==user?._id?
            <LoggedIn 
            value={value}
            acceptCallback={acceptCallback}
            handleChangeTab={handleChangeTab}
            a11yProps={a11yProps}
            open={open}
            anchorEl={anchorEl}
            offersLists={offersLists}
            handleClose={handleClose}
            activitiesList={activitiesList}
            expanded={expanded}
            handleClick={handleClick}
            createdItemList={createdItemList}
            itemsOnSale={itemsOnSale}
            collectedFavNfts={collectedFavNfts}
            loadMore={loadMore}
            sortBy={sortBy}
            TabPanel={TabPanel}
            handleChange={handleChange}
            handleSortBy={(e)=>setSortBy(e)}
            collectedNfts={collectedNfts}
            userDetails={userDetails}
            label={label}
            disableMore={disableMore}
            user={user}
            handleLikeUnlike={handleLikeUnlike}
            unFollowHandler={unFollowHandler}
            FollowHandler={FollowHandler}
            handleSearch={handleSearch}
            router={router}
            />:
            <OtherProfile 
            value={value}
            activitiesList={activitiesList}
            router={router}
             handleLikeUnlike={handleLikeUnlike}
            unFollowHandler={unFollowHandler}
            FollowHandler={FollowHandler}
            userDetails={userDetails}
            handleSearch={handleSearch}
            label={label}
            disableMore={disableMore}
            user={user}
            collectedNfts={collectedNfts}
            TabPanel={TabPanel}
            handleChangeTab={handleChangeTab}
            a11yProps={a11yProps}
            offersLists={offersLists}
            open={open}
            anchorEl={anchorEl}
            handleClose={handleClose}
            expanded={expanded}
            handleClick={handleClick}
            handleChange={handleChange}
            createdItemList={createdItemList}
            itemsOnSale={itemsOnSale}
            collectedFavNfts={collectedFavNfts}
            loadMore={loadMore} />}
         

        </div>
      </div>
    </div>
  );
}