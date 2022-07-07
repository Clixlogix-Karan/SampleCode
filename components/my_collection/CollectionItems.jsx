import React, { useEffect, useState } from "react";
import styles from "../../styles/components/collections/collection.module.scss";
import { Grid } from "@mui/material";
import CollectionItem from "../tabs/CollectionItem";

const CollectionItems = ({collectionsList}) => {
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
            </>
        </div>
    )
}

export default CollectionItems;