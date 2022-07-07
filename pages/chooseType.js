
import RootLayout from '../layout/root.layout';
import ChooseTypeComponent from '../components/chooseType/choosetype.component';

export default function createCollection() {


    return (
        <div>
            <RootLayout title='NFT PLATFORM' description='NFT Platform to create and sell NFTs'>

                <ChooseTypeComponent />

            </RootLayout>
        </div>
    )
}
