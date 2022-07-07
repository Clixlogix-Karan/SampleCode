import React from 'react'
import {Grid,TextField} from '@mui/material'
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const PropertyInput=({styles,value,index,addProperty,removeProperty,handleChange})=>{

	return (
			<div className="" style={{width:'100%'}} style={{marginBottom:10}}>
				<Grid container spacing={2} style={{width:'100%'}}>
					<Grid item xs={5}>
							<TextField
							size='small'
		                    placeholder={'Type'}
		                    onChange={handleChange}
		                    InputLabelProps={{style: { color: '#fff' }  }}
		                    fullWidth
		                      name="type"
		                    
		                    variant="filled" 
		                    value={value?.type}
		                    aria-label="minimum height"
		                  />
					</Grid>
					<Grid item xs={6}>
						<TextField
						size='small'
		                    placeholder="Name"
		                    name="name"
		                    InputLabelProps={{style: { color: '#fff' }  }}
		                    fullWidth
		                    onChange={handleChange}
		                    variant="filled" 
		                    value={value?.name}
		                    aria-label="minimum height"
		                  />
					</Grid>
					<Grid item xs={1} style={{paddingTop:30}}>
						{index==0?<span onClick={addProperty} className={styles.addRoundBtn}><AddIcon /></span>:null}						
						{index>0?<span onClick={()=>removeProperty(index)} className={styles.addRoundBtn}><RemoveIcon /></span>:null}						
					</Grid>
				</Grid>
			</div>
		)
}

export default PropertyInput