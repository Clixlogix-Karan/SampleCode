import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from "../../styles/components/activities/tabUi.module.scss";
import { Button, Grid, Paper } from '@mui/material';
import { ACTIVITY_GET_MY_LIST } from '../../apis/variables'
import { createPostReq } from '../../apis/factory.api'
import Link from 'next/link';
import moment from 'moment';
import { useAuth } from "../../contexts/auth.context";

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
                <Box sx={{ p: 5 }}>
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
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    const [filters, setFilters] = React.useState([]);
    const [SelectedTab, setSelectedTabs] = React.useState("");
    const [allList, setAllList] = React.useState([]);

    const { user } = useAuth()

    const typeIcons = {
        Listings: "fa fa-tags",
        Purchase: "fa fa-diamond",
        Sales: "fa fa-bolt",
        Transfer: "fa fa-exchange",
        Burns: "fa fa-fire",
        Likes: "fa fa-heart",
        Bids: "fa fa-gavel",
        following: "fa fa-check"
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        let tabs = { 1: "following", 2: "My Activity", 3: "My Bids" }
        setSelectedTabs(tabs[newValue] && tabs[newValue]?.length>0 ? tabs[newValue] : "")
    };

    React.useEffect(() => {
        let PAYLOAD = {
            pageNo: 1,
            limit: 5,
            activityTypes: filters
        }
        if (user?._id) {
            PAYLOAD.userId = user?._id
        }
        if (SelectedTab) {
            PAYLOAD.selected = SelectedTab
        }
        createPostReq(ACTIVITY_GET_MY_LIST, { ...PAYLOAD }).then((res) => {
            if(res?.data?.length>0){
                setAllList(res?.data)
            }else{
                setAllList([])
            }
        }).catch((e) => {
            setAllList([])
            console.log(e?.response?.data)
        })
    }, [filters, user?._id, SelectedTab])

    const onFilterClick = (label) => {
        setFilters([label])
    }
    const objGetFromArray = (arr = []) => arr?.length > 0 ? arr[0] : {}

    const CardBox = ({ data }) => {
        if (data?.activityType == 'following' && data?.followingDetails?.length>0) {
            return data?.followingDetails?.map((followingUser)=>{
                return (
                    <div className={styles.box}>
                        <Grid container fullWidth style={{ width: '100%' }}>
                            <Grid item lg={2} spacing={2}>
                                <figure>
                                    <span className={styles.icon_tag}><i className={typeIcons[data?.activityType]}></i></span>
                                    <img style={{ width: 50, height: 50 }} className={styles.boxLogo} src={objGetFromArray(data?.followedByInfo)?.profilePic ? objGetFromArray(data?.followedByInfo)?.profilePic : "/images/placeholder.png"} />
                                </figure>
                            </Grid>
                            <Grid item lg={8}>
                                <div className={styles.info}>
                                    <h3>{(objGetFromArray(data?.followedByInfo)?.name + "")?.length < 10 ? objGetFromArray(data?.followedByInfo)?.name : (objGetFromArray(data?.followedByInfo)?.name + "")?.substring(0, 10) + "..."}</h3>
                                    <p>Started following <Link href={`/profile/${followingUser?._id}`}><a className={styles.link}>{(followingUser?.name + "")?.length < 10 ? followingUser?.name : (followingUser?.name + "")?.substring(0, 10) + "..."}</a></Link> </p>
                                    <p className={styles.time}>{data?.createdAt ? moment(data?.createdAt).fromNow() : null} <span>
                                        {
                                             followingUser?._id ? (
                                                <Link href={`/profile/${followingUser?._id}`}>
                                                    <a className={styles.link}>
                                                        <img src="/images/link.png" className={styles.linkImg} />
                                                    </a>
                                                </Link>
                                            ) : null
                                        }</span></p>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                )
            })
        } else {
            return (
                <div className={styles.box}>
                    <Link href={`/item/${objGetFromArray(data?.itemDetails)?._id}`}>
                        <a>
                            <Grid container fullWidth style={{ width: '100%' }}>
                                <Grid item lg={2} spacing={2}>
                                    <Link href={`/item/${objGetFromArray(data?.itemDetails)?._id}`}>
                                        <a>
                                            <figure>
                                                <span className={styles.icon_tag}><i className={typeIcons[data?.activityType]}></i></span>
                                                <img style={{ width: 50, height: 50 }} className={styles.boxLogo} src={objGetFromArray(data?.tokenData)?.imageUrl ? objGetFromArray(data?.tokenData)?.imageUrl : "/images/placeholder.png"} />
                                            </figure>
                                        </a>
                                    </Link>
                                </Grid>
                                <Grid item lg={8}>
                                    <div className={styles.info}>
                                        <h3><Link href={`/item/${objGetFromArray(data?.itemDetails)?._id}`}><a>{(objGetFromArray(data?.itemDetails)?.name + "")?.length < 15 ? objGetFromArray(data?.itemDetails)?.name : (objGetFromArray(data?.itemDetails)?.name + "")?.substring(0, 15) + "..."}</a></Link></h3>
                                        <p><Link href={`/explore/${objGetFromArray(data?.collectionDetails)?._id}`}><a>{(objGetFromArray(data?.collectionDetails)?.name + "")?.length < 15 ? objGetFromArray(data?.collectionDetails)?.name : (objGetFromArray(data?.collectionDetails)?.name + "")?.substring(0, 15) + "..."}</a></Link></p>
                                        <p> minted by <Link href={`/profile/${objGetFromArray(data?.creatorData)?._id}`}><a className={styles.link}>{(objGetFromArray(data?.creatorData)?.name + "")?.length < 15 ? objGetFromArray(data?.creatorData)?.name : (objGetFromArray(data?.creatorData)?.name + "")?.substring(0, 15) + "..."}</a></Link></p>
                                        <p className={styles.time}>{data?.createdAt ? moment(data?.createdAt).fromNow() : null} <span>
                                            {
                                                data?.activityType == 'Transfer' && objGetFromArray(data?.toTransferDetails)?._id ? (
                                                    <Link href={`/profile/${objGetFromArray(data?.fromTransferDetails)?._id}`}>
                                                        <a className={styles.link}>
                                                            <img src="/images/link.png" className={styles.linkImg} />
                                                        </a>
                                                    </Link>
                                                ) : null
                                            }
                                            {
                                                data?.activityType == 'Sales' && objGetFromArray(data?.itemDetails)?._id ? (
                                                    <Link href={`/item/${objGetFromArray(data?.itemDetails)?._id}`}>
                                                        <a className={styles.link}>
                                                            <img src="/images/link.png" className={styles.linkImg} />
                                                        </a>
                                                    </Link>
                                                ) : null
                                            }</span></p>
                                    </div>
                                </Grid>
                            </Grid>
                        </a>
                    </Link>
                </div>
            )
        }
    }

    const NoContent = () => (
        <div className={styles.contentCenter} style={{ padding: '20px' }}>
            <h2>Nothing yet</h2>
            <p>Looks like there`s still nothing. Activity will be shown here</p>
            <Button className={styles.featureBtn} style={{ display: 'block', marginRight: 'auto', marginLeft: 'auto', marginTop: 10 }}><Link href={'/'}><a>Explore more</a></Link></Button>
        </div>
    )

    const resetFilter =()=>{
        setFilters([]); 
        setValue(0);
        setSelectedTabs('');
    }

    return (
        <Box className={styles.tab} lg={{ width: '100% !important' }}>
            <Box sx={{ borderBottom: 1, borderColor: '#4b1899' }}>
                {
                    user?._id ? (
                        <Tabs textColor="secondary"
                            variant="scrollable"
                            scrollButtons="auto"
                            indicatorColor="secondary" value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab style={value == 0 ? {} : { color: '#fff' }} label="All" {...a11yProps(0)} />
                            <Tab style={value == 1 ? {} : { color: '#fff' }} label="Following" {...a11yProps(1)} />
                            <Tab style={value == 2 ? {} : { color: '#fff' }} label="My activity" {...a11yProps(2)} />
                            <Tab style={value == 3 ? {} : { color: '#fff' }} label="My bids" {...a11yProps(3)} />
                        </Tabs>
                    ) :
                        <Tabs textColor="secondary"
                            variant="scrollable"
                            scrollButtons="auto"
                            indicatorColor="secondary" value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab style={value == 0 ? {} : { color: '#fff' }} label="All" {...a11yProps(0)} />
                        </Tabs>
                }
            </Box>
            <Grid container style={{ width: '100% !important' }}>
                <Grid item lg={7} style={{ width: '100% !important' }}>
                    <div className={styles.panel}>
                        <TabPanel style={{ width: '100% !important' }} value={value} index={0}>
                            {allList?.length > 0 ? allList.map((data) => <CardBox data={data} />) : <NoContent />}
                        </TabPanel>
                        {user?._id ? (
                            <>
                                <TabPanel style={{ width: '100% !important' }} value={value} index={1}>
                                    {allList?.length > 0 ? allList.map((data) => <CardBox data={data} />) : <NoContent />}
                                </TabPanel>
                                <TabPanel style={{ width: '100% !important' }} value={value} index={2}>
                                    {allList?.length > 0 ? allList.map((data) => <CardBox data={data} />) : <NoContent />}
                                </TabPanel>
                                <TabPanel style={{ width: '100% !important' }} value={value} index={3}>
                                    {allList?.length > 0 ? allList.map((data) => <CardBox data={data} />) : <NoContent />}
                                </TabPanel>
                            </>
                        ) : null}
                    </div>
                </Grid>
                <Grid item lg={5} style={{ width: '100% !important' }}>
                    <div className='customContainer' style={{ padding: '10px 0px' }}>
                        <h3>Filters <span onClick={resetFilter} style={{ color: 'blue', cursor: 'pointer' }}>Reset filter</span></h3>
                        <Button onClick={() => onFilterClick("Listings")} style={filters.includes("Listings") ? { background: 'linear-gradient(45deg, #8b46ff, #c331ff)' } : {}} className={styles.featureBtn}><span><i className='fa fa-tags'></i> Listings</span></Button>
                        <Button onClick={() => onFilterClick("Purchase")} style={filters.includes("Purchase") ? { background: 'linear-gradient(45deg, #8b46ff, #c331ff)' } : {}} className={styles.featureBtn}><span><i className='fa fa-diamond'></i> Purchase</span></Button>
                        <Button onClick={() => onFilterClick("Sales")} style={filters.includes("Sales") ? { background: 'linear-gradient(45deg, #8b46ff, #c331ff)' } : {}} className={styles.featureBtn}><span><i className='fa fa-bolt'></i> Sales</span></Button>
                        <Button onClick={() => onFilterClick("Transfer")} style={filters.includes("Transfer") ? { background: 'linear-gradient(45deg, #8b46ff, #c331ff)' } : {}} className={styles.featureBtn}><span><i className='fa fa-exchange'></i> Transfer</span></Button>
                        <Button onClick={() => onFilterClick("Burns")} style={filters.includes("Burns") ? { background: 'linear-gradient(45deg, #8b46ff, #c331ff)' } : {}} className={styles.featureBtn}><span><i className='fa fa-fire'></i> Burns</span></Button>
                        <Button onClick={() => onFilterClick("Likes")} style={filters.includes("Likes") ? { background: 'linear-gradient(45deg, #8b46ff, #c331ff)' } : {}} className={styles.featureBtn}><span><i className='fa fa-heart'></i> Likes</span></Button>
                        <Button onClick={() => onFilterClick("Bids")} style={filters.includes("Bids") ? { background: 'linear-gradient(45deg, #8b46ff, #c331ff)' } : {}} className={styles.featureBtn}><span><i className='fa fa-gavel'></i> Bids</span></Button>
                        <Button onClick={() => onFilterClick("following")} style={filters.includes("following") ? { background: 'linear-gradient(45deg, #8b46ff, #c331ff)' } : {}} className={styles.featureBtn}><span><i className='fa fa-check'></i> Followings</span></Button>
                    </div>
                </Grid>
            </Grid>

        </Box>
    );
}
