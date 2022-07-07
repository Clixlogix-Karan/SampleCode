export const CREATE_NFT_MARKET_ITEM = '/item-itemToken/add';
export const FETCH_NFT_LIST = '/item/list';
export const FETCH_NFT_MY_LIST = '/item/mylist';
export const CREATE_COLLECTION = '/collection/add';
export const FETCH_COLLECTIONS_USER = '/collection/user-collection-list';
export const CREATE_TOKEN = '/item-itemToken/add';
export const FETCH_ALL_COLLECTIONS = '/collection/list';
export const SEARCH_DATA = '/collection/search';
export const FETCH_COLLECTION = '/collection/collection-detail';
export const FETCH_ITEM_DETAIL = '/item/item-detail';
export const FETCH_NETWORKS = '/network-master/active-networks';
export const UPDATE_NFT_MARKET_ITEM = '/item-itemToken/update';
export const FETCH_CATEGORY_LIST = '/category/active-list';
export const FETCH_SERVICE_CHARGE = '/service-charge';

export const FETCH_COLLECTIONS_BY_TYPE = '/collection/collection-by-type';

//Like/Unlike
export const LIKE_ITEM = '/item/like';
export const UNLIKE_ITEM = '/item/unlike';
export const FETCH_NFT_LIST_LIKE = '/item/liked-items';

//user-profile-apis-endpoints
export const ADD_USER = '/user/add';
export const GET_USER = '/user/detail';
export const UPDATE_USER = '/user/update';
export const USER_FOLLOW = '/user/follow';
export const USER_UNFOLLOW = '/user/unfollow';
export const USER_LOGOUT = '/user/logout';


//Buy NFT item
export const BUY_NFT_ITEM = '/item/buy-item'
export const PLACE_BID_NFT_ITEM = '/item/place-bid-item'
export const CANCEL_BID_NFT_ITEM = '/item/cancel-bid-item'

//Activities
export const ACTIVITY_GET_LIST = `/activity/list`
export const ACTIVITY_GET_MY_LIST = `/activity/my_list`

//explore summary
export const COLLECTION_SUMMARY = `/collection/summary`

//offers
export const GET_OFFERS_LIST = `/offers/list`
export const ACCEPT_OFFERS = `/offers/accept?bidId=`
export const OFFERS_BIDS_LIST = `/offers/item-bids-list`
export const OFFERS_SALES_LIST = `/offers/item-sales-list`

//visiter api 
export const VISITER = '/item/item-visited'

//count notification
export const COUNT_NOTIFY = '/user-notification/unread-notification-count'
//read the notification
export const READ_NOTIFY = '/user-notification/read-notification'
//get /user-notification/list
export const GET_NOTIFY_LIST = '/user-notification/list'

//opensea collections
export const opensea_collection_info = '/open-sea/collection-info'
//opensea collection items
export const opensea_collection_items = '/open-sea/collection-items'

//opensea item details
export const opensea_items = '/open-sea/item-details'