import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "react-slick";
import Button from "@mui/material/Button";
import styles from "../../styles/components/banner/banner.module.scss";
import { useDispatch, useSelector, useStore } from "react-redux";
import { getTrendingCollectionList } from '../../redux/collection/collection.actions'
import Image from "next/image";
import { createGetReq } from "../../apis/factory.api";
import { COLLECTION_SUMMARY, opensea_collection_info } from "../../apis/variables";
import { useRouter } from "next/router";
import { shortNum } from "../../utils/common";


const CollectionBox2 = ({ data: collection }) => {
    const [Details, setDetails] = React.useState({})
    const router = useRouter()

    React.useEffect(() => {
        if(collection?.slug){
            createGetReq(`${opensea_collection_info}/?slug_id=${collection?.slug}`, ).then(res => {
                //   console.log('asdasd',res?.data?.collection)
                  if(res.data?.collection){
                    setDetails(res.data?.collection)
                  }
                })
        }
      }, [collection?.slug,router])

    // React.useEffect(() => {
    //     if (!collection?._id) return
    //     createGetReq(`${COLLECTION_SUMMARY}?id=${collection?._id}`).then(res => {
    //         setSummaryDetails(res.data)
    //     })
    //     return () => setSummaryDetails({})
    // }, [collection?._id])

    return (
      <div className={styles.sliderWrpBox} style={{ width: 345 }}>
        <div className={styles.cardSlider}>
          <figure>
            {collection?.banner_image_url?<img src={collection?.banner_image_url} width={350} height={350} />:<img src={collection?.image_url} width={350} height={350} />}
          </figure>
          <div className={styles.sliderBtmInfo}>
            <div className={styles.left}>
              <div className={styles.media}>
                <figure>
                  {collection?.image_url?<img width={100} height={100} src={collection?.image_url} />:null}
                </figure>
                <div className={styles.media_body}>
                  <h5>{(collection.name + "")?.length < 13 ? collection.name : (collection.name + "")?.substring(0, 13) + "..."}</h5>
                  <p>
                    by <strong>{("62385280ce43b8027229a6f0")?.substring(0, 13) + "..."}</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.right} style={{cursor:'pointer'}} onClick={()=>router.push(`/explore/slug/${collection?.slug}`)}>
              <Button style={{ paddingTop: 8 }} fullWidth>See {shortNum(Details?.stats?.count)}+ Artwork</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default CollectionBox2