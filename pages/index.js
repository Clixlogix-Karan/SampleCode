import { useSelector } from 'react-redux';
import { useAuth } from '../contexts/auth.context';
import RootLayout from '../layout/root.layout';
import HomeMain from '../mains/home.main';


export default function Home() {
  // EXAMPLE OF CALLIN USER HOOK AND EXTRACTING STATE FROM REDUX
  const { user } = useAuth();
  const exRed = useSelector(state => state.exampleReducer);
  console.log(user, exRed);

  return (
    <div>
      <RootLayout title='NFT PLATFORM' description='NFT Platform to create and sell NFTs'>
        <HomeMain />
      </RootLayout>
    </div>
  )
}























