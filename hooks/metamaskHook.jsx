import React, { useCallback, useEffect, useState } from 'react'

function useMetamask() {
    const [account, setAccount] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.on('accountsChanged', accounts => {
                console.log('account changed', accounts[0])
                setAccount(accounts[0]);
            })
            await fetchChainId();
            await getAccount();
            window.ethereum.on('chainChanged', chainId => {
                setChainId(chainId)
            })
            setIsMetamaskInstalled(true)
            setIsLoading(false)
        } else {
            alert('install metamsk to use app')
            setIsLoading(false)
        }
    }, []);

    const getAccount = useCallback(async () => {
        const provider = window.ethereum;
        const account = await provider.request({
            method: 'eth_requestAccounts'
        })
        .then(accounts => {
            setAccount(accounts[0])
            return accounts[0];
        })
        .catch(err => {
            setIsLoading(false)
            return null
        });
        return account
    })

    const signin = useCallback(async () => {
        const provider = window.ethereum;
        const accounts = await provider.request({
            method: 'wallet_requestPermissions',
            params: [{
                eth_accounts: {}
            }]
        }).then(() => provider.request({
            method: 'eth_requestAccounts'
        }))
        setAccount(accounts[0]);
    });

    const handlePersonalSignin = useCallback(async () => {
        console.log('runing')
        const message = [
            "This site is requesting your signature to approve login authorization",
            "I have read and accept the terms and conditions of this app",
            "Please sign me in!"
        ].join("\n\n");
        const provider = window.ethereum;
        const account = await getAccount();
        if(!account) return alert('please connect wallet first')
        await provider.request({
            method: 'personal_sign',
            params: [message, account]
        }).then(() => setAccount(account))
    })

    const getBalance = useCallback(async () => {
        const provider = window.ethereum;
        const account = await getAccount();
        if(!account) return alert('please connect wallet first')
        let balance = await provider.request({
            method: 'eth_getBalance',
            params: [account, 'latest']
        })
        const wei = parseInt(balance, 16);
        const gwei = (wei / Math.pow(10, 9));
        const eth = (gwei / Math.pow(10, 18));
        return { eth, gwei, wei }
    })

    const fetchChainId = useCallback(async () => {
        const provider = window.ethereum;
        const chainId = await provider.request({ method: "eth_chainId" });
        setChainId(chainId)
        return chainId;
    })

    return {
        account, chainId, isMetamaskInstalled, isLoading, getAccount, signin, handlePersonalSignin, getBalance
    }
}

export default useMetamask