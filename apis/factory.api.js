import axios from "axios"
import { axiosIntance, axiosCryptoExchange, axiosAlchemyNfts, axiosNftSearch } from "../utils/axios"


export const createPostReq = (URL, PAYLOAD) => {
    return new Promise(function (resolve, reject) {
        axiosIntance.post(URL, PAYLOAD)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const createGetReq = (URL) => {
    return new Promise(function (resolve, reject) {
        axiosIntance.get(URL)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const createPostReqWithParams = (URL, PAYLOAD) => {
    return new Promise(function (resolve, reject) {
        axiosIntance.post(URL, null, { params: PAYLOAD })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const updatePatchReq = (URL, PAYLOAD, PARAMS) => {
    return new Promise(function (resolve, reject) {
        axiosIntance.put(URL, PAYLOAD, { params: PARAMS })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const getCryptoExchange = (URL, PAYLOAD) => {
    return new Promise(function (resolve, reject) {
        axiosCryptoExchange.get(URL, { params: PAYLOAD })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const getAllNftsAlchemy = (PAYLOAD) => {
    return new Promise(function (resolve, reject) {
        axiosAlchemyNfts.get('/getNFTs/', { params: PAYLOAD })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const getNftSearchAssets = (PAYLOAD) => {
    return new Promise(function (resolve, reject) {
        var options = {
            method: 'GET',
            url: 'https://api.nftport.xyz/v0/search',
            params: { text: PAYLOAD.text },
            headers: {
                'Content-Type': 'application/json',
                Authorization: '7f0f7460-b1da-4bd7-adde-264537b378b9'
            }
        };
        axios.request(options).then(function (response) {
            resolve(response.data);
        }).catch(function (error) {
            reject(error);
        });
    })
}

export const getCollectionInfo = (slug) => {
    return new Promise(function (resolve, reject) {
        var config = {
            method: 'get',
            url: `https://api.opensea.io/api/v1/collection/${slug}`,
            headers: {
                'authority': 'api.opensea.io',
                'accept': '*/*',
                'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
                'origin': 'https://docs.opensea.io',
                'referer': 'https://docs.opensea.io/',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Linux"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
                'x-readme-api-explorer': '4.162.0',
                'Cookie': '__cf_bm=iHd2QoRopd6G2ECRy43FqbNWS7BYlNOYgOLH_dYzqRs-1654825690-0-AQZPU3GVZxkJoJSHRBdeQOlqCMkwGTjh0rakxZ2l6l212sLnPCE9WurOxUi+M7Tdy3AAaiWSWo05HylDA4bFbP8='
            }
        };

        axios.request(config).then(function (response) {
            resolve(response.data);
        }).catch(function (error) {
            reject(error);
        });
    })
}