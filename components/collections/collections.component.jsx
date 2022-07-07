import React from "react";
import Button from "@mui/material/Button";
import styles from "../../styles/components/collections/collection.module.scss";
import { createPostReq, createPostReqWithParams } from "../../apis/factory.api";
import { FETCH_ALL_COLLECTIONS, FETCH_COLLECTIONS_USER } from "../../apis/variables";
import { useAuth } from "../../contexts/auth.context.jsx";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux';
import { setCollection } from '../../redux/collection/collection.actions';

export default function CollectionsComponent() {
  const { user } = useAuth();
  const [loading , setLoading] = React.useState(false)
  const dispatch = useDispatch();
  const collectionsList = useSelector(state => state.collectionsReducer.allCollections)
  const router = useRouter();

  React.useEffect(async()=>{
    const payload = {
      pageNo: 1,
      limit: 40
    }
    createPostReq(FETCH_ALL_COLLECTIONS, payload).then(res => {
      console.log(res.data)
      dispatch(setCollection(res.data))
      setLoading(false)
    }).catch(err => console.log(err))
  }, [])

  //`https://i.pravatar.cc/450?img=${i + 1}
  return (
    <div className={styles.collectionArea}>
      <ul>
        {collectionsList?.map((collection, i) => {
          return (
            <li className={styles.collectionItemWrp} key={collection.id + i}>
              <div className={styles.imgWrp} style={{cursor: 'pointer'}} onClick={() => router.push(`/explore/${collection._id}`)}>
                <figure className={styles.mainImg}>
                  <img src={
                     "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=620&quality=85&auto=format&fit=max&s=9e14d446c2deaf0f343c7455580bed67"
                  } />
                </figure>
                <figure className={styles.btmImg}>
                  <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/DBB7/production/_122074265_hi071843849.jpg" />
                </figure>
              </div>
              <div className={styles.collectionDetail}>
                <h3>
                  {collection.name}
                  <span>
                    <img src="images/Done.svg" />
                  </span>
                </h3>
                <h4>
                  by
                  <strong>{collection.auth}</strong>
                  <span>
                    <img src="images/Done.svg" />
                  </span>
                </h4>
                <p>{collection.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.morecollectionRow}>
        <Button color="secondary">Explore more collection</Button>
      </div>
    </div>
  );
}
