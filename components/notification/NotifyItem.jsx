import Link from "next/link";
import React  from "react";


const NotifyItem = ({notifyItem,item,clickHandler})=>{

  const typeIcons = {
    Listings: "fa fa-tags",
    Purchase: "fa fa-diamond",
    Sales: "fa fa-bolt",
    Transfer: "fa fa-exchange",
    Burns: "fa fa-fire",
    Likes: "fa fa-heart",
    Bids: "fa fa-gavel",
    following: "fa fa-check"
}
const prefixUrl = (item?.notification_type =='following')?`/profile/${item?.to_id}`: (item?.notification_type =='approved')?`/nft-art/${item?.content_id}`:`/item/${item?.content_id}`

    return (
        <div className={notifyItem} onClick={()=>clickHandler()}>
        <Link href={prefixUrl}>
          <a>
          <h3>
           <span className={typeIcons[item?.notification_type]?typeIcons[item?.notification_type]:'fa fa-check'}></span> {item?.message}
        </h3>
          </a>
        </Link>
      </div>
    )
}

export default NotifyItem;