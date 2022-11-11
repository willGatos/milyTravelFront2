import { TextField } from "@mui/material";

function BarInput({name,label, value, object, setObject, variant="standard", sx={}}) {
    const handleData = input => e =>{
        setObject({...object, [input]: e.target.value})
    }
    return <TextField
                sx={sx}
                name={name}
                label={label}
                value={value}
                onChange={handleData(name)}
                variant={variant}
                required 
            />
}

export default BarInput;