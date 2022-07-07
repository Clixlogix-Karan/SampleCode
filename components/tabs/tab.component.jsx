import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Select,MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CollectionsComponent from "../collections/collections.component";
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesList } from "../../redux/collection/collection.actions";
import Slider from "react-slick";
import TabItem from "./tabItem";
import { withStyles } from '@material-ui/core';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// const settings2 = {
//   dots: false,
//   infinite: true,
//   speed: 500,
//   centerMode: true,
//   centerPadding: "300px",
//   slidesToShow: 1,
//   slidesToScroll: 2,

//   // response:[
//   //   {desktop: {
//   //     breakpoint: { max: 3000, min: 1024 },
//   //     items: 3,
//   //     slidesToSlide: 1 // optional, default to 1.
//   //   }},
//   //   {tablet: {
//   //     breakpoint: { max: 1024, min: 464 },
//   //     items: 2,
//   //     slidesToSlide: 2 // optional, default to 1.
//   //   }},
//   //   {mobile: {
//   //     breakpoint: { max: 768, min: 0 },
//   //     items: 1,
//   //     slidesToSlide: 1 // optional, default to 1.
//   //   }}
//   // ]
// };

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  centerPadding: "300px",
  slidesToScroll: 1,
  centerMode:true,
  //   response:[
  //   {desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 5,
  //     slidesToSlide: 1 // optional, default to 1.
  //   }},
  //       {tablet: {
  //       breakpoint: { max: 1024, min: 464 },
  //       items: 2,
  //       slidesToSlide: 2 // optional, default to 1.
  //     }},
  //     {mobile: {
  //       breakpoint: { max: 768, min: 0 },
  //       items: 1,
  //       slidesToSlide: 1 // optional, default to 1.
  //     }}
  // ]
  response:[
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const MyTabs = ({children})=>{
  return (
    <Slider {...settings}>
        {children}
    </Slider>
  )
}

const CenteredTabs = withStyles({
  flexContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})(Tabs);

const tabStyle = {
  border: '3px solid #916efa',
  padding: '6px 10px 6px',
  color: "#fff",
  fontSize: 18,
  fontWeight: 'bold',
  marginTop:10,
  marginRight:0,
  borderRadius:50
}

// const MyTab = ({text})=>{
//   return (
//     <div style={{margin:5}}>
//       <span style={tabStyle}>{text}</span>
//     </div>
//   )
// }

export default function TabsComponent() {
  const [value, setValue] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState(0);
  const [lastdays, setLastDay] = React.useState(7);

  const dispatch = useDispatch()
  const categories = useSelector((state) => state?.collectionsReducer?.categories)

  React.useEffect(() => {
    const payload = {
      pageNo: 1,
      limit: 100
    }
    dispatch(getCategoriesList(payload))
  }, [])

  React.useEffect(()=>{
    if(categories?.length>0){
      setValue(categories[0]?._id)
    }
  },[categories])

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  }
  
  return (
    <Box className="collectionsTab">
      <div className="blue-bg">
        <div className="customContainer">
          <div className="main-heading">
            <h2>Explore Collections</h2>
          </div>
          
          <CenteredTabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
                TabIndicatorProps={{
                  style: {
                    display: "none",
                  },
                }}
              >
                  <div>
                  <Select
                  label="Top last"
                  IconComponent={KeyboardArrowDownIcon}
                 className="dayTabBtn"
                  defaultValue={7}
                  value={lastdays}
                  onChange={(e)=>setLastDay(parseInt(e.target.value))}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                   <MenuItem value={0}>
                    <span>All</span>
                   </MenuItem>
                  <MenuItem value={7}>
                    <span>Top last <strong>7 days</strong></span>
                   </MenuItem>
                  <MenuItem value={10}>
                    <span>Top last <strong>10 days</strong></span>
                   </MenuItem>
                   <MenuItem value={15}>
                    <span>Top last <strong>15 days</strong></span>
                   </MenuItem>
                </Select>
                  </div>
                {
                  categories?.map((category, index) => {
                    return <Tab className="tabBtn" label={category?.name} onClick={()=>setActiveTab(index)} value={category?._id} />
                  })
                }
              </CenteredTabs>
             
        </div>
        <div className="containerFluid ExpCollections">
          <TabItem lastdays={lastdays} value={value} activeTab={activeTab} />
        </div>
      </div>
    </Box>
  );
}
