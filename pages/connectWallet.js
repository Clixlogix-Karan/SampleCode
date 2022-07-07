
import RootLayout from '../layout/root.layout';
import ConnectWallet from '../components/connectWallet/connectwallet.component';

export default function ConnectWalletPage() {

    return (
        <div>
            <RootLayout title='NFT PLATFORM' description='NFT Platform to create and sell NFTs'>

                <ConnectWallet />

            </RootLayout>
        </div>
    )
}
