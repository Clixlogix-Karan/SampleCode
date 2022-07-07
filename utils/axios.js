import axios from "axios";
const alchemyApiKey = "";

// const baseURL = 'http://localhost:2323/api/v1' 



export const axiosIntance = axios.create({
  baseURL: baseURL,
 
  });

axiosIntance.interceptors.request.use((req) => {
  if (localStorage.getItem('sessionId')) {
    req.headers.Authorization = localStorage.getItem('sessionId');
    req.headers.authentication = localStorage.getItem('sessionId');
  }
  
  return req;
});

export const axiosCryptoExchange = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',

  });

export const axiosAlchemyNfts = axios.create({
  baseURL: `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`,

  });