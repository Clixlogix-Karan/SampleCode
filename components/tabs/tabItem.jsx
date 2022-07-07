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

export default function TabItem({ value,activeTab,lastdays }) {

  const collectionsList = useSelector(state => state.collectionsReducer.allCollections)
  const loading = useSelector(state => state.collectionsReducer.loading)
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1)
  const [newValues, setNewValues] = useState([])
  const router = useRouter()


  useEffect(async () => {
    if(value){
       setPageNumber(1)
      setNewValues([])
    let payload = {
      pageNo: 1,
      limit: 4,
      categoryId: value,
      lastdays
    }

    if(lastdays==0){
      delete payload.lastdays
    }

    setTimeout(()=>{
      createPostReq(FETCH_ALL_COLLECTIONS, payload).then(res => {
        // console.log('asdasd',res.data)
        // console.log("new",collectionsList.concat(newArr))
        setNewValues(res.data)
        dispatch(setCollection(res.data))
      }).catch(err => console.log(err))
    },500)
  }
    return ()=>{
      setPageNumber(1)
      dispatch(setCollection([]))
      setNewValues([])
    }
  }, [value,lastdays])

  const loadMore = async(num)=>{
    setPageNumber(num)
    let payload = {
      pageNo: num,
      limit: 4,
      categoryId: value,
      lastdays
    }
    if(lastdays==0){
      delete payload.lastdays
    }

    createPostReq(FETCH_ALL_COLLECTIONS, payload).then(res => {
      // console.log('asdasd',res.data)
      const newArr = res.data
      // console.log("new",collectionsList.concat(newArr))
      setNewValues(res.data)
      if (res.data?.length > 0) {
        dispatch(setCollection(collectionsList.concat(newArr)))
      }
    }).catch(err => console.log(err))
  }
  



  return (
    <div className={styles.collectionArea}>
      {
        !loading ? (
          <>
            <Grid container spacing={2}>
              {collectionsList?.map((collection, i) => {
                return (
                  <Grid item style={{width:'100%'}} md={3} sm={6} lg={3}  key={collection._id}>
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
        ) : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size={60} thickness={2} />
        </Box>
      }


    </div>
  );
}