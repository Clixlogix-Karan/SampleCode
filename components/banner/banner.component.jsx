import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "react-slick";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import styles from "../../styles/components/banner/banner.module.scss";
import { useDispatch, useSelector, useStore } from "react-redux";
import { getTrendingCollectionList } from '../../redux/collection/collection.actions'
import Image from "next/image";
import {useRouter} from 'next/router'
import CollectionBox from "./CollectionBox";
import CollectionBox2 from "./CollectionBox2";

function BannerSection() {
  const router = useRouter()
  // console.log("router",router)
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,


    response: [
      {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 1 // optional, default to 1.
        }
      },
      {
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        }
      },
      {
        mobile: {
          breakpoint: { max: 768, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      }
    ]

    // responsive: [
    //   {
    //     breakpoint: 400,
    //     settings: {
    //       centerPadding: "120px",
    //     },
    //   },
    //   {
    //     breakpoint: 1199,
    //     settings: {
    //       centerPadding: "40px",
    //     },
    //   },
    //   {
    //     breakpoint: 1023,
    //     settings: {
    //       centerPadding: "60px",
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },

    //   {
    //     breakpoint: 660,
    //     settings: {
    //       centerPadding: "20px",
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };

  const dispatch = useDispatch()

  useEffect(() => {
    const payload = {
      pageNo: 1,
      limit: 40
    }
    dispatch(getTrendingCollectionList(payload))
  }, [])


  const trendingList = useSelector((state) => state?.collectionsReducer?.trendingCollections)
  const trendingListStatic = [
    {
      "_id":"62383398a0b36b801512a6ee",
      "name": "asdasd",
      "tokenSymbol": "sdascas",
      "url": "sfdfef",
      "description": "",
      "logo": "https://cms-runing-worldcup.s3-us-east-2.amazonaws.com/category_1647346507712.png",
      "featuredImage": "https://cms-runing-worldcup.s3-us-east-2.amazonaws.com/category_1647346507712.png",
      "userId": {
          "$oid": "6232d526e604de9306e79e42"
      },
      "bannerImage": "https://cms-runing-worldcup.s3-us-east-2.amazonaws.com/category_1647346507712.png%22",
      "networkId": {
          "$oid": "6232e4cd85d228ec132c912c"
      },
      "address": "0xE3911F04DE3Fc6e1f85776d1Db2C60b8d63a2AbF",
      "hash": "0x5094b34ced3161e13116225df80465f00266416ddd7899b1467a77dea32cd892",
      "categoryId": {
          "$oid": "61fb808e87629998bd8b895d"
      },
      "isActive": true,
      "createdAt": {
          "$date": "2022-03-21T08:13:12.899Z"
      },
      "updatedAt": {
          "$date": "2022-03-21T08:13:12.899Z"
      },
      "__v": 0
  },
  {
    "_id": "623853b2ce43b8027229a709",
    "name": "TREASURE TUB",
    "tokenSymbol": "TTB",
    "url": "TTB.COM",
    "description": "TTB DESCRIPTION",
    "logo": "https://cms-runing-worldcup.s3-us-east-2.amazonaws.com/category_1647346507712.png",
    "featuredImage": "https://cms-runing-worldcup.s3-us-east-2.amazonaws.com/category_1647346507712.png",
    "userId": {
        "$oid": "62385280ce43b8027229a6f0"
    },
    "bannerImage": "https://cms-runing-worldcup.s3-us-east-2.amazonaws.com/category_1647346507712.png%22",
    "networkId": {
        "$oid": "6232e4cd85d228ec132c912c"
    },
    "address": "0x50d89705CC900Ec147B0eCeA8cd883a53aA2f0E4",
    "hash": "0xff24aeba52f4d55777809735ceef638231ad5dc0c82b27b1a5289cbef046c9fe",
    "categoryId": {
        "$oid": "61fb808e87629998bd8b895d"
    },
    "isActive": true,
    "createdAt": {
        "$date": "2022-03-21T10:30:10.163Z"
    },
    "updatedAt": {
        "$date": "2022-03-21T10:30:10.163Z"
    },
    "__v": 0
},
{
  "_id": "623890144eb9956bdad2fb56",
  "name": "pop smoke collection 21march",
  "tokenSymbol": "saZxawsd",
  "url": "www.polygon-nft.com",
  "description": "polygon nft marketplace",
  "logo": "https://cms-runing-worldcup.s3-us-east-2.amazonaws.com/category_1647346507712.png",
  "featuredImage": "https://cms-runing-worldcup.s3-us-east-2.amazonaws.com/category_1647346507712.png",
  "userId": {
      "$oid": "6232d526e604de9306e79e42"
  },
  "bannerImage": "https://cms-runing-worldcup.s3-us-east-2.amazonaws.com/category_1647346507712.png%22",
  "networkId": {
      "$oid": "6232e4cd85d228ec132c912c"
  },
  "address": "0x7959457f95F7A2BB1e1e688Aaa3bB703AdAEF1Bc",
  "hash": "0xc357a85c6d1c1f091ae539684fde4659f69471285507b7257deea297957a1078",
  "categoryId": {
      "$oid": "61fb808e87629998bd8b895d"
  },
  "isActive": true,
  "createdAt": {
      "$date": "2022-03-21T14:47:48.516Z"
  },
  "updatedAt": {
      "$date": "2022-03-21T14:47:48.516Z"
  },
  "__v": 0
},
{
  "_id": "6239618314768c5c3481237d",
  "name": "AWESOME COLLECTION",
  "tokenSymbol": "AWSC",
  "url": "AWSC.COM",
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
  "logo": "https://www.metamastersmedia.io/wp-content/uploads/2021/10/Captain-Willy.jpg",
  "featuredImage": "https://smallbiztrends.com/ezoimgfmt/media.smallbiztrends.com/2022/02/best-selling-nfts-this-week-850x476.png?ezimgfmt=rs%3Adevice%2Frscb12-1",
  "userId": {
      "$oid": "62385280ce43b8027229a6f0"
  },
  "bannerImage": "https://diablocrossfit.com/wp-content/uploads/2021/11/Screen-Shot-2021-11-14-at-8.23.42-PM.png",
  "networkId": {
      "$oid": "6232e4cd85d228ec132c912c"
  },
  "address": "0xfAA86bB2eA0D35Bb817C81a3339ECC7c72821731",
  "hash": "0x1c5fbc1c058257447265cea67b380d30afb076627ce9fbdc83ad2e87e20fc152",
  "categoryId": {
      "$oid": "61fb808e87629998bd8b895d"
  },
  "isActive": true,
  "createdAt": {
      "$date": "2022-03-22T05:41:23.894Z"
  },
  "updatedAt": {
      "$date": "2022-03-22T05:41:23.894Z"
  },
  "__v": 0
}
  ]




  return (
    <div className={styles.bannerArea}>
      <div className="customContainer">
        <div className={(styles.bannerRow, styles.d_flex)}>
          <div className={styles.bannerContent}>
            <h1>Discover, Collect & Sell Extraordinary NFTs</h1>
          </div>
          {/* <div className={styles.bannerIconBox}>
            <figure>
              <img src="../images/banner-icon.png" />
            </figure>
          </div> */}
        </div>
      </div>
      {
        (trendingList?.length > 0 ? trendingList : trendingListStatic)?.length > 0 ? (
          <div className={styles.bannerSlider}>
            <div>
              <div className="customContainer">
                <Link className={styles.collectionLink} href="#">
                  Trending in all collections
                  <span>
                    <img src="../images/Arrow.svg" />
                  </span>
                </Link>
              </div>
              <Slider {...settings}>
                {
                  (trendingList?.length > 0 ? trendingList : trendingListStatic)?.map((data, i) => data?.slug?<CollectionBox2 data={data} key={i} />:<CollectionBox data={data} key={i} />)
                }
              </Slider>
            </div>
          </div>
        ) : null
      }
    </div>
  );
}

export default BannerSection;
