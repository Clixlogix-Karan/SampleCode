import * as React from "react";
import styles from "../../styles/components/explore/explore.module.scss";
import { Grid } from "@mui/material";
import TabUi from "./TabUi";

const Index = () => {
  return (
    <div className="blueBgPage">
      <div className="top-space-header">
        <div className="customContainer1">
          <div className={styles.exloreArtWork}>
            <div className="row d-flex justify-content-between sm-block">
              <div className="main-heading">
                <h2>Activity</h2>
              </div>
            </div>
            <TabUi/>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Index