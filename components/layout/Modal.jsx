import { Box, Modal } from "@mui/material";
import React from "react";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#2d2258',
    color: 'white',
    border: '2px solid linear-gradient(45deg, #8b46ff, #c331ff)',
    boxShadow: '0px 0px 24px #000',
    p: 4,
    borderRadius:5,
    wordBreak: 'break-all'
};

const closeBtn = {
    position: 'absolute',
    top: -8,
    bottom: 0,
    right: -6,
    background: 'blue',
    height: 18,
    width: 18,
    textAlign: 'center',
    borderRadius: 50,
    boxShadow: '0px 0px 5px #000',
    cursor:'pointer'
}

const Alert = ({textMessage,onClose}) => {
    const [isModal, setModal] = React.useState(textMessage)

    React.useEffect(()=>{
        return ()=>{
            setModal(false)
            onClose()
        }
    },[])

    const handleClose = ()=>{
        onClose()
        setModal(!isModal);
    }

    return (
        <Modal
            open={isModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <i className="fa fa-close" onClick={handleClose} style={closeBtn}></i>
                <h4>{textMessage}</h4>
            </Box>
        </Modal>
    )
}

export default Alert