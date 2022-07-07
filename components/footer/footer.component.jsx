import React from "react";
import styles from "../../styles/components/footer.module.scss";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Link from 'next/link'

function FooterComponent() {
  return (
    <div className={styles.footer}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="customContainer"
      >
        <Grid item md={3} lg={4} className="ftrcolm">
          <div className={styles.ftrLogo}>
            <Link href="/">
              <img src="/images/ftr-logo.png" alt="Logo" />
            </Link>
            <p>
              © Polygon NFTs _ <span>All rights reserved</span>
            </p>
          </div>
        </Grid>
        <Grid item md={9} lg={8} className="ftrcolm">
          <div className={styles.ftrRIght}>
            <div className={styles.socialLinks}>
              <ul>
                <li>
                  <Link href="">
                    <img src="/images/FB.svg" />
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <img src="/images/TW.svg" />
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <img src="/images/IN.svg" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.ftrLinks}>
              <ul>
                <li>
                  <Link href="">Support</Link>
                </li>
                <li>
                  <Link href="">Contact</Link>
                </li>
                <li>
                  <Link href="/terms-condition">Terms of Conditions</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default FooterComponent;
