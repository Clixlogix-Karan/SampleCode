import React, { useEffect, useState } from "react";
import styles from "../../styles/components/collections/collection.module.scss";
import { createPostReqWithParams } from "../../apis/factory.api";
import { FETCH_COLLECTIONS_USER } from "../../apis/variables";
import CollectionItems from "./CollectionItems";
import { Box, Button } from "@mui/material";
import { useAuth } from "../../contexts/auth.context";
import Link from "next/link";
import {useRouter} from 'next/router'

const Index = () => {

  const [collectionsList, setCollections] = useState([])
  const { user } = useAuth()
  const router = useRouter()
  const [pageNumber, setPageNumber] = useState(1)
  const [disableMore, setDisable] = useState(0)

  useEffect(async () => {
    if(user?._id){
      setDisable(true)
      createPostReqWithParams(FETCH_COLLECTIONS_USER,{
        userId:user?._id,
        pageNo:pageNumber,
        limit:4
      }).then(res => {
        if(res?.data?.length>0){
          setDisable(false)
        setCollections(collectionsList.concat(res?.data))
        }else{
          setDisable(true)
        }
      }).catch(err =>{ setDisable(true);console.log(err)})
    }else{
      router.push("/connectWallet")
    }
  }, [user,pageNumber])

  return (
    <Box className="collectionsTab">
    <div className="blue-bg">
      <div className="customContainer" style={{marginTop:80}}>
        <div className="main-heading">
          <h2>My Collections</h2>
          <h4 style={{ color: 'white' }}>Create, curate, and manage collections of unique NFTs to share and sell.</h4>
          <Link href="/create-collection/erc-721"><Button className={styles.createBtn}>Create collections</Button></Link>
        </div>
      </div>
      <div className="customContainer" style={collectionsList?.length==0?{height:'100vh'}:{}}>
        <CollectionItems collectionsList={collectionsList} />
        {
          collectionsList?.length > 0 && collectionsList?.length >= 4 ? (
            !disableMore && <div onClick={() => setPageNumber(pageNumber+1)} className={styles.morecollectionRow}>
              <Button color="secondary">Load More</Button>
            </div>
          ) : null
        }
      </div>
    </div>
    </Box>
  )
}

export default Index