import BarInput from './BarInput'
import townshipProvince from '../helpers/townshipProvince';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { TextField } from '@mui/material';
function Step2({DTO, setDTO}) {

  const handleData = input => e =>{
    setDTO({...DTO, [input]: e.target.value})
  }

  return (
    <div style={{width: "100%"}} className='flex flex-column justify-center'>
      <h3>Información del Destinatario</h3>
      <BarInput
        name={"receiverName"}
        label={"Nombre Completo"}
        object = {DTO}
        setObject={setDTO}
        value={DTO.receiverName}
        sx={{width: "100%"}}
      />
      <BarInput
        name={"carnet"}
        label={"Carnet"}
        object = {DTO}
        setObject={setDTO}
        value={DTO.carnet}
        sx={{width: "100%"}}
      />
      <FormControl 
        variant="standard"
        sx={{width: "100%"}}
      >
      <InputLabel id="demo-simple-select-helper-label">Provincia</InputLabel>
      <Select
        label='Provincia'
        name={"province"}
        value={DTO.province}
        onChange={handleData("province")}
        color="primary"
        required
      >
        { townshipProvince.map((menuItem, key) =>
           <MenuItem 
            value={menuItem.province} 
            key={key}
            >{menuItem.province}</MenuItem>
        )}
      </Select>
    </FormControl>

      <FormControl  
      variant="standard" 
      sx={{width: "100%"}}>
          <InputLabel>
            Municipio
          </InputLabel>
          <Select 
            onChange={handleData("township")}
            label='Municipio'
            required
            name='township'
            value={DTO.township}
          >
            { townshipProvince.map(e => {
            if(e.province === DTO.province){
             return e.township.map((township, key)=>
                <MenuItem
                  key={key}
                 value={township}>
                  {township}
                </MenuItem>
                )
            }
            })}
          </Select>
          </FormControl>
        <TextField
          sx={{width: "100%"}}
                name={"city"}
                label={"Reparto"}
                value={DTO.city}
                onChange={handleData("city")}
            />

      <BarInput
        name={"address"}
        label={"Dirección"}
        object = {DTO}
        setObject={setDTO}
        value={DTO.address}
        sx={{width: "100%"}}/>

      <BarInput
        name={"phone"}
        label={"Teléfono"}
        object = {DTO}
        setObject={setDTO}
        value={DTO.phone}
        sx={{width: "100%"}}/>
    </div>
  )
}

export default Step2