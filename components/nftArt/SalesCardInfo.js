import { Grid } from '@mui/material'
import moment from 'moment'
import React from 'react'
import Link from 'next/link'
import { shortStr } from '../../utils/common'


const SalesCardInfo = ({className,symbol,itemData}) => {
    return (
        <div className={className}>
            <Grid container spacing={2} style={{ width: '100%' }}>
                <Grid item md={1} lg={1} >
                    <img style={{ width: 50, height: 50,borderRadius:100 }} src={itemData?.newBuyerDetails?.profilePic?itemData?.newBuyerDetails?.profilePic:"/images/placeholder.png"} />
                </Grid>
                <Grid item md={6} lg={2}>
                <p>by <br /> <strong><Link href={`/profile/${itemData?.newBuyerDetails?._id}`}><a>{shortStr(itemData?.newBuyerDetails?.name?itemData?.newBuyerDetails?.name:itemData?.newBuyerDetails?.walletAddress)}</a></Link></strong> </p>
                </Grid>
                <Grid item md={6} lg={4}>
                    <p style={{ textAlign: 'center',paddingTop:10,color:'#fff'}}> Floor bid <br/><strong style={{color: '#cf46ff'}}>{itemData?.price} {symbol}</strong></p>
                </Grid>
                <Grid item md={5} lg={5}>
                    <p style={{ textAlign: 'right',paddingTop:10}}>{moment(itemData?.createdAt).fromNow()}</p>
                </Grid>
            </Grid>
        </div>
    )
}

export default SalesCardInfo