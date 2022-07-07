export const setWallet = (payload) => {
    return async(dispatch) => {
        dispatch({
            type: 'SET_WALLET',
            payload: payload
        })
    }
}

export const setWalletStatus = (payload) => {
    return async(dispatch) => {
        dispatch({
            type: 'SET_WALLET_STATUS',
            payload: payload
        })
    }
}