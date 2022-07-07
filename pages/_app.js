import AuthProvider from '../contexts/auth.context';
import '../styles/globals.scss';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";
// import { MoralisProvider } from "react-moralis";
function getLibrary(provider) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }) {
  // NOTE 1: AUTH PROVIDER IS AN CONTEXT THAT SERVES COMPONENTS ONLY WHEN USER IS AUTHENTICATED
  return (
    <AuthProvider>
      <Provider store={store}>
        <Web3ReactProvider getLibrary={getLibrary}>
        {/* <MoralisProvider serverUrl='https://yh0j2fpm2g7a.usemoralis.com:2053/server' appId='GAYQXDsce0PPwQ1FuVSL3LGC0WzaBoWjmbHZSd07'> */}
          <Component {...pageProps} />
        {/* </MoralisProvider> */}
        </Web3ReactProvider>
      </Provider>
    </AuthProvider>
  )
}

// EXPORT DEFAULT APP COMPONENT;
export default MyApp;
