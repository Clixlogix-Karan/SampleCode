
import RootLayout from '../../../layout/root.layout';
import CreateCollectionComponent from '../../../components/createCollections/createcollection.coponent';

export default function createCollection() {


    return (
        <div>
            <RootLayout title='NFT PLATFORM' description='NFT Platform to create and sell NFTs'>

                <CreateCollectionComponent />

            </RootLayout>
        </div>
    )
}
