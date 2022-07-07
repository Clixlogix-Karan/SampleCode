
import RootLayout from '../layout/root.layout';
import GettokenComponent from '../components/getToken/gettoken.component';

export default function createCollection() {


    return (
        <div>
            <RootLayout title='NFT PLATFORM' description='NFT Platform to create and sell NFTs'>

                <GettokenComponent />

            </RootLayout>
        </div>
    )
}
