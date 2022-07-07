import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import styles from "../../styles/components/header.module.scss";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Link from "next/link";
import { useEffect } from "react";
import {
  getCurrentWalletConnected, Injected
} from "../../utils/walletConnection";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/auth.context";
import { createGetReq, createPostReqWithParams, getOpenSeaCollections, updatePatchReq } from "../../apis/factory.api";
// import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { styled } from '@mui/material/styles';
import { createPostReq } from '../../apis/factory.api'
import { COUNT_NOTIFY, GET_NOTIFY_LIST, READ_NOTIFY, SEARCH_DATA } from '../../apis/variables'
import { getNftSearchAssets } from "../../apis/factory.api";
import Grid from '@material-ui/core/Grid'
import MyMenu from './MyMenu'
import { useWeb3React } from '@web3-react/core'
import NotifyItem from "./NotifyItem";

const Label = styled('label')({
  display: 'block',
});

const Input = styled('input')(({ theme }) => ({
  width: 200,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.getContrastText(theme.palette.background.paper),
}));

const Listbox = styled('ul')(({ theme }) => ({
  width: 330,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  // backgroundColor: theme.palette.background.paper,
  overflow: 'auto',
  maxHeight: 200,
  backgroundColor: '#2d2258 !important',
  padding: 10,
  color: '#fff',
  borderRadius: 10,
  border: '1px solid rgba(0,0,0,.25)',
  padding: '10px 9px',
  '& li[data-focus="true"]': {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer',
    padding: '10px 9px',
    background: '#4b1899',
  },
  '& li:active': {
    color: 'white',
    padding: 5,
    background: '#4b1899',
    padding: '5px 4px 1px'
  },
}));

function HeaderComponent({ notify,setNotify,setProfileView, profileView }) {
  const { active, chainId, account, activate, deactivate } = useWeb3React();
  const { user } = useAuth()
  const [show, setShow] = React.useState();
  const [walletAddress, setWalletAdress] = useState(null);
  const [status, setStatus] = useState('');
  const [searchResults, setSearchResult] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [searchText, setSearchText] = useState('')
  const router = useRouter()  
  const [count_notify,setCountNotify] = React.useState(0)
  const [notify_list,setNotifyList] = React.useState([])
  const [isReloadData,setReloadData] = React.useState(false)

  useEffect(async () => {
    if (localStorage.getItem('isWalletConnected') == 'true') {
      await activate(Injected)
    }
  }, [isReloadData])

  useEffect(()=>{
    if(user?._id){
      createGetReq(COUNT_NOTIFY)
      .then((res)=>{
        if(res.data){
          setCountNotify(res?.data)
        }
      }).catch(e=>{
        console.log(e.response.data)
      })

      createGetReq(`${GET_NOTIFY_LIST}?pageNo=1&limit=10`).then((res)=>{
        if(res?.data && res?.data[0]?.data){
          setNotifyList(res?.data[0]?.data)
        }
      }).catch(e=>{
        console.log(e.response.data)
      })
    }
  },[user,isReloadData,router?.pathname])


  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const handleClick = (event) => {
    setAnchorEl2(null);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick2 = (event) => {
    setAnchorEl(null);
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  }




  const handleChangeSearch = (e) => {
    setSearchText(e.target.value)
    createPostReq(SEARCH_DATA, {
      name: e.target.value
    }).then((res) => {
      if (res?.data && res?.data?.length > 0) {
        setSearchResult(res?.data)
      } else {
        setSearchResult([])
      }
    }).catch((e) => {
      setSearchResult([])
      console.log(e?.response)
    })
  }

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWalletAdress(address)
    setStatus(status);
  }, [walletAddress]);

  useEffect(async () => {
    getNftSearchAssets({ text: 'rarible' })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }, []);

  const renderProfileTab = () => {
    setProfileView(!profileView)
  }

  const signOutWallet = async () => {
    if (account && active) {
      deactivate()
      localStorage.removeItem('isWalletConnected')
      setWalletAdress(null)
      localStorage.clear()
      router.push("/")
    } else {
      alert('Wallet not connected')
    }
  }

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(account);
    alert('Copied address ' + '"' + account + '"' + ' to clipboard')
  }

  const routeToPage = () => {
    router.push(`/profile/${user?._id}`)
  }

  const styleDropDown = {
    fontSize: 12,
    fontWeight: 500,
  }

  const clickHandler = ()=>{
    updatePatchReq(READ_NOTIFY).then(() => {
      setReloadData(!isReloadData)
    }).catch((e) => {
      console.log(e?.response)
    })
  }

  const logoutHandler = ()=>{
    signOutWallet()
  }


  return (
    <Box>
      <div className={styles.headerBg} >
        <div className={styles.customContainer}>
          <div className={styles.headerRow}>
            <div className={styles.logoBox}>
              <div className={styles.siteLogo}>
                <Link href="/">
                  <a><img src="/images/logo.png" alt="Logo" /></a>
                </Link>
              </div>
            </div>
            <div className={styles.searchFormBox}>
              <div className={styles.searchHeaderForm}>
                <form>
                  <div className={styles.searchRow}>
                    <span className={styles.searchIcon}>
                      <img src="/images/searchicon.png" />
                    </span>
                    <div className={styles.textFieldRadius}>
                      <TextField
                        value={searchText}
                        onChange={handleChangeSearch}
                        fullWidth
                        style={{ maxWidth: 310 }}
                        id="standard-bare"
                        variant="outlined"
                        autoComplete='off'
                        placeholder="Collection, item and accounts"
                      />
                      {searchText?.length > 0 && searchResults.length > 0 ? (
                        <Listbox>
                          {searchResults.map((option, index) => option?.slug?(
                            <li key={index} onClick={() => { setSearchText(''); setSearchResult([]) }} style={{ padding: '10px 5px', width: '100%' }}><Link style={{ width: '100%', padding: '10px 5px' }} href={`/explore/slug/${option?.slug}`}>
                              <a>
                                <Grid container spacing={1}>
                                  <Grid item>
                                    <img style={{ width: 40, height: 40, borderRadius: 50 }} src={option?.image_url} />
                                  </Grid>
                                  <Grid item style={{ padding: '14px 6px' }}>
                                    <span style={{ fontSize: 14 }}>{option?.name}</span>
                                  </Grid>
                                </Grid>
                              </a>
                            </Link></li>
                          ):(
                            <li key={index} onClick={() => { setSearchText(''); setSearchResult([]) }} style={{ padding: '10px 5px', width: '100%' }}><Link style={{ width: '100%', padding: '10px 5px' }} href={`/explore/${option?._id}`}>
                              <a>
                                <Grid container spacing={1}>
                                  <Grid item>
                                    <img style={{ width: 40, height: 40, borderRadius: 50 }} src={option?.logo} />
                                  </Grid>
                                  <Grid item style={{ padding: '14px 6px' }}>
                                    <span style={{ fontSize: 14 }}>{option?.name}</span>
                                  </Grid>
                                </Grid>
                              </a>
                            </Link></li>
                          ))}
                        </Listbox>
                      ) : null}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className={styles.togglebx}>
              <Button onClick={() => setShow(!show)}>
                <img src="/images/ToggleNav.svg" />
              </Button>
            </div>
            <div className={`MobileMenu ${show ? "show" : ""}`}>
              <div className={styles.menuBox}>
                <div className={styles.siteNav}>
                  <div className={styles.searchFormBox}>
                    <div className={styles.searchHeaderForm}>
                      <form>
                        <div className={styles.searchRow}>
                          <span className={styles.searchIcon}>
                            <img src="/images/searchicon.png" />
                          </span>
                          <div className={styles.textFieldRadius}>
                            <TextField
                              fullWidth
                              id="standard-bare"
                              variant="outlined"
                              placeholder="Collection, item and accounts"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <nav>
                    <ul>
                      <li>
                        <Link href="/">
                          <a><span className={styles.navLink}>Explore</span></a>
                        </Link>
                      </li>
                      <li>
                        {/* <Link href="/create-item/single">
                          <a><span className={styles.navLink}>Create </span></a>
                        </Link> */}

                        <a
                          className={styles.navLink}
                          id="basic-button"
                          aria-controls={open2 ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open2 ? "true" : undefined}
                          disableScrollLock={false}
                          onClick={handleClick2}
                          onMouseOver={handleClick2}
                          aria-owns={anchorEl2 ? "basic-menu" : undefined}
                        >
                          Create
                          <KeyboardArrowDownIcon />
                        </a>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl2}
                          open={open2}
                          onClose={handleClose2}
                          className="headerDropDown"
                            disableScrollLock={false}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                            onMouseLeave: handleClose2
                          }}
                        >
                          <MenuItem onClick={handleClose2}>
                            <Link href="/create-item/single">Create Item</Link>
                          </MenuItem>
                          <MenuItem onClick={handleClose2}>
                            <Link href="/create-collection/erc-721">Create Collection</Link>
                          </MenuItem>
                        </Menu>

                      </li>
                      <li>
                        <Link href="/activity">
                          <a><span className={styles.navLink}>Activity</span></a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/faq">
                          <a><span className={styles.navLink}>FAQ</span></a>
                        </Link>
                      </li>
                      <li>
                        <a
                          className={styles.navLink}
                          id="basic-button"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          disableScrollLock={false}
                          onClick={handleClick}
                          onMouseOver={handleClick}
                          aria-owns={anchorEl ? "basic-menu" : undefined}
                        >
                          Get Token
                          <KeyboardArrowDownIcon />
                        </a>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          className="headerDropDown"
                          disableScrollLock={false}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                            onMouseLeave: handleClose
                          }}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center"
                          }}
                        >
                          <MenuItem onClick={handleClose}>
                            <Link href="/getToken">Buy</Link>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <Link href="/getToken">Pool</Link>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <Link href="/getToken">Farm</Link>
                          </MenuItem>
                        </Menu>
                      </li>

                      {/* <li>
                        <a className={styles.navLink}> Buy ETH</a>
                      </li> */}

                      <li className={styles.connectWalletBtn}>
                        <Link href="/connectWallet">
                          {active ? (
                            "Connected"
                            // String(walletAddress).substring(0, 6) +
                            // "..." +
                            // String(walletAddress).substring(38)
                          ) : (
                            'Connect Wallet'
                          )}
                        </Link>
                      </li>
                      {active && (
                        <>
                        <li className={styles.uerProfile} style={{marginRight:14}}>
                          <a>
                            <span className={styles.countBadge}>{count_notify}</span>
                            <Avatar style={{ cursor: 'pointer' }} onMouseOver={() => {setNotify(true);setProfileView(false)}} onClick={()=>{setNotify(true);setProfileView(false)}}>
                              <i className="fa fa-bell"></i>
                            </Avatar>
                          </a>
                          {
                            notify &&
                            <div className={styles.profileTabViewer1}>
                              <div className={styles.profileTabViewWrapper}>
                                {
                                  notify_list?.length>0 ? notify_list?.map((item)=><NotifyItem clickHandler={clickHandler} item={item} key={item?._id} styles={styles}/>):<h3 style={{textAlign:'center',color:'#3c2d71'}}>No notification yet!</h3>
                                }
                                <div className={styles.contentWrapper}>
                                  <Button className={styles.AddCardBtn} onClick={()=>router.push('/notifications')}>Read all</Button>
                                </div>
                              </div>
                              {/* <div className={styles.signOutWrapper}> */}
                              {/* <p onClick={signOutWallet} className={styles.signOutText}>Sign out</p> */}
                              {/* </div> */}
                            </div>
                          }
                        </li>
                        <li className={styles.uerProfile}>
                          <a>
                            <Avatar style={{ cursor: 'pointer' }} onMouseOver={() => {setProfileView(true);setNotify(false)}} onClick={()=>{setProfileView(true);setNotify(false)}}>
                              <img src="/images/profileicon.png" alt="Profile" />
                            </Avatar>
                          </a>
                          {
                            profileView &&
                            <div className={styles.profileTabViewer}>
                              <div className={styles.profileTabViewWrapper}>
                                <div className={styles.addressWrapper}>
                                  <h3 className={styles.profileAddress}>
                                    {String(account).substring(0, 12) + "..." + String(account).substring(38)}
                                  </h3>
                                  <span className={styles.copyAddressIcon} style={{ marginLeft: '60px' }} onClick={copyToClipBoard}>
                                    <ContentCopyIcon />
                                  </span>
                                </div>

                                <li className={styles.boxCard}>
                                  <div className={styles.myProfileWrapper}>
                                    <div className={styles.myProfile}>
                                      <span className={styles.editProfileIcon} style={{ marginRight: '10px' }}>
                                        <Link href={`/profile/${user?._id}`}>
                                          <img src="/images/iconDaimonds.png" style={{ maxWidth: 30 }} />
                                        </Link>
                                      </span>
                                      <h4 className={styles.myProfileText}>
                                        0 ETH <span style={styleDropDown}>/Balance</span>
                                      </h4>
                                    </div>
                                  </div>

                                  <div className={styles.myProfileWrapper}>
                                    <div className={styles.myProfile}>
                                      <span className={styles.editProfileIcon} style={{ marginRight: '10px' }}>
                                        <Link href={`/profile/${user?._id}`}>
                                          <img src="/images/iconDaimonds.png" style={{ maxWidth: 30 }} />
                                        </Link>
                                      </span>
                                      <h4 className={styles.myProfileText}>
                                        0 WETH<span style={styleDropDown}>/Bidding Bal.</span>
                                      </h4>
                                      <span className={styles.headerMenuBtn}><Button style={{ color: '#322560' }}>Convert</Button></span>
                                    </div>
                                  </div>

                                  <div className={styles.myProfileWrapper}>
                                    <div className={styles.myProfile}>
                                      <span className={styles.editProfileIcon} style={{ marginRight: '10px' }}>
                                        <Link href={`/profile/${user?._id}`}>
                                          <img src="/images/iconDaimonds.png" style={{ maxWidth: 30 }} />
                                        </Link>
                                      </span>
                                      <h4 className={styles.myProfileText} style={{ marginRight: '90px' }}>
                                        O RARI
                                      </h4>
                                      <span className={styles.headerMenuBtn}><Button style={{ color: '#322560' }}>Claim</Button></span>
                                    </div>
                                  </div>
                                  {/* <Button className={styles.AddCardBtn}>Add Funds with Card</Button> */}
                                </li>
                                <Link href={`/profile/${user?._id}`}>
                                  <a>
                                    <div style={{ marginTop: 14 }} className={styles.myProfileWrapper}>

                                      <div className={styles.myProfile}>
                                        <span className={styles.editProfileIcon} style={{ marginRight: '10px' }}>
                                          <PermIdentityIcon />
                                        </span>
                                        <h4 className={styles.myProfileText}>
                                          Profile
                                        </h4>
                                      </div>
                                      <span className={styles.editProfileIcon} onClick={routeToPage}>
                                        <EditOutlinedIcon />
                                      </span>
                                    </div>
                                  </a>
                                </Link>
                                <Link href={`/my_collections`}>
                                  <a>
                                    <div style={{ marginTop: 14 }} className={styles.myProfileWrapper}>

                                      <div className={styles.myProfile}>
                                        <span className={styles.editProfileIcon} style={{ marginRight: '10px' }}>
                                          <PermIdentityIcon />
                                        </span>
                                        <h4 className={styles.myProfileText}>
                                          My Collections
                                        </h4>
                                      </div>
                                      {/* <span className={styles.editProfileIcon} onClick={routeToPage}>
                                    <EditOutlinedIcon/>
                                  </span> */}
                                    </div>
                                  </a>
                                </Link>

                                <div className={styles.contentWrapper} onClick={logoutHandler}>
                                  <Button className={styles.AddCardBtn}>Sign Out</Button>
                                </div>
                              </div>
                              {/* <div className={styles.signOutWrapper}> */}
                              {/* <p onClick={signOutWallet} className={styles.signOutText}>Sign out</p> */}
                              {/* </div> */}
                            </div>
                          }
                        </li>
                        </>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default HeaderComponent;
