import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import { collection1155Abi, erc1155RinkbyMarketAbi } from '../contractsABI/abi'
import { dataByte1155 } from '../contractsABI/bytes';
import useMetamask from '../hooks/metamaskHook';
import useTransaction from '../hooks/transaction.hook';
import { nftMarketMultiple } from '../nftConfig';

function Contract() {
    const [collection, setColl] = useState(null);
    const [token, setToken] = useState(null);
    const [item, setItem] = useState(null)
    const { account } = useMetamask();
    const { createCollection, mintToken, createItem } = useTransaction();
    const [checked, setChecked] = useState(1)

    useEffect(() => {
        setColl(null)
        setToken(null)
        setItem(null)
    }, [checked])

    const getType = () => {
        var ele = document.getElementsByName('radios');
        for (let i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                return parseInt(ele[i].value)
            }
        }
    }
    const createColl = () => {
        const type = getType();
        const payload = {
            type,
            name: 'TEDDY',
            symbol: 'TDY'
        }
        createCollection(payload).then(res => {
            console.log('address', res)
            alert('collection created')
            setColl(res)
        }).catch(err => console.log(err))
    }

    const createToken = () => {
        if (!collection) return alert('pls create colllection first')
        const type = getType();
        const payload = {
            type,
            url: 'https://fdn.gsmarena.com/imgroot/news/22/03/samsung-galaxy-a51-with-lightning-port/-344x215/gsmarena_000.jpg',
            col_address: collection,
            quantity: 5
        }
        mintToken(payload).then(res => {
            console.log(res)
            let tokenid = res.events?.TransferSingle?.returnValues?._id;
            if (!tokenid) {
                tokenid = res.events.Transfer.returnValues._tokenId;
            }
            console.log(tokenid)
            setToken(tokenid)
        }).catch(err => console.log(err))
    }

    const createItemm = () => {
        if (!token) return alert('pls create token to create item');
        const type = getType();
        const payload = {
            type,
            price: 20,
            quantity: 5,
            col_address: collection,
            tokenId: token
        }
        createItem(payload).then(res => {
            console.log(res)
            setItem(res)
            alert('item created')
        }).catch(err => console.log(err))

    }
    return (
        <div className='autocode'>
            <div className='autocode__buttons'>
                <button onClick={createColl}>create collection</button>
                {collection && <button onClick={createToken}>create token</button>}
                {token && <button onClick={createItemm}>create item</button>}
            </div>
            <div className='autocode__radio'>
                <span>
                    <input type="radio" name="radios" value="721" onClick={() => setChecked(1)} checked={checked === 1 ? true : false} />
                    <label for="html">ERC721</label>
                </span>
                <span>
                    <input type="radio" name="radios" value="1155" onClick={() => setChecked(2)} checked={checked === 2 ? true : false} />
                    <label for="html">ERC1155</label>
                </span>
            </div>
            <p><b>Wallet Connected:</b> {account ? account : 'FALSE'}</p>
            <p><b>Collection Selected:</b> {collection ? collection : 'to be created'}</p>
            <p><b>Token Generated:</b> {token ? token : 'to be minted'}</p>
            <p><b>Item Block No: </b>{item ? item.blockNumber : ' Item yet not created'}</p>
        </div>
    )
}

export default Contract