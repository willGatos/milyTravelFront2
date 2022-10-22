import { TextField } from "@mui/material";

function BarInputMultirow({label, value,placeholder, object, setObject, row}) {
    const handleData = input => e =>{
        console.log(label,value, object)
        setObject({...object, [input]: e.target.value})
    }
    return <TextField
                multiline
                rows={row}
                name={label}
                label={label}
                value={value}
                placeholder={placeholder}
                onChange={handleData(label)}
                variant="standard"
                required
            />
}

export default BarInputMultirow