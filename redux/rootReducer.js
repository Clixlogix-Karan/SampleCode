import {combineReducers} from 'redux';
import collectionsReducer from './collection/collection.reducer';
import exampleReducer from './example/example.reducer';
import faqReducer from './faq/faq.reducer';
import privacyPolicyReducer from './privacy-policy/privacy-policy.reducer';
import termsConditionReducer from './terms-conditions/terms-conditions.reducer';
import walletNetworksReducer from './wallet-networks/wallet-networks.reducer';
import addUserWalletReducer from './add-user-wallet/add-user-wallet.reducer';
import walletReducer from './wallet/wallet.reducer';
import nftItemReducer from './create-nft-item/create-nft-item.reducer';
import userProfileReducer from './profile-settings/user-profile.reducer';

// MERGE ALL REDUCER INTO ROOT REDUCER WITH COMBINE REDUCER MIDDLEWARE
const rootReducer = combineReducers({
    exampleReducer: exampleReducer,
    faqReducer: faqReducer,
    privacyPolicyReducer: privacyPolicyReducer,
    termsConditionReducer: termsConditionReducer,
    walletReducer: walletReducer,
    addUserWalletReducer: addUserWalletReducer,
    walletNetworksReducer: walletNetworksReducer,
    collectionsReducer: collectionsReducer, 
    nftItemReducer: nftItemReducer,
    profileReducer:userProfileReducer
})


export default rootReducer;