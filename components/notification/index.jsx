import React, { useEffect, useState } from "react";
import styles from "../../styles/components/collections/collection.module.scss";
import { createGetReq, updatePatchReq } from "../../apis/factory.api";
import { FETCH_COLLECTIONS_USER, GET_NOTIFY_LIST, READ_NOTIFY } from "../../apis/variables";
// import CollectionItems from "./CollectionItems";
import { Box, Button } from "@mui/material";
import { useAuth } from "../../contexts/auth.context";
import Link from "next/link";
import { useRouter } from 'next/router'
import NotifyItem from "./NotifyItem";

const Index = () => {

  const [notifications, setNotification] = useState([])
  const { user } = useAuth()
  const router = useRouter()
  const [pageNumber, setPageNumber] = useState(1)
  const [disableMore, setDisable] = useState(0)

  useEffect(async () => {
    if (user?._id) {
      setDisable(true)
      createGetReq(`${GET_NOTIFY_LIST}?pageNo=${pageNumber}&limit=10`).then((res) => {
        if (res?.data && res?.data[0]?.data?.length>0) {
          setNotification(notifications.concat(res?.data[0]?.data))
          setDisable(false)
        }else{
          setDisable(true)
        }
      }).catch(e => {
        setDisable(true)
        console.log(e.response.data)
      })
    } else {
      router.push("/connectWallet")
    }
  }, [user,pageNumber])

  const clickHandler = () => {
    updatePatchReq(READ_NOTIFY).catch((e) => {
      console.log(e?.response)
    })
  }

  const NotificationsList = () => {
    if (notifications?.length > 0) {
      return (
        <div>
          {
            notifications?.map((item) => <NotifyItem notifyItem={styles.notifyItem} clickHandler={clickHandler} item={item} key={item?._id} />)
          }
        </div>
      )
    }
    return <div>
      <h3 style={{color:'white',textAlign:'center',marginTop:50}}>No notification yet!</h3>
    </div>
  }

  return (
    <Box className="collectionsTab">
      <div className="blue-bg">
        <div className="customContainer1" style={{ marginTop: 80 }}>
          <div className="main-heading">
            <h2>Notifications</h2>
          </div>
        </div>
        <div className="customContainer1" style={{ height: '100vh' }}>
          <NotificationsList />
          {
          notifications?.length > 0 && notifications?.length >= 10 ? (
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