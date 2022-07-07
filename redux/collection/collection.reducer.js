// DEFINE INITIAL STATE
const initialState = {
    collections: [],
    allCollections: [],
    trendingCollections: [],
    categories:[],
    status: '',
    loading: null,
}

// REDUCER
const collectionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COLLECTIONS_DATA':
            return {
                ...state,
                collections: action.payload.data,
                status: action.payload.message,
                loading: false
            }
        case 'SET_COLLECTIONS_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        case 'ADD_COLLECTIONS_DATA':
            return {
                ...state,
                allCollections: action.payload,
            }
        case 'TRENDING_COLLECTION_LIST':
            return {
                ...state,
                trendingCollections: action.payload,
            }
            case 'FETCH_CATEGORIES_LIST':
                return {
                    ...state,
                    categories: action.payload
                }
        default: return state
    }
}

// EXPORT DEFAULT EXAMPLE REDUCER
export default collectionsReducer;