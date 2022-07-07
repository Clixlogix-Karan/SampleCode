// DEFINE INITIAL STATE
const initialState = {
    nftItems: null,
    status: '',
    loading:null,
}

// REDUCER
const nftItemReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_NFT_ITEM':
            return {
                ...state,
                nftItems: action.payload.data,
                status: action.payload.message,
                loading: false
            }
        case 'SET_NFT_ITEM_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        default: return state
    }
}

// EXPORT DEFAULT EXAMPLE REDUCER
export default nftItemReducer;