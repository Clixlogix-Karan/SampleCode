import RootLayout from "../../layout/root.layout";
import Activities from '../../components/activities'



export default function explore() {
    return (
        <div>
            <RootLayout title='NFT PLATFORM' description='NFT Platform to create and sell NFTs'>
               <Activities/>
            </RootLayout>
        </div>
    )
}