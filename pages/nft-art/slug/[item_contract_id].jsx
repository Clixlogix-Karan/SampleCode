
import RootLayout from '../../../layout/root.layout';
import NftArtComponent from '../../../components/nftArt/slug.nftArt.component.jsx';


export default function nftArt() {


    return (
        <div>
            <RootLayout title='NFT PLATFORM' description='NFT Platform to create and sell NFTs'>
                <NftArtComponent />
            </RootLayout>
        </div>
    )
}