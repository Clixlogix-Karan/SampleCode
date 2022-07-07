import React, { useEffect, useRef, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styles from "../../styles/components/profile/profile.module.scss";
import moment from 'moment'
import { Link } from "@mui/material";
import { objGetFromArray } from "../../utils/common";

const ActivityItem = ({ itemDetails }) => {

    // 'Listings','Purchase','Sales','Transfer', 'Burns','Likes','Bids','following'
    const types = ['Listings', 'Purchase', 'Sales', 'Transfer', 'Burns', 'Likes', 'Bids', 'following']

    const FirstRow = () => types[7] == itemDetails?.activityType ? (
        <div className={styles.itemRow}>
            <div className={styles.itemImg}>
                <figure>
                    <img src={objGetFromArray(itemDetails?.followingDetails)?.profilePic ? objGetFromArray(itemDetails?.followingDetails)?.profilePic : "/images/placeholder.png"} />
                </figure>
            </div>
            <div className={styles.iteContent}>
                <p> {(objGetFromArray(itemDetails?.followingDetails)?.name + "")?.length < 10 ? objGetFromArray(itemDetails?.followingDetails)?.name : (objGetFromArray(itemDetails?.followingDetails)?.name + "")?.substring(0, 10) + "..."}</p>
                {/* <p> {(objGetFromArray(itemDetails?.itemDetails)?.name + "")?.length < 10 ? objGetFromArray(itemDetails?.itemDetails)?.name : (objGetFromArray(itemDetails?.itemDetails)?.name + "")?.substring(0, 10) + "..."}</p> */}
            </div>
        </div>
    ) : (
        <div className={styles.itemRow}>
            <div className={styles.itemImg}>
                <figure>
                    <img src={objGetFromArray(itemDetails?.tokenData)?.imageUrl ? objGetFromArray(itemDetails?.tokenData)?.imageUrl : "/images/placeholder.png"} />
                </figure>
            </div>
            <div className={styles.iteContent}>
                <h5> {(objGetFromArray(itemDetails?.collectionDetails)?.name + "")?.length < 10 ? objGetFromArray(itemDetails?.collectionDetails)?.name : (objGetFromArray(itemDetails?.collectionDetails)?.name + "")?.substring(0, 10) + "..."}</h5>
                <p> {(objGetFromArray(itemDetails?.itemDetails)?.name + "")?.length < 10 ? objGetFromArray(itemDetails?.itemDetails)?.name : (objGetFromArray(itemDetails?.itemDetails)?.name + "")?.substring(0, 10) + "..."}</p>
                {itemDetails?.activityType=='Bids'?<h5>status: {itemDetails?.bidStatus}</h5>:null}
            </div>
        </div>
    )

    const FromTo = () => types[7] == itemDetails?.activityType ? (
        <>
            <TableCell>{(objGetFromArray(itemDetails?.followedByInfo)?.name + "")?.length < 10 ? objGetFromArray(itemDetails?.followedByInfo)?.name : (objGetFromArray(itemDetails?.followedByInfo)?.name + "")?.substring(0, 10) + "..."}</TableCell>
            <TableCell>
                <div className={styles.toContent}>
                    <span>{(objGetFromArray(itemDetails?.followingDetails)?.name + "")?.length < 10 ? objGetFromArray(itemDetails?.followingDetails)?.name : (objGetFromArray(itemDetails?.followingDetails)?.name + "")?.substring(0, 10) + "..."}</span>
                    {/* <img src="/images/Done.svg" /> */}
                </div>
            </TableCell>
        </>
    ) :
        <>
            <TableCell>{(objGetFromArray(itemDetails?.fromTransferDetails)?.name + "")?.length < 10 ? objGetFromArray(itemDetails?.fromTransferDetails)?.name : (objGetFromArray(itemDetails?.fromTransferDetails)?.name + "")?.substring(0, 10) + "..."}</TableCell>
            <TableCell>
                <div className={styles.toContent}>
                    <span>{(objGetFromArray(itemDetails?.toTransferDetails)?.name + "")?.length < 10 ? objGetFromArray(itemDetails?.toTransferDetails)?.name : (objGetFromArray(itemDetails?.toTransferDetails)?.name + "")?.substring(0, 10) + "..."}</span>
                    {/* <img src="/images/Done.svg" /> */}
                </div>
            </TableCell>
        </>

    return (
        <TableRow>
            <TableCell>
                <div className="d-flex align-items-center">
                    <span className={styles.trnsfrIcon}>
                        <img src="/images/transfer.png" />
                    </span>
                    <span> {itemDetails?.activityType}</span>
                </div>
            </TableCell>
            <TableCell>
                <FirstRow />
            </TableCell>
            <TableCell>
                <span className={styles.priceContent}>
                    {itemDetails?.activityType=='Bids'?objGetFromArray(itemDetails?.bidDetails)?.price:itemDetails?.price ? itemDetails?.price : '--'} <strong>{objGetFromArray(itemDetails?.networkData)?.nativeCurrency?.symbol ? objGetFromArray(itemDetails?.networkData)?.nativeCurrency?.symbol : '--'}</strong>
                </span>
            </TableCell>
            <TableCell align="center">{itemDetails?.quantity ? itemDetails?.quantity : '--'}</TableCell>
            <FromTo />
            <TableCell>
                <div className={styles.timebx}>
                    <div className="d-flex align-items-center">
                        <span> {moment(itemDetails?.createdAt).fromNow()}</span>
                        {
                            itemDetails?.activityType=='Transfer' && objGetFromArray(itemDetails?.toTransferDetails)?._id ? (
                                <Link href={`/profile/${objGetFromArray(itemDetails?.fromTransferDetails)?._id}`}>
                                    <a className={styles.link}>
                                        <img src="/images/link.png" />
                                    </a>
                                </Link>
                            ) : null
                        }
                        {
                            itemDetails?.activityType=='Sales' && objGetFromArray(itemDetails?.itemDetails)?._id ? (
                                <Link href={`/item/${objGetFromArray(itemDetails?.itemDetails)?._id}`}>
                                    <a className={styles.link}>
                                        <img src="/images/link.png" />
                                    </a>
                                </Link>
                            ) : null
                        }
                    </div>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default ActivityItem