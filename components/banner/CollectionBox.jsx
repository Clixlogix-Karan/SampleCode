import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "react-slick";
import Button from "@mui/material/Button";
import styles from "../../styles/components/banner/banner.module.scss";
import { useDispatch, useSelector, useStore } from "react-redux";
import { getTrendingCollectionList } from '../../redux/collection/collection.actions'
import Image from "next/image";
import { createGetReq } from "../../apis/factory.api";
import { COLLECTION_SUMMARY } from "../../apis/variables";
import { useRouter } from "next/router";


const CollectionBox = ({ data: collection }) => {
    const [summaryDetails, setSummaryDetails] = React.useState({})
    const router = useRouter()
    React.useEffect(() => {
        if (!collection?._id) return
        createGetReq(`${COLLECTION_SUMMARY}?id=${collection?._id}`).then(res => {
            setSummaryDetails(res.data)
        })
        return () => setSummaryDetails({})
    }, [collection?._id])

    return (
      <div className={styles.sliderWrpBox} style={{ width: 345 }}>
        <div className={styles.cardSlider}>
          <figure>
            <Image src={collection?.featuredImage} width={400} height={400} />
          </figure>
          <div className={styles.sliderBtmInfo}>
            <div className={styles.left}>
              <div className={styles.media}>
                <figure>
                  <Image width={100} height={100} src={collection?.logo} />
                </figure>
                <div className={styles.media_body}>
                  <h5>{(collection.name + "")?.length < 13 ? collection.name : (collection.name + "")?.substring(0, 13) + "..."}</h5>
                  <p>
                    by <strong>{("62385280ce43b8027229a6f0")?.substring(0, 13) + "..."}</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.right} style={{cursor:'pointer'}} onClick={()=>router.push(`/explore/${collection?._id}`)}>
              <Button style={{ paddingTop: 8 }} fullWidth>See {summaryDetails?.total_items}+ Artwork</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default CollectionBox