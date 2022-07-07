import React, { useEffect, useState } from "react";
import styles from "../../styles/components/collections/collection.module.scss";
import { createPostReq } from "../../apis/factory.api";
import { FETCH_COLLECTIONS_BY_TYPE } from "../../apis/variables";
import { useRouter } from "next/router";
import CustomItem from './CustomItem'
import { MenuItem, Select } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CustomCollection = ({ title, type }) => {

    const [collectionsList, setCollections] = useState([
        {
            "_id": "628b425d208ca7e9db1bc4a6",
            "name": "rtex",
            "tokenSymbol": "asd",
            "url": "asdas",
            "description": "aasdas",
            "logo": "https://nft-paltform.s3.us-west-1.amazonaws.com/unnamed.png",
            "featuredImage": "https://nft-paltform.s3.us-west-1.amazonaws.com/bu637emw49181.jpg",
            "bannerImage": "https://nft-paltform.s3.us-west-1.amazonaws.com/FGLEnY7VQAELqaw.jpg",
            "networkId": "6232e4cd85d228ec132c912c",
            "address": "0x79E344e9b54FbBAE151B08943cD99C44dAD5d923",
            "hash": "0xe0b045bf1419915f2eaf85fce5bf1b821dd5f02713b7170676b563fd11c35626",
            "collectionType": "single",
            "contractABI": [
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_symbol",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor",
                    "signature": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_approved",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "_tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event",
                    "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_operator",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "bool",
                            "name": "_approved",
                            "type": "bool"
                        }
                    ],
                    "name": "ApprovalForAll",
                    "type": "event",
                    "signature": "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_to",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "_tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event",
                    "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "signature": "0x095ea7b3"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x70a08231"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getApproved",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x081812fc"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        }
                    ],
                    "name": "isApprovedForAll",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0xe985e9c5"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_tokenURI",
                            "type": "string"
                        }
                    ],
                    "name": "mint",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "signature": "0xd85d3d27"
                },
                {
                    "inputs": [],
                    "name": "name",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x06fdde03"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "ownerOf",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x6352211e"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "approved",
                            "type": "bool"
                        }
                    ],
                    "name": "setApprovalForAll",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "signature": "0xa22cb465"
                },
                {
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x95d89b41"
                },
                {
                    "inputs": [],
                    "name": "tokenCount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x9f181b5e"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "tokenURI",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0xc87b56dd"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "signature": "0x23b872dd"
                }
            ],
            "creatorData": {
                "_id": "62441a81159f7d21c3a53af2",
                "isVerified": false,
                "email": "asd@asd.com",
                "name": "newuse",
                "profilePic": "https://nft-paltform.s3.us-west-1.amazonaws.com/unnamed (1).png"
            },
            "networkData": {
                "_id": "6232e4cd85d228ec132c912c",
                "chainId": "0x4",
                "chainName": "RINKEBY TESTNET",
                "nativeCurrency": {
                    "name": "ETHEREUM",
                    "symbol": "ETH",
                    "decimals": 1
                },
                "rpcUrls": [],
                "blockExploreUrls": [],
                "iconUrls": []
            }
        },
        {
            "_id": "628b3fbb208ca7e9db1bc481",
            "name": "fffgg",
            "tokenSymbol": "asda",
            "url": "asdas.cin",
            "description": "asldkjlk",
            "logo": "https://nft-paltform.s3.us-west-1.amazonaws.com/image1.png",
            "featuredImage": "https://nft-paltform.s3.us-west-1.amazonaws.com/image1 (1).png",
            "bannerImage": "https://nft-paltform.s3.us-west-1.amazonaws.com/image2.jpg",
            "networkId": "6232e4cd85d228ec132c912c",
            "address": "0x86815Ad6a3cf217b278D8769C36F269b9f28B6c3",
            "hash": "0x29f8d2f6711eff0e9740aaaad7cc97fa4f1ffe8f78ff93ab532ca080d58b7027",
            "collectionType": "multiple",
            "contractABI": [
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_symbol",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor",
                    "signature": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_operator",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "bool",
                            "name": "_approved",
                            "type": "bool"
                        }
                    ],
                    "name": "ApprovalForAll",
                    "type": "event",
                    "signature": "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_operator",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_to",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "_id",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "TransferSingle",
                    "type": "event",
                    "signature": "0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x00fdd58e"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        }
                    ],
                    "name": "isApprovedForAll",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0xe985e9c5"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "_uri",
                            "type": "string"
                        }
                    ],
                    "name": "mint",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "signature": "0x77097fc8"
                },
                {
                    "inputs": [],
                    "name": "name",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x06fdde03"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "safeTransferFrom",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "signature": "0x0febdd49"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "approved",
                            "type": "bool"
                        }
                    ],
                    "name": "setApprovalForAll",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "signature": "0xa22cb465"
                },
                {
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x95d89b41"
                },
                {
                    "inputs": [],
                    "name": "tokenCount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x9f181b5e"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "uri",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x0e89341c"
                }
            ],
            "creatorData": {
                "_id": "62441a81159f7d21c3a53af2",
                "isVerified": false,
                "email": "asd@asd.com",
                "name": "newuse",
                "profilePic": "https://nft-paltform.s3.us-west-1.amazonaws.com/unnamed (1).png"
            },
            "networkData": {
                "_id": "6232e4cd85d228ec132c912c",
                "chainId": "0x4",
                "chainName": "RINKEBY TESTNET",
                "nativeCurrency": {
                    "name": "ETHEREUM",
                    "symbol": "ETH",
                    "decimals": 1
                },
                "rpcUrls": [],
                "blockExploreUrls": [],
                "iconUrls": []
            }
        },
        {
            "_id": "628b3f50208ca7e9db1bc47a",
            "name": "Adasd",
            "tokenSymbol": "asd-asdas",
            "url": "asdasd.com",
            "description": "asdasd",
            "logo": "https://nft-paltform.s3.us-west-1.amazonaws.com/image2.png",
            "featuredImage": "https://nft-paltform.s3.us-west-1.amazonaws.com/image2.png",
            "bannerImage": "https://nft-paltform.s3.us-west-1.amazonaws.com/image2.jpg",
            "networkId": "6232e4cd85d228ec132c912c",
            "address": "0x248280a301b204dc9307ba829F1f6d620ff736b1",
            "hash": "0x5f49f30d7a3ac863c284844b940340bdb08be62766b95eb06abec1f518d25019",
            "collectionType": "single",
            "contractABI": [
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_symbol",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor",
                    "signature": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_approved",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "_tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event",
                    "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_operator",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "bool",
                            "name": "_approved",
                            "type": "bool"
                        }
                    ],
                    "name": "ApprovalForAll",
                    "type": "event",
                    "signature": "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_to",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "_tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event",
                    "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "signature": "0x095ea7b3"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x70a08231"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getApproved",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x081812fc"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        }
                    ],
                    "name": "isApprovedForAll",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0xe985e9c5"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_tokenURI",
                            "type": "string"
                        }
                    ],
                    "name": "mint",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "signature": "0xd85d3d27"
                },
                {
                    "inputs": [],
                    "name": "name",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x06fdde03"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "ownerOf",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x6352211e"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "approved",
                            "type": "bool"
                        }
                    ],
                    "name": "setApprovalForAll",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "signature": "0xa22cb465"
                },
                {
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x95d89b41"
                },
                {
                    "inputs": [],
                    "name": "tokenCount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x9f181b5e"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "tokenURI",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0xc87b56dd"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "signature": "0x23b872dd"
                }
            ],
            "creatorData": {
                "_id": "62441a81159f7d21c3a53af2",
                "isVerified": false,
                "email": "asd@asd.com",
                "name": "newuse",
                "profilePic": "https://nft-paltform.s3.us-west-1.amazonaws.com/unnamed (1).png"
            },
            "networkData": {
                "_id": "6232e4cd85d228ec132c912c",
                "chainId": "0x4",
                "chainName": "RINKEBY TESTNET",
                "nativeCurrency": {
                    "name": "ETHEREUM",
                    "symbol": "ETH",
                    "decimals": 1
                },
                "rpcUrls": [],
                "blockExploreUrls": [],
                "iconUrls": []
            }
        },
        {
            "_id": "628b3e12208ca7e9db1bc473",
            "name": "sakldjklasjdl",
            "tokenSymbol": "th-ed",
            "url": "www.gggol.com",
            "description": "asklsdjljlkjlkj",
            "logo": "https://nft-paltform.s3.us-west-1.amazonaws.com/image1 (1).png",
            "featuredImage": "https://nft-paltform.s3.us-west-1.amazonaws.com/NFT.jpeg (1).jpg",
            "bannerImage": "https://nft-paltform.s3.us-west-1.amazonaws.com/NFT.jpeg (1).jpg",
            "networkId": "6232e4cd85d228ec132c912c",
            "address": "0x9eAC7c88AdF8b89893b5c6fde096e092c2918530",
            "hash": "0x45c963de4ccd280cad1cfd92d1a06e8d5a04d87041c3f9d5c73b2aa4e21af83c",
            "collectionType": "single",
            "contractABI": [
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_symbol",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor",
                    "signature": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_approved",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "_tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event",
                    "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_operator",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "bool",
                            "name": "_approved",
                            "type": "bool"
                        }
                    ],
                    "name": "ApprovalForAll",
                    "type": "event",
                    "signature": "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_to",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "_tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event",
                    "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "signature": "0x095ea7b3"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x70a08231"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getApproved",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x081812fc"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        }
                    ],
                    "name": "isApprovedForAll",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0xe985e9c5"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_tokenURI",
                            "type": "string"
                        }
                    ],
                    "name": "mint",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "signature": "0xd85d3d27"
                },
                {
                    "inputs": [],
                    "name": "name",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x06fdde03"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "ownerOf",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x6352211e"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "approved",
                            "type": "bool"
                        }
                    ],
                    "name": "setApprovalForAll",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "signature": "0xa22cb465"
                },
                {
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x95d89b41"
                },
                {
                    "inputs": [],
                    "name": "tokenCount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0x9f181b5e"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "tokenURI",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true,
                    "signature": "0xc87b56dd"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "signature": "0x23b872dd"
                }
            ],
            "creatorData": {
                "_id": "62441a81159f7d21c3a53af2",
                "isVerified": false,
                "email": "asd@asd.com",
                "name": "newuse",
                "profilePic": "https://nft-paltform.s3.us-west-1.amazonaws.com/unnamed (1).png"
            },
            "networkData": {
                "_id": "6232e4cd85d228ec132c912c",
                "chainId": "0x4",
                "chainName": "RINKEBY TESTNET",
                "nativeCurrency": {
                    "name": "ETHEREUM",
                    "symbol": "ETH",
                    "decimals": 1
                },
                "rpcUrls": [],
                "blockExploreUrls": [],
                "iconUrls": []
            }
        }
    ])

    const [pageNumber, setPageNumber] = useState(1)
    const [newValues, setNewValues] = useState([])
    const [days, setDays] = useState(7)
    const [sellBuy, setSellBuy] = useState('seller')

    useEffect(async () => {
        if (type) {
            setPageNumber(1)
            setNewValues([])
            let payload = {
                pageNo: 1,
                limit: 4,
                listType: type,
                sellBuyType:sellBuy,
                days
            }

            createPostReq(FETCH_COLLECTIONS_BY_TYPE, payload).then(res => {
                // console.log('asdasd',res.data)
                // console.log("new",collectionsList.concat(newArr))
                setCollections(res?.data)
                setNewValues(res.data)
            }).catch(err => console.log(err))
        }
        return () => {
            setPageNumber(1)
            setCollections([])
            setNewValues([])
        }
    }, [type,days,sellBuy])

    const loadMore = async (num) => {
        setPageNumber(num)
        let payload = {
            pageNo: num,
            limit: 4,
            listType: type,
            sellBuyType:sellBuy,
            days
        }

        createPostReq(FETCH_COLLECTIONS_BY_TYPE, payload).then(res => {
            // console.log('asdasd',res.data)
            const newArr = res.data
            // console.log("new",collectionsList.concat(newArr))
            setNewValues(res.data)
            if (res.data?.length > 0) {
                setCollections(collectionsList.concat(newArr))
            }
        }).catch(err => console.log(err))
    }

    return (
        <div className="blue-bg">
            <div className="customContainer">
                <div className="main-heading tCollectionsselect">
                    {
                        type=='top'?(
                            <h3  style={{ color: 'white' }}><span className="responsive-mb-20">{title} </span>
                            <Select
                            label="Top last"
                            IconComponent={KeyboardArrowDownIcon}
                            className="dayTabBtn"
                            inputProps={{ 'aria-label': 'Without label' }}
                            onChange={(e)=>setDays(e.target.value)}
                            defaultValue={7}
                        >
                            <MenuItem value={7}>
                            <span><strong>7 Days</strong></span>
                            </MenuItem>
                            <MenuItem value={10}>
                                <span><strong>10 Days</strong></span>
                            </MenuItem>
                            <MenuItem value={15}>
                                <span><strong>15 Days</strong></span>
                            </MenuItem>
                        </Select></h3>
                        ):null
                    }
                    {
                        type=='sell_buy'?(
                            <h3 className="d-flex-mobile sellinSelect" style={{ color: 'white' }}>{title}
                             {" "}
                            <Select
                            label="Sell buy"
                            IconComponent={KeyboardArrowDownIcon}
                            className="dayTabBtn"
                            inputProps={{ 'aria-label': 'Without label' }}
                            defaultValue={'seller'}
                            onChange={(e)=>setSellBuy(e.target.value)}
                        >
                            <MenuItem value={'seller'}>
                                <span>Seller</span>
                            </MenuItem>
                            <MenuItem value={'buyer'}>
                                <span>Buyer</span>
                            </MenuItem>
                        </Select>
                           <span className="inspan"> in</span>
                            {" "}
                             <Select
                            label="Top last"
                            IconComponent={KeyboardArrowDownIcon}
                            className="dayTabBtn"
                            inputProps={{ 'aria-label': 'Without label' }}
                            defaultValue={7}
                            onChange={(e)=>setDays(e.target.value)}
                        >
                            <MenuItem value={7}>
                            <span><strong>7 Days</strong></span>
                            </MenuItem>
                            <MenuItem value={10}>
                                <span><strong>10 Days</strong></span>
                            </MenuItem>
                            <MenuItem value={15}>
                                <span><strong>15 Days</strong></span>
                            </MenuItem>
                        </Select></h3>
                        ):null
                    }
                   

                   {
                        type=='hot'?<h3 style={{ color: 'white' }}>{title}</h3>:null
                    }
                </div>
            </div>
            <div className="containerFluid ExpCollections">
                <CustomItem collectionsList={collectionsList} loadMore={loadMore} pageNumber={pageNumber} newValues={newValues} />
            </div>
        </div>
    )
}

export default CustomCollection