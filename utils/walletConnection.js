import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

export const walletConnection = async() => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const addressArray = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "Wallet linked",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "Unable to connect" + err.message,
        };
      }
    }
}

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "Metamask Wallet Connected",
          };
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask using the top right button.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
};

export function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        return accounts
      });
    }
}


//web3-react wallet connectors

export const CoinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/68cb0b7366094c86a33a961c52c78886`,
  appName: "NFT MarketPlace",
  supportedChainIds: [1, 3, 4, 5, 42, 13881, 80001],
});

export const WalletConnect = new WalletConnectConnector({
  rpcUrl: `https://mainnet.infura.io/v3/68cb0b7366094c86a33a961c52c78886}`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

export const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 13881, 80001]
});

export const connectFortmatic = ()=>{

}