import React, { useEffect, useState } from "react";
import styles from "../../styles/components/collections/collection.module.scss";
import { createGetReq } from "../../apis/factory.api";
import { COLLECTION_SUMMARY } from "../../apis/variables";
import { useRouter } from "next/router";
import Link from 'next/link'
import { Grid } from "@mui/material";
import { shortStr } from "../../utils/common";

const CollectionItem = ({ collection }) => {
    const router = useRouter()
    const [summaryDetails, setSummaryDetails] = React.useState({})

    const EthIcon = {
        height: 20,
        width: 12,
        position: 'relative',
        top: 5,
        marginRight: 4
    }

    const PolygonIcon = {
        height: 16,
        width: 16,
        position: 'relative',
        marginRight: 4
    }

    React.useEffect(() => {
        if (!collection?._id && collection.slug) return
        createGetReq(`${COLLECTION_SUMMARY}?id=${collection?._id}`).then(res => {
            setSummaryDetails(res.data)
        })
        return () => setSummaryDetails({})
    }, [collection?._id])

    return (
        !collection.slug?<>
            <div className={styles.imgWrp} style={{ cursor: 'pointer' }} onClick={() => router.push(`/explore/${collection._id}`)}>
                <figure className={styles.mainImg}>
                    <img style={{ width: '100%' }} height={280} src={
                        collection?.featuredImage ? collection?.featuredImage : "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=620&quality=85&auto=format&fit=max&s=9e14d446c2deaf0f343c7455580bed67"}
                    />
                </figure>
                <figure className={styles.btmImg}>
                    <img height={100} width={100} src={collection?.logo ? collection?.logo : "https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg"} />
                </figure>
            </div>
            <div className={styles.collectionDetail}>
                <h3>
                    {(collection.name + "")?.length < 18 ? collection.name : (collection.name + "")?.substring(0, 18) + "..."}
                    {collection?.creatorData?.isVerified && <span>
                        <img src="images/Done.svg" />
                    </span>}
                </h3>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <h4>
                            by
                            <strong><Link href={`/profile/${collection?.creatorData?._id}`}><a>{shortStr(collection?.creatorData?.name||collection?.creatorData?._id)}</a></Link></strong>
                            {collection?.creatorData?.isVerified && <span>
                                <img src="images/Done.svg" />
                            </span>}
                        </h4>
                    </Grid>
                    <Grid item xs={6} style={{ float: 'right' }}>
                        {summaryDetails?.sale_growth!='undefined'?<h4 style={{ marginTop: 10, float: 'right',color:summaryDetails?.sale_growth>=0?'#42CB84':'red'}}><strong>{summaryDetails?.sale_growth>=0?'+':null}{summaryDetails?.sale_growth}%</strong></h4>:null}
                    </Grid>
                </Grid>

                <h4>{(collection.description + "")?.length < 25 ? collection.description : (collection.description + "")?.substring(0, 25) + "..."}</h4>

                <Grid container spacing={1}>
                    <Grid item xs={6}>

                        <h4 style={{ marginTop: 4 }}><strong>Floor Price
                            <span className="brandIcon">
                                {collection?.networkData?.chainId != "0x4" ? <img src={"/images/brandIcon.png"} style={PolygonIcon} /> : <img src={"/images/Group785.png"} style={EthIcon} />}
                            </span>{summaryDetails?.floor_price}</strong></h4>

                    </Grid>
                    <Grid item xs={6} style={{ float: 'right' }}>
                        <h4 style={{ marginTop: 10, float: 'right' }}><img src="/images/Group785.png" style={{ ...EthIcon, top: 0 }} /> <strong>{summaryDetails?.total_volume}</strong></h4>
                    </Grid>
                </Grid>
            </div>
        </>:null
    )
}

export default CollectionItem