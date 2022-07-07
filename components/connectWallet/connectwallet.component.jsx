import React, { useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import styles from "../../styles/components/connectWallet/connectWallet.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/auth.context";
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { CoinbaseWallet, WalletConnect, Injected, connectFortmatic} from '../../utils/walletConnection'

export default function ConnectWallet() {
  const [walletAddress, setWalletAdress] = useState(null);
  const [isWalletConnected, setWalletConnected] = useState(false);
  var walletDetails = useSelector(state => state.walletReducer)
  const dispatch = useDispatch()
  const router = useRouter()
  const {createUser} = useAuth()
  const { active, chainId, account, activate} = useWeb3React();

  const connectToWallet = async()=>{
    try{
      setWalletConnected(true)
      await activate(Injected)
    }catch(e){
      console(e)
    }
  }

  useEffect(async()=>{
    if(account && isWalletConnected){
        createUser(account)
    }
  },[account,isWalletConnected])

  return (
    <div className="blueBgPage">
      <div className="top-space-header">
        <div className="customContainer">
          <div className="connectWalletWrp">
            <div className={styles.connectWalletWrp}>
              <div className="main-heading">
                <h2>
                  You need on Ethereum wallet <br /> to use Polygon NFTs
                </h2>
                <p className="subHeading">
                  Connect with one of our available
                  <strong className="drakBlueText "> wallet</strong> providers
                  or create a new one.
                </p>
              </div>
              <div className={styles.polygonListingRow}>
                <div className={styles.bg1}>
                  <div className={styles.list} onClick={connectToWallet}>
                    <div className={styles.logo}>
                      <figure>
                        <img src="/images/listimg.png" />
                      </figure>
                    </div>
                    <div className={styles.rightAngle}>
                      <ChevronRightIcon />
                    </div>
                  </div>
                </div>
                <div className={styles.bg2}>
                  <div className={styles.list} onClick={() => { activate(CoinbaseWallet) }}>
                    <div className={styles.logo}>
                      <figure>
                        <img src="/images/listimg2.png" />
                      </figure>
                    </div>
                    <div className={styles.rightAngle}>
                      <ChevronRightIcon />
                    </div>
                  </div>
                </div>

                <div className={styles.bg3}>
                  <div className={styles.list} onClick={() => { activate(WalletConnect) }}>
                    <div className={styles.logo}>
                      <figure>
                        <img src="/images/listimg3.png" />
                      </figure>
                    </div>
                    <div className={styles.rightAngle}>
                      <ChevronRightIcon />
                    </div>
                  </div>
                </div>
                <div className={styles.bg4}>
                  <div className={styles.list} onClick={connectFortmatic}>
                    <div className={styles.logo}>
                      <figure>
                        <img src="/images/listimg4.png" />
                      </figure>
                    </div>
                    <div className={styles.rightAngle}>
                      <ChevronRightIcon />
                    </div>
                  </div>
                </div>
              </div>
              <div className="themeBtn ">
                <Button className="themeBg apply ">Show More</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
