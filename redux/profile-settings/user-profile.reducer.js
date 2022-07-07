// DEFINE INITIAL STATE
const initialState = {
    userId: null,
    loading: false,
    updated:false
}

// REDUCER
const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ADD_USER_DETAILS':
            // console.log('action',action)
            return {
                ...state,
                ...action.payload?.data,
                loading: false,
                updated:false
            }

        case 'SET_UPDATE_USER_DETAILS':
            return {
                ...state,
                loading: false,
                updated:true
            }
        case 'SET_ADD_USER_LOADING':
            return {
                ...state,
                loading: action.payload,
                updated:false
            }
        default: return state
    }
}

// EXPORT DEFAULT EXAMPLE REDUCER
export default userProfileReducer;