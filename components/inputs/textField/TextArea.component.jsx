import React from 'react';
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InputAdornment from "@mui/material/InputAdornment";

const TextAreaComponent = ({ onChange, formInput, kei, label, helpText,isError }) => {
    console.log('isError',isError)
    const handleChange = (e) => {
        let value = { ...formInput, [kei]: e.target.value };
        onChange(value)
    }

    const errorStyle = {
        borderColor: 'red',
        color: 'red'
    }

    return (
        <div className="inputwrp">
            <TextField
                fullWidth
              InputLabelProps={{style: { color: '#fff' }  }}
                  variant="filled"
                multiline
                rows={6}
                placeholder={label}
                size={'small'}
                value={formInput[kei]}
                onChange={handleChange}
                style={isError.error && !formInput[kei]?errorStyle:{}}
            />
            {isError.error && !formInput[kei] && <p className="helptext"><span style={{color:'red'}}>{helpText}</span></p>}
            {helpText && <p className="helptext">
                <strong className="drakBlueText ">Markdown</strong> syntax
                is supportred. 0 of 1000 characters used.
            </p>}
        </div>
    )
}

export default TextAreaComponent