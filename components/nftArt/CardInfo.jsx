import { Grid } from '@mui/material'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import {shortStr} from '../../utils/common'


const CardInfo = ({className,itemData,symbol}) => {
    return (
        <div className={className}>
            <Grid container spacing={2} style={{ width: '100%' }}>
                <Grid item md={1} lg={1} >
                    <img style={{ width: 50, height: 50,borderRadius:100 }} src={itemData?.bidByDetails?.profilePic?itemData?.bidByDetails?.profilePic:"/images/placeholder.png"} />
                </Grid>
                <Grid item md={6} lg={2}>
                    <p>by <br /> <strong><Link href={`/profile/${itemData?.bidByDetails?._id}`}><a>{shortStr(itemData?.bidByDetails?.name?itemData?.bidByDetails?.name:itemData?.bidByDetails?.walletAddress)}</a></Link></strong> </p>
                </Grid>
                <Grid item md={6} lg={4}>
                    <p style={{ textAlign: 'center', color: '#cf46ff' ,paddingTop:10}}> <strong>{itemData?.price}{" "}{symbol}</strong></p>
                </Grid>
                <Grid item md={5} lg={5}>
                    <p style={{ textAlign: 'right',paddingTop:10}}>{moment(itemData?.createdAt).fromNow()}</p>
                </Grid>
            </Grid>
        </div>
    )
}

export default CardInfo