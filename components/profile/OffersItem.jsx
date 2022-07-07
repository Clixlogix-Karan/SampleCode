const { TableRow, TableCell, Button } = require("@mui/material")
import moment from "moment";
import Link from "next/link";
import styles from "../../styles/components/profile/profile.module.scss";


const OffersItem = ({item,acceptCallback}) => {

    const shortStr=(name)=>(name+"")?.length < 10 ? name : (name + "")?.substring(0, 10) + "..."

    return (
        <TableRow>
            <TableCell>
                <div className={styles.itemRow}>
                    <div className={styles.itemImg}>
                        <figure>
                            <img src={item?.tokenData?.imageUrl?item?.tokenData?.imageUrl:"/images/placeholder.png"} />
                        </figure>
                    </div>
                    <div className={styles.iteContent}>
                        <h5>{shortStr(item?.collectionDetails?.name)}</h5>
                        <p>{shortStr(item?.itemDetails?.name)}</p>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <span className={styles.priceContent}>
                    {item?.price?item?.price:'---'} <strong>{item?.networkData?.nativeCurrency?.symbol}</strong>
                </span>
            </TableCell>
            <TableCell>$818.10</TableCell>
            <TableCell>99.7% below</TableCell>
            <TableCell>
                <span className={styles.blueText}>
                    <Link href={`/profile/${item?.bidByDetails?._id}`}><a>{item?.bidByDetails?.name?shortStr(item?.bidByDetails?.name):item?.bidByDetails?.walletAddress?shortStr(item?.bidByDetails?.walletAddress):"---"}</a></Link>
                </span>
            </TableCell>
            <TableCell>---</TableCell>
            <TableCell>{item?.createdAt?moment(item?.createdAt).fromNow():'---'}</TableCell>
            <TableCell>{item?.status=='pending'?<Button onClick={()=>acceptCallback(item)}>Accept</Button>:item?.status}</TableCell>
        </TableRow>
    )
}

export default OffersItem