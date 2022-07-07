import React from "react";
import styles from "../styles/layout/layout.module.scss";
import Head from "next/head";
import HeaderComponent from "../components/header/header.component";
// import HeaderComponentInner from "../components/header/header-inner.component";
import FooterComponent from "../components/footer/footer.component";

// ROOT LAYOUT IS IMPORTANT FOR SEO TO WORK
function RootLayout({ children, title, description, headerType }) {
  const [profileView, setProfileView] = React.useState(false);
  const [notify, setNotify] = React.useState(false);

  return (
    <div className={styles.layout}>
      <Head>
        <title>{title || "PLEASE PROVIDE TITLE"}</title>
        <meta
          name="description"
          content={description || "PLEASE PROVIDE DESC"}
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </Head>

      <header>
        {/* {headerType === "1" ? <HeaderComponentInner /> : <HeaderComponent />} */}
        <HeaderComponent profileView = {profileView} notify={notify} setNotify={setNotify} setProfileView = {setProfileView}/>
      </header>

      <main className={styles.main}  onMouseEnter={()=>{setNotify(false);setProfileView(false)}}>{children}</main>

      <footer className={styles.footer}>
        <FooterComponent />
      </footer>
    </div>
  );
}

// EXPORT DEFAULT ROOT LAYOUT
export default RootLayout;
