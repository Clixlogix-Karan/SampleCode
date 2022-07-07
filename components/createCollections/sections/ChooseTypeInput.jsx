import * as React from "react";
import Button from "@mui/material/Button";
import styles from "../../../styles/components/chooseType/chooseType.module.scss";
import { useRouter } from "next/router";
import Grid from '@mui/material/Grid'

export default function ChooseTypeInput() {
  const router = useRouter()

//   const [checked,setChecked] = React.useState(router?.query?.contract_type=='erc-721'?'test2':'test1')

console.log('router',router?.query)

//   const handleNext = (event) => {
//     // const val = document.querySelector('input[name="radio-group"]:checked').id;
//     checked=='test1' ? router.push('/create-item/multiple') : router.push('/create-item/single');
//   };

//   React.useEffect(()=>{
//     checked=='test1' ? router.push('/create-collection/erc-1155') : router.push('/create-collection/erc-721');

//   },[checked])


//   React.useEffect(()=>{
//    setChecked(router?.query?.contract_type=='erc-721'?'test2':'test1')
//    },[router?.query?.contract_type])

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

const checkIcon = {
    width: 10,
    color: 'rgb(115 89 206)',
    background: '#fff',
    padding: 10,
    borderRadius: 50,
    position: 'relative',
    top: 19,
    fontSize: 20,
    width:10,
    cursor: "pointer",
}

const uncheckIcon = {
    width: 10,
    color: 'rgb(47 35 90)',
    background: 'rgb(47 35 90)',
    padding: 10,
    borderRadius: 50,
    position: 'relative',
    top: 19,
    fontSize: 20,
    width:10,
    cursor: "pointer",
}

  return (
    <div>
       <Grid container spacing={2} style={{width:'100%',marginBottom:30}}>
        <Grid item xs={6}  md={6} lg={6}>
            <div className={styles.chooseTypeBox} onClick={()=>router.push('/create-collection/erc-721')}  style={router?.query?.contract_type=='erc-721'?checkActive:{}}>
              <div>
                <img src="/images/menubar.png" style={firstMenu} />{" "}
                <span style={label}>Single</span>
              </div>
               <div className={styles.singleType} style={{float:'right',marginTop:-60}}>
                  <div className={styles.checkBox}>
                    <div className="customCheckbox">
                      {/* <input
                        type="radio"
                        id="test2"                        
                        name="radio-group"
                        defaultChecked={true}
                        onChange={()=>console.log("asd")}
                      />
                      <label htmlFor="test2" style={{width:10}}></label> */}
                      <label style={router?.query?.contract_type=='erc-721'?checkIcon:uncheckIcon}><i className="fa fa-check"></i></label>
                    </div>
                  </div>
                </div>          
            </div>
        </Grid>
         <Grid item xs={6} md={6} lg={6}>
          <div className={styles.chooseTypeBox} onClick={()=>router.push('/create-collection/erc-1155')}  style={router?.query?.contract_type=='erc-1155'?checkActive:{}}>
              <div>
                <img src="/images/multiMenu.png" style={firstMenu} /> {" "}
                <span style={label}>Multiple</span>
              </div>
                <div className={styles.singleType} style={{float:'right',marginTop:-60}}>
                  <div className={styles.checkBox}>
                    <div className="customCheckbox">
                      {/* <input
                         type="radio"
                         id="test1"                        
                         name="radio-group"
                         defaultChecked={false}
                        onChange={()=>console.log("asd22")}

                      />
                      <label htmlFor="test1" style={{width:10}}></label> */}
                      <label style={router?.query?.contract_type=='erc-1155'?checkIcon:uncheckIcon}><i className="fa fa-check"></i></label>
                    </div>
                  </div>
                </div>        
          </div>
        </Grid>
       </Grid>
    </div>
  );
}