import { TextField } from "@mui/material";

function BarInputMultirow({name, label, value,placeholder, object, setObject, row}) {
    const handleData = input => e =>{
        setObject({...object, [input]: e.target.value})
    }
    return <TextField
                multiline
                rows={row}
                name={name}
                label={label}
                value={value}
                placeholder={placeholder}
                onChange={handleData(name)}
                variant="standard"
                required
            />
}

export default BarInputMultirow