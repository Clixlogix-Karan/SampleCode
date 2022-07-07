import React, { useEffect } from 'react'
import Web3 from 'web3'
import { collection1155Abi, erc1155RinkbyMarketAbi } from '../contractsABI/abi'
import { dataByte1155 } from '../contractsABI/bytes';
import useMetamask from '../hooks/metamaskHook';
import useTransaction from '../hooks/transaction.hook';
import { nftMarketMultiple } from '../nftConfig';

function Contract() {
    const tokenURI = "https://www.metamastersmedia.io/wp-content/uploads/2021/10/Captain-Willy.jpg";
    const address = "0x71c1813C410468C4D3A2a979E562a71D3b4759F7";
    const collection_address = "0x698f24ABF88Fb8992A8391F5eCa3C638149B807A";
    const quantity = 5;

    const {account, chainId, isLoading, getBalance, handlePersonalSignin, isMetamaskInstalled} = useMetamask();
    const {createCollection} = useTransaction()

    !isLoading && console.log(account, chainId)

    const create1155Collection = async() => {
        await window.ethereum.enable()
        const web3 = new Web3(window.ethereum);
        const ABI = collection1155Abi;
        const DATABYTE = dataByte1155
        const collectionContract = new web3.eth.Contract(ABI);
        const payload = {
            data: DATABYTE,
            arguments: ['ERC1155 COLLECTION', 'COLSYM']
        }
        const parameter = {
            from: address,
            gas: 5000000
        };
        collectionContract.deploy(payload).send(parameter, (err, transactionHash) => {
            console.log(transactionHash)
        }).then((newContractInstance) => {
            console.log('collection address', newContractInstance?.options?.address)
            alert('collection created')
        }).catch(err => console.log(err));
    };

    const mint1155Token = async () => {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable()
        const nftContract = new web3.eth.Contract(collection1155Abi, collection_address)
        nftContract.methods.mint(quantity, tokenURI).send({
            from: address,
            gas: '500000'
        })
            .then((receipt) => {
                console.log('token receipt', receipt, receipt.blockHash)
                alert('token minted')
            })
            .catch(err => console.log(err))
    };

    const create1155Item = async () => {
        const Market1155 = nftMarketMultiple;
        const Market1155Abi = erc1155RinkbyMarketAbi;
        await window.ethereum.enable()
        const web3 = new Web3(window.ethereum);
        const nftMarketContract = new web3.eth.Contract(Market1155Abi, Market1155)
        const price = 5;
        const tokenId = 1;

        nftMarketContract.methods.createMarketItem(collection_address, parseInt(tokenId), parseInt(price), parseInt(quantity)).send({
            from: address,
            gas: '500000',
            value: '100000000000'
        }).then((receipt) => {
            console.log('item receipt', receipt, receipt.blockHash)
            alert('item created')
        }).catch(err => console.log(err))
    };

    const payload = {
        type: 1155,
        name: 'TEDDY',
        symbol: 'TDY'
    }
    return (
        <div>
            <button onClick={create1155Collection}>create collection</button>
            <button onClick={mint1155Token}>mint token</button>
            <button onClick={create1155Item} >create item</button>
            <button onClick={async() => console.log(await getBalance())}>get balance</button>
            <button onClick={handlePersonalSignin}>sign in</button>
            <button onClick={() => createCollection(payload)}>create auto collection</button>
            <p>Connected: {account ? 'TRUE': 'FALSE'}</p>
        </div>
    )
}

export default Contract