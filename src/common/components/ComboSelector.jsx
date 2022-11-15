import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import UserContext from '../helpers/userContext';
import { useContext } from 'react';

function ComboSelector({value, object, setObject}) {
  const {newCombos}=useContext(UserContext);

  const handleData = input => e => setObject({...object, [input]: e.target.value});

  return (
    <FormControl variant="standard" sx={{width: "100%"}}>
      <InputLabel id="demo-simple-select-helper-label">Combo a entregar</InputLabel>
      <Select
      label='Combo a entregar'
      name={"combo"}
      value={value}
      onChange={handleData("combo")}
      required
      >
        { newCombos.map((combo, key) =>
           <MenuItem value={combo.name} key={key}>{combo.name}</MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

export default ComboSelector;