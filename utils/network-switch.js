export const switchNetwork = async (chain) => {
    const provider = window.ethereum;
    if (!provider) {
        alert("Metamask is not installed, please install!");
    }
    const chainId = await provider.request({ method: "eth_chainId" });
    // Mumbai: 0x13881, rinkby : 0x4
    if (chainId !== chain) {
        try {
            await provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chain }],
            });
            // alert("You have successfully switched to new Test network")
            alert("Metamask Test Network Changed")
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                alert("This network is not available in your metamask, please add it")
            }
            alert("Failed to switch to the network")
        }
    }
    return chain
}

export const fetchNetwork = async() => {
    const provider = window.ethereum;
    if (!provider) {
        console.log("Metamask is not installed, please install!");
    }
    const chainId = await provider.request({ method: "eth_chainId" });
    return chainId;
}