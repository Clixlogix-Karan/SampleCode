import * as React from "react";
import Button from "@mui/material/Button";
import styles from "../../styles/components/chooseType/chooseType.module.scss";
import { useRouter } from "next/router";

export default function ChooseTypeComponent() {
  const router = useRouter()

  const [checked,setChecked] = React.useState('test2')

  const handleNext = (event) => {
    // const val = document.querySelector('input[name="radio-group"]:checked').id;
    checked=='test1' ? router.push('/create-collection/1155') : router.push('/create-collection/721');
  };
  return (
    <div>
      <div className="blueBgPage choose-bg">
        <div className="top-space-header">
          <div className="customContainer">
            <div className={styles.chooseTypeContainer}>
              <div className="main-heading">
                <div className="chooseTypeMain">
                  <div className={styles.chooseHeadingBox}>
                    <h2>Choose Type</h2>
                    <p className="subHeading">
                      Choose “Single” for one of a kind or “Multiple” if you
                      want to sell one collectible multiple times
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.chooseTypeRow}>
                <div className={styles.singleType}>
                  <div className={styles.checkBox}>
                    <div className="customCheckbox">
                      <input
                        type="radio"
                        id="test2"
                        onClick={(e)=>setChecked('test2')}
                        name="radio-group"
                        checked={checked=='test2'}
                      />
                      <label for="test2"></label>
                    </div>
                  </div>
                  <div className={styles.typeImgWrp}>
                    <figure>
                      <img src="/images/single-color.png" />
                    </figure>
                  </div>
                  <div className={styles.typeText}>
                    <h3>Single</h3>
                    <p>
                      If you want to highlight the uniqueness and individuality
                      of your item
                    </p>
                  </div>
                </div>
                <div className={styles.multipleType}>
                  <div className={styles.checkBox}>
                    <div className="customCheckbox">
                      <input type="radio" id="test1"  onClick={(e)=>setChecked('test1')} checked={checked=='test1'} name="radio-group" />
                      <label for="test1"></label>
                    </div>
                  </div>
                  <div className={styles.typeImgWrp}>
                    <figure>
                      <img src="/images/mul-colors.png" />
                    </figure>
                  </div>
                  <div className={styles.typeText}>
                    <h3>Multiple</h3>
                    <p>
                      If you want to share your item with a large number of
                      community members
                    </p>
                  </div>
                </div>
              </div>
              <div className="themeBtn next text-center mt-60">
                <a onClick={handleNext} className="themeBg apply">
                  Next
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}