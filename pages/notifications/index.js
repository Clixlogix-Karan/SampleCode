import RootLayout from "../../layout/root.layout";
import Notification from "../../components/notification"



export default function Collection() {
    return (
        <div>
            <RootLayout title='NFT PLATFORM' description='NFT Platform to create and sell NFTs'>
               <Notification/>
            </RootLayout>
        </div>
    )
}