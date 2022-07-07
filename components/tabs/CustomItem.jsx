import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import styles from "../../styles/components/collections/collection.module.scss";
import { createPostReq } from "../../apis/factory.api";
import { FETCH_ALL_COLLECTIONS, FETCH_COLLECTIONS_USER } from "../../apis/variables";
import { useSelector, useDispatch } from 'react-redux';
import { setCollection } from '../../redux/collection/collection.actions';
import { useRouter } from "next/router";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Grid } from "@mui/material";
import Image from "next/image";
import Link from 'next/link'
import CollectionItem from "./CollectionItem";

const CustomItem = ({collectionsList,loadMore,pageNumber,newValues}) => {
    return (
        <div className={styles.collectionArea}>
            <>
                <Grid container spacing={2}>
                    {collectionsList?.map((collection, i) => {
                        return (
                            <Grid item style={{ width: '100%' }} md={3} sm={6} lg={3} key={collection._id}>
                                <div className={styles.collectionItemWrp} >
                                    <CollectionItem collection={collection} />
                                </div>
                            </Grid>
                        );
                    })}
                </Grid>
                {
                    newValues?.length >= 4 ?
                        (
                            <div className={styles.morecollectionRow}>
                                <Button color="secondary" onClick={() => loadMore(pageNumber + 1)}>Explore more collection</Button>
                            </div>
                        ) : null
                }
            </>
        </div>
    )
}

export default CustomItem;