// DEFINE INITIAL STATE
const initialState = {
    address: null,
    status: ''
}

// REDUCER
const walletReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_WALLET':
            return {
                ...state,
                address: action.payload.address,
                status: action.payload.status
            }
        case 'SET_WALLET_STATUS':
            return {
                ...state,
                status: action.payload.status,
                address: action.payload.address
            }
        default: return state
    }
}

// EXPORT DEFAULT EXAMPLE REDUCER
export default walletReducer;