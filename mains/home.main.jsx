import React from "react";
import BannerSection from "../components/banner/banner.component";
import styles from "../styles/mains/home.module.scss";
import TabsComponent from "../components/tabs/tab.component";
import CollectionsComponent from "../components/tabs/CustomCollection";

function HomeMain() {
  return (
    <div className={styles.home}>
      <BannerSection />
      <TabsComponent />
      <CollectionsComponent title={'Top Collections'} type='top' />
      <CollectionsComponent title={'Top'} type='sell_buy' />
      <CollectionsComponent title={'Hot Collections'} type='hot' />

    
    </div>
  );
}

export default HomeMain;
