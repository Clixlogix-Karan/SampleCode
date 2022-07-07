// DEFINE INITIAL STATE
const initialState = {
    walletAddress: null,
    status: '',
    userId: null,
    loading:null,
}

// REDUCER
const addUserWalletReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_ADD_USER_WALLET_DETAILS':
            return {
                ...state,
                walletAddress: action.payload.data.walletAddress,
                status: action.payload.message,
                userId: action.payload.data._id,
                loading: false
            }
        case 'SET_ADD_USER_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        default: return state
    }
}

// EXPORT DEFAULT EXAMPLE REDUCER
export default addUserWalletReducer;