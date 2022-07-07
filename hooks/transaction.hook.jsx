import { BigNumber } from 'ethers';
import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
import { collection1155Abi, collectionAbi, erc1155Polygon1155MarketAbi, erc1155RinkbyMarketAbi, polygonMarketAbi, rinkbyMarketAbi } from '../contractsABI/abi';

//Open Bid ABI
import { rinkbyMarketAbiOpenbid, erc1155RinkbyMarketAbiOpenbid, polygonMarketAbiOpenbid, erc1155Polygon1155MarketAbiOpenbid} from '../contractsABI/abi';
//Timed Aucton ABI
import { rinkbyMarketAbiAuction, erc1155RinkbyMarketAbiAuction, polygonMarketAbiAuction, erc1155Polygon1155MarketAbiAuction } from '../contractsABI/abi';

import { dataByte1155, dataBytes } from '../contractsABI/bytes';

//market address for fixed price
import { rinkbyMarketAddressMultiple, rinkbyMarketAddressSingle, polygonMarketAddressMultiple, polygonMarketAddressSingle } from '../nftConfig';
//market address for Open Bid
import { rinkbyMarketAddressOpenbidSingle, rinkbyMarketAddressOpenbidMultiple, polygonMarketAddressOpenbidSingle, polygonMarketAddressOpenbidMultiple } from '../nftConfig';
//market address for Timed Auctions
import { rinkbyMarketAddressAuctionSingle, rinkbyMarketAddressAuctionMultiple, polygonMarketAddressAuctionSingle, polygonMarketAddressAuctionMultiple } from '../nftConfig';

import useMetamask from './metamaskHook';

function useTransaction() {
    const [web3, setWeb3] = useState(null);
    const {account, chainId} = useMetamask();

    useEffect(async() => {
        await window.ethereum.enable()
        const web3 = new Web3(window.ethereum);
        setWeb3(web3)
    }, []);

    const getByte = (type) => {
        if (type === 1155) return dataByte1155;
        return dataBytes;
    }
    const getAbi = (type) => {
        if (type === 1155) return collection1155Abi;
        return collectionAbi
    }
    const getMarketAbi = (type, saleType) => {
        if(saleType == 'fixed'){
            if(chainId === '0x4'){
                if (type === 1155) return erc1155RinkbyMarketAbi;
                return rinkbyMarketAbi
            }else{
                if (type === 1155) return erc1155Polygon1155MarketAbi;
                return polygonMarketAbi
            }
        }
        else if(saleType == 'bid'){
            if(chainId === '0x4'){
                if (type === 1155) return erc1155RinkbyMarketAbiOpenbid;
                return rinkbyMarketAbiOpenbid
            }else{
                if (type === 1155) return erc1155Polygon1155MarketAbiOpenbid;
                return polygonMarketAbiOpenbid
            }
        }
        else if(saleType == 'timed_auction'){
            if(chainId === '0x4'){
                if (type === 1155) return erc1155RinkbyMarketAbiAuction;
                return rinkbyMarketAbiAuction
            }else{
                if (type === 1155) return erc1155Polygon1155MarketAbiAuction;
                return polygonMarketAbiAuction
            }
        }
    }
    const getMarketAddress = (type, saleType) => {
        //0x4 is for renkeby
        if(chainId === '0x4'){
            if(saleType === 'fixed'){
                if(type === 1155) return rinkbyMarketAddressMultiple;
                return rinkbyMarketAddressSingle;
            }
            if(saleType === 'bid'){
                if(type === 1155) return rinkbyMarketAddressOpenbidMultiple;
                return rinkbyMarketAddressOpenbidSingle;
            }
            if(saleType === 'timed_auction'){
                if(type === 1155) return rinkbyMarketAddressAuctionMultiple;
                return rinkbyMarketAddressAuctionSingle;
            }
        }else{
            if(saleType === 'fixed'){
                if(type === 1155) return polygonMarketAddressMultiple;
                return polygonMarketAddressSingle;
            }
            if(saleType === 'bid'){
                if(type === 1155) return polygonMarketAddressOpenbidMultiple;
                return polygonMarketAddressOpenbidSingle;
            }
            if(saleType === 'timed_auction'){
                if(type === 1155) return polygonMarketAddressAuctionMultiple;
                return polygonMarketAddressAuctionSingle;
            }
        }
    }
    const createCollection = ({ type, name, symbol }) => {
        if(!type) throw new Error('pls provide type - 721 or 1155 in number')
        if(!name) throw new Error('pls provide collection name')
        if(!symbol) throw new Error('pls provide collection address')
        
        const ABI = getAbi(type);
        const DATABYTE = getByte(type)
        const collectionContract = new web3.eth.Contract(ABI);
        const payload = {
            data: DATABYTE,
            arguments: [name, symbol]
        }
        const parameter = {
            from: account,
            gas: 5000000
        }
        return new Promise((resolve, reject) => {
            collectionContract.deploy(payload).send(parameter, (err, transactionHash) => {
                console.log(transactionHash)
            }).then((newContractInstance) => {
                resolve(newContractInstance?.options?.address)
            }).catch(err => reject(err));
        })
    };

    const mintToken = ({ type, col_address, url, quantity, collectionABI }) => {
        if(!type) throw new Error('pls provide type - 721 or 1155 in number')
        if(!url) throw new Error('pls provide a unique art url to mint token')
        if(!col_address) throw new Error('pls provide collection address to create item')
        if(type === 1155 && !quantity) throw new Error('pls provide quantity for 1155 to mint tokens')

        // const ABI = getAbi(type);
        const nftContract = new web3.eth.Contract(collectionABI, col_address)
        if (type === 721) {
            return new Promise((resolve, reject) => {
                nftContract.methods.mint(url).send({
                    from: account,
                    gas: '500000'
                })
                    .then((receipt) => {
                        if(!receipt.events || !receipt.events.Transfer){
                            reject("Token Id can't be accessed , token might have minted already")
                            return
                        }
                        resolve(receipt)
                    })
                    .catch(err => reject(err))
            })
        };
        return new Promise((resolve, reject) => {
            nftContract.methods.mint(quantity, url).send({
                from: account,
                gas: '500000'
            })
                .then((receipt) => {
                    if(!receipt.events || !receipt.events?.TransferSingle){
                        reject("Token Id can't be accessed , token might have minted already")
                        return
                    }
                    resolve(receipt)
                })
                .catch(err => reject(err))
        })
    };

    const createItem = async ({type, col_address, price, tokenId, quantity, royalty, saleType}) => {
        if(!type) throw new Error('pls provide type - 721 or 1155 in number')
        if(!col_address) throw new Error('pls provide collection address to create item')
        if(!tokenId)  throw new Error('pls provide tokenId reference to create Item')
        if(!price) throw new Error('pls provide price of a item')
        if(!saleType) throw new Error('pls provide payment mode for a item')
        if(type === 1155 && !quantity) throw new Error('pls provide quantity for 1155 item creation')
        if(royalty === '') throw new Error('pls provide royalty value')
        
        const calculated_royalty = (parseFloat(royalty)/100) * parseFloat(price)

        const Market = getMarketAddress(type, saleType);
        console.log('market_address', Market)
        const MarketAbi = getMarketAbi(type, saleType)
        console.log(MarketAbi)
        const nftMarketContract = new web3.eth.Contract(MarketAbi, Market)
        price = price.toString();
        tokenId = tokenId || 1;
        
        if(saleType === 'fixed'){
            if(type === 1155){
                return new Promise((resolve, reject) => {
                    nftMarketContract.methods.createMarketItemFixed(col_address, parseInt(tokenId), web3.utils.toWei(price).toString(16), web3.utils.toWei(calculated_royalty.toString()).toString(16), parseInt(quantity)).send({
                        from: account,
                        gas: '500000',
                    }).then((receipt) => resolve(receipt)).catch(err => reject(err))
                })
            };
            return new Promise((resolve, reject) => {
                nftMarketContract.methods.createMarketItemFixed(col_address, parseInt(tokenId), web3.utils.toWei(price).toString(16), web3.utils.toWei(calculated_royalty.toString()).toString(16)).send({
                    from: account,
                    gas: '500000',
                }).then((receipt) => resolve(receipt)).catch(err => reject(err))
            })
        }
        else if(saleType === 'bid'){
            if(type === 1155){
                return new Promise((resolve, reject) => {
                    nftMarketContract.methods.createMarketItemBid(col_address, parseInt(tokenId), web3.utils.toWei(calculated_royalty.toString()).toString(16), parseInt(quantity)).send({
                        from: account,
                        gas: '500000',
                    }).then((receipt) => resolve(receipt)).catch(err => reject(err))
                })
            };
            return new Promise((resolve, reject) => {
                nftMarketContract.methods.createMarketItemOpenbid(col_address, parseInt(tokenId), web3.utils.toWei(calculated_royalty.toString()).toString(16)).send({
                    from: account,
                    gas: '500000',
                }).then((receipt) => resolve(receipt)).catch(err => reject(err))
            })
        }
        else if(saleType === 'timed_auction'){
            if(type === 1155){
                return new Promise((resolve, reject) => {
                    nftMarketContract.methods.createMarketItemAuction(col_address, parseInt(tokenId), web3.utils.toWei(calculated_royalty.toString()).toString(16), parseInt(quantity)).send({
                        from: account,
                        gas: '500000',
                    }).then((receipt) => resolve(receipt)).catch(err => reject(err))
                })
            };
            return new Promise((resolve, reject) => {
                nftMarketContract.methods.createMarketItemAuction(col_address, parseInt(tokenId), web3.utils.toWei(calculated_royalty.toString()).toString(16)).send({
                    from: account,
                    gas: '500000',
                }).then((receipt) => resolve(receipt)).catch(err => reject(err))
            })
        }
    };

    const createMarketSale = async ( type, price, marketItemId, saleType) => {
        if(!marketItemId)  throw new Error('pls provide tokenId reference to create Item')
        if(!price) throw new Error('pls provide price of a item')
        if(!type) throw new Error('pls provide type')
        if(!saleType) throw new Error('pls provide payment mode for a item')
        price = price.toString();

        const Market = getMarketAddress(type, saleType);
        console.log('market_address', Market)
        const MarketAbi = getMarketAbi(type, saleType)
        console.log(MarketAbi)
        const nftMarketContract = new web3.eth.Contract(MarketAbi, Market)
        // web3.eth.getGasPrice().then((result) => {
        //     console.log(web3.utils.fromWei(result, 'gwei'))
        // })

        if(saleType === 'fixed'){
            if(type === 1155){
                return new Promise((resolve, reject) => {
                    nftMarketContract.methods.createMarketSale( parseInt(marketItemId)).send({
                        from: account,
                        // gas: web3.eth.estimateGas(),
                        gas: '500000',
                        value: web3.utils.toWei(price).toString(16)
                    }).then((receipt) => resolve(receipt)).catch(err => reject(err))
                })
            };
            return new Promise((resolve, reject) => {
                nftMarketContract.methods.createMarketSale( parseInt(marketItemId)).send({
                    from: account,
                    gas: '500000',
                    value: web3.utils.toWei(price).toString(16)
                }).then((receipt) => resolve(receipt)).catch(err => reject(err))
            })
        }
        else if(saleType === 'bid'){
            if(type === 1155){
                return new Promise((resolve, reject) => {
                    nftMarketContract.methods.createMarketSale( parseInt(marketItemId)).send({
                        from: account,
                        // gas: web3.eth.estimateGas(),
                        gas: '500000',
                        value: web3.utils.toWei(price).toString(16)
                    }).then((receipt) => resolve(receipt)).catch(err => reject(err))
                })
            };
            return new Promise((resolve, reject) => {
                nftMarketContract.methods.createMarketSale( parseInt(marketItemId)).send({
                    from: account,
                    gas: '500000',
                    value: web3.utils.toWei(price).toString(16)
                }).then((receipt) => resolve(receipt)).catch(err => reject(err))
            })
        }
        else if(saleType === 'timed_auction'){
            if(type === 1155){
                return new Promise((resolve, reject) => {
                    nftMarketContract.methods.createMarketSale( parseInt(marketItemId)).send({
                        from: account,
                        // gas: web3.eth.estimateGas(),
                        gas: '500000',
                        value: web3.utils.toWei(price).toString(16)
                    }).then((receipt) => resolve(receipt)).catch(err => reject(err))
                })
            };
            return new Promise((resolve, reject) => {
                nftMarketContract.methods.createMarketSale( parseInt(marketItemId)).send({
                    from: account,
                    gas: '500000',
                    value: web3.utils.toWei(price).toString(16)
                }).then((receipt) => resolve(receipt)).catch(err => reject(err))
            })
        }
    };

    const transferNft = async ({collection_address, contractABI, from_address, type, tokenId, quantity}) => {
        if(!from_address) throw new Error('pls provide from address to create item')
        if(!tokenId)  throw new Error('pls provide tokenId reference to create Item')
        if(!type) throw new Error('pls provide type')
        
        const contractInstance = new web3.eth.Contract(contractABI, collection_address)
        contractInstance.options.address = collection_address
        
        if(type === 1155){
            return new Promise((resolve, reject) => {
                contractInstance.methods.safeTransferFrom(from_address, account, parseInt(tokenId), parseInt(quantity)).send({
                    from: account,
                    gas: '500000',
                }).then((receipt) => resolve(receipt)).catch(err => reject(err))
            })
        };
        return new Promise((resolve, reject) => {
            contractInstance.methods.transferFrom(from_address, account, parseInt(tokenId)).send({
                from: account,
                gas: '500000',
            }).then((receipt) => resolve(receipt)).catch(err => reject(err))
        })
    };

    const approveTransfer = async ({collection_address, contractABI, type, tokenId, quantity}) => {
        if(!tokenId)  throw new Error('pls provide tokenId reference to create Item')
        if(!type) throw new Error('pls provide type')
        
        const contractInstance = new web3.eth.Contract(contractABI, collection_address)
        contractInstance.options.address = collection_address
        if(type === 1155){
            return new Promise((resolve, reject) => {
                contractInstance.methods.setApprovalForAll(account, true).send({
                    from: account,
                    gas: '500000',
                }).then((receipt) => resolve(receipt)).catch(err => reject(err))
            })
        };
        return new Promise((resolve, reject) => {
            contractInstance.methods.setApprovalForAll(account, true).send({
                from: account,
                gas: '500000',
            }).then((receipt) => resolve(receipt)).catch(err => reject(err))
        })
    };

    return {createCollection, mintToken, createItem, approveTransfer, transferNft, createMarketSale};
}

export default useTransaction