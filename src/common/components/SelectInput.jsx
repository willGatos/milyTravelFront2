import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function SelectInput({arrayToMenuItem=[], label, value, object, setObject}) {
  const handleData = input => e =>{
        setObject({...object, [input]: e.target.value})
  }
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select
        label='Tipo de Local'
        name={label}
        value={value}
        onChange={handleData(label)}
        color="primary"
        required
      >
        { arrayToMenuItem.map((menuItem, key) =>
           <MenuItem value={menuItem} key={key}>{menuItem}</MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

export default SelectInput