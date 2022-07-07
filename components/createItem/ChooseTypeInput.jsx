import * as React from "react";
import Button from "@mui/material/Button";
import styles from "../../styles/components/chooseType/chooseType.module.scss";
import { useRouter } from "next/router";
import Grid from '@mui/material/Grid'

export default function ChooseTypeInput() {
  const router = useRouter()

  const [checked,setChecked] = React.useState('test2')

console.log('router',router?.query)

  const handleNext = (event) => {
    // const val = document.querySelector('input[name="radio-group"]:checked').id;
    checked=='test1' ? router.push('/create-item/multiple') : router.push('/create-item/single');
  };

  // React.useEffect(()=>{
  //   checked=='test1' ? router.push('/create-item/multiple') : router.push('/create-item/single');

  // },[checked])


  React.useEffect(()=>{
   setChecked(router?.query?.contract_type=='single'?'test2':'test1')
   },[router?.query?.contract_type])

  const firstMenu = {
    maxWidth: '30px',
    borderRadius: '50px'
  }

 

  const label= {
        position: 'relative',
    bottom: 10
  }

const checkActive = {
  backgroundColor:'#6f36ce',
}

  return (
    <div>
       <Grid container spacing={2} style={{width:'100%'}}>
        <Grid item xs={6}  md={6} lg={6}>
            <div className={styles.chooseTypeBox} onClick={(e)=>router.push('/create-item/single')} style={checked=='test2'?checkActive:{}}>
              <div>
                <img src="/images/menubar.png" style={firstMenu} />{" "}
                <span style={label}>Single</span>
              </div>
               <div className={styles.singleType} style={{float:'right',marginTop:-60}}>
                  <div className={styles.checkBox}>
                    <div className="customCheckbox">
                      <input
                        type="radio"
                        id="test2"
                        name="radio-group"
                        checked={checked=='test2'}
                      />
                      <label for="test2" style={{width:10}}></label>
                    </div>
                  </div>
                </div>          
            </div>
        </Grid>
         <Grid item xs={6} md={6} lg={6}>
          <div className={styles.chooseTypeBox} onClick={(e)=>router.push('/create-item/multiple')} style={checked=='test1'?checkActive:{}}>
              <div>
                <img src="/images/multiMenu.png" style={firstMenu} /> {" "}
                <span style={label}>Multiple</span>
              </div>
                <div className={styles.singleType} style={{float:'right',marginTop:-60}}>
                  <div className={styles.checkBox}>
                    <div className="customCheckbox">
                      <input
                        type="radio"
                        id="test1"
                        name="radio-group"
                        checked={checked=='test1'}
                      />
                      <label for="test1" style={{width:10}}></label>
                    </div>
                  </div>
                </div>        
          </div>
        </Grid>
       </Grid>
    </div>
  );
}