// DEFINE INITIAL STATE
const initialState = {
    value: null,
    loading: false
}

// REDUCER
const faqReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_FAQ_VALUE':
            return {
                ...state,
                value: action.payload,
                loading: false
            }
        case 'SET_FAQ_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        default: return state
        
    }
}

// EXPORT DEFAULT EXAMPLE REDUCER
export default faqReducer;