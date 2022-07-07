// DEFINE INITIAL STATE
const initialState = {
    activeNetworks: {},
    status: '',
    loading:null,
}

// REDUCER
const walletNetworksReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_ACTIVE_NETWORKS':
            return {
                ...state,
                activeNetworks: action.payload.data,
                status: action.payload.message,
                loading: false
            }
        case 'SET_ACTIVE_NETWORKS_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        default: return state
    }
}

// EXPORT DEFAULT EXAMPLE REDUCER
export default walletNetworksReducer;