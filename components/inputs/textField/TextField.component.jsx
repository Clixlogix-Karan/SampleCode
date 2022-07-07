import React from 'react';
import TextField from "@mui/material/TextField";
import { createTheme,withStyles,makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
   root: {
    '& label.Mui-focused': {
      color: '#ffffff',
      borderRadius:'10px'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#5b4184',
      borderRadius:'10px'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '2px solid #5b4184',
        borderRadius:'10px'
      },
      '&:hover fieldset': {
        border: '2px solid #5b4184',
        borderRadius:'10px'
      },
      '& .Mui-focused fieldset': {
        border: '2px solid #5b4184',
        borderRadius:'10px'
      },
      '& .MuiInputLabel-formControl':{
        border: '2px solid #5b4184',
        color: '#5b4184',
      },'& .MuiInputLabel-outlined':{
        border: '2px solid #5b4184',
        color: '#5b4184',
      },'& label':{
        color: '#5b4184',
      },'& .placeholder':{
        color: '#5b4184',
      }
    }
  },
     cssFocused: {},
}));

const TextFieldComponent = ({ onChange, formInput, isError, kei, label, helpText }) => {
    const handleChange = (e) => {
        let value = {...formInput, [kei]: e.target.value};
        onChange(value)
    }

    const muiTheme = createTheme({
  overrides: {
    MuiInputLabel: {
      outlined: {
        "&$focused": {
          color: "#3f3fa0",
        },
      },
    },
  },
})

//     const CssTextField = useStyles({
//   root: {
//     '& label.Mui-focused': {
//       color: '#5b4184',
//       borderRadius:'10px'
//     },
//     '& .MuiInput-underline:after': {
//       borderBottomColor: '#5b4184',
//       borderRadius:'10px'
//     },
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         border: '2px solid #5b4184',
//         borderRadius:'10px'
//       },
//       '&:hover fieldset': {
//         border: '2px solid #5b4184',
//         borderRadius:'10px'
//       },
//       '& .Mui-focused fieldset': {
//         border: '2px solid #5b4184',
//         borderRadius:'10px'
//       },
//       '& .MuiInputLabel-formControl':{
//         border: '2px solid #5b4184',
//         color: '#5b4184',
//       },'& .MuiInputLabel-outlined':{
//         border: '2px solid #5b4184',
//         color: '#5b4184',
//       }
//     },
//   },
//      cssFocused: {},
// });


  const classes = useStyles();

    

    return (
       <div className="inputwrp">
         <TextField
            className={classes.root}
            size={'small'}
            fullWidth
            InputLabelProps={{style: { color: '#fff' }  }}
            variant="filled"
            label={label}
            value={formInput[kei]}
            onChange={(e)=>handleChange(e)}
            error={isError.error && !formInput[kei]}
            helperText={
                (!formInput[kei] && isError.error) && helpText
            }
        />
        </div>
    )
}

export default TextFieldComponent