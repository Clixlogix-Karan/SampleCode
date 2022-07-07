import RootLayout from "../../layout/root.layout";
import MyCollection from '../../components/my_collection'



export default function Collection() {
    return (
        <div>
            <RootLayout title='NFT PLATFORM' description='NFT Platform to create and sell NFTs'>
               <MyCollection/>
            </RootLayout>
        </div>
    )
}