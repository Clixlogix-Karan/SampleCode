// DEFINE INITIAL STATE
const initialState = {
    value: null,
    loading: false
}

// REDUCER
const privacyPolicyReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_PRIVACY_VALUE':
            return {
                ...state,
                value: action.payload,
                loading: false
            }
        case 'SET_PRIVACY_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        default: return state
        
    }
}

// EXPORT DEFAULT EXAMPLE REDUCER
export default privacyPolicyReducer;