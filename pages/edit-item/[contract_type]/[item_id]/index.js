
import RootLayout from '../../../../layout/root.layout';
import CreateItemComponent from '../../../../components/createItem/createitem.component';

export default function createItem() {

    return (
        <div>
            <RootLayout title='NFT PLATFORM' description='NFT Platform to create and sell NFTs'>

                <CreateItemComponent edit={true}/>

            </RootLayout>
        </div>
    )
}
