import React, { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import styles from "../../styles/components/nftart/nftart.module.scss";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: '#2d2258',
	color: 'white',
	border: '2px solid linear-gradient(45deg, #8b46ff, #c331ff)',
	boxShadow: 24,
	p: 4,
};

const PlaceBidModal = (props) => {
	const [bidPrice, setBidPrice] = useState()
	const [error, setError] = useState("")
	console.log(props?.isModal?.checkBidData)
	useEffect(() => {
		if (props?.isModal) {
			if(props?.isModal?.saleType == 'fixed'){
				//fixed
				setBidPrice(props?.isModal?.price)
			}else{
				//bids
				setBidPrice(props?.isModal?.checkBidData?props?.isModal?.checkBidData?.price:props?.isModal?.topBidData?.price)
			}
		}
		return () => {
			setBidPrice(0)
		}
	}, [props?.isModal])

	const handlePriceInput = (e) => {
		setBidPrice(e.target.value)
	}

	const handleClick = () => {
		setError("")
		if (props?.isModal?.saleType == 'fixed') {
			if (parseFloat(bidPrice) > parseFloat(props?.isModal?.price)) {
				props?.placeBid({ price: bidPrice, itemId: props?.isModal?._id })
			}else {
				setError("Bid price must be more than top bid")
			}
		} else {
			if (parseFloat(bidPrice) > parseFloat(props?.isModal?.topBidData?.price?props?.isModal?.topBidData?.price:props?.isModal?.price)) {
				props?.placeBid({ price: bidPrice, itemId: props?.isModal?._id })
			} else {
				setError("Bid price must be more than top bid")
			}
		}
	}

	return (
		<Modal
			open={props?.isModal}
			onClose={props?.handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<h3>
					{props?.isModal?.checkBidData?'Edit bid':'Place a bid'}
				</h3>

				<div className={styles.textFieldRadius}>
					<FormGroup>
						<FormControl>
							<div className="inputwrp" style={{ marginBottom: 20 }}>
								<label>{props?.isModal?.networkId?.nativeCurrency?.symbol}</label>
								<TextField
									error={error}
									helperText={error}
									fullWidth
									type="number"
									onChange={handlePriceInput}
									inputProps={{ color: '#fff' }}
									autoComplete='off'
									value={bidPrice}
									id="standard-bare2"
									variant="outlined"
									placeholder="0.00"
								/>
							</div>
						</FormControl>
						<Button onClick={handleClick} className="outline-theme" style={{ color: '#fff' }}>
						{props?.isModal?.checkBidData?'Edit bid':'Place bid'}
						</Button>
					</FormGroup>
				</div>

			</Box>
		</Modal>
	)
}

export default PlaceBidModal