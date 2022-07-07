// DEFINE INITIAL STATE
const initialState = {
    value: null
}

// REDUCER
const exampleReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_VALUE':
            return {
                ...state,
                value: action.payload
            }
        default: return state
    }
}

// EXPORT DEFAULT EXAMPLE REDUCER
export default exampleReducer;