import BarInput from './BarInput'
import townshipProvince from '../helpers/townshipProvince';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { TextField } from '@mui/material';
import ForwardButton from './ForwardButton';
import BackButton from './BackButton';
import {useContext} from "react";
import UserContext from '../helpers/userContext';

function Step2({DTO, setDTO}) {


  const {setActualStep} = useContext(UserContext);

  const handleData = input => e =>{
    setDTO({...DTO, [input]: e.target.value})
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setActualStep(prevStep => prevStep + 1)
  }

  return (
    <form onSubmit={onSubmit} style={{width: "100%"}} className='flex flex-column justify-center'>
      <h3>Información del Destinatario</h3>
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
        sx={{width: "100%"}}
        required
      >
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
            name={"distribution"}
            label={"Reparto"}
            value={DTO.distribution}
            onChange={handleData("distribution")}
            variant="standard"
        />
        <TextField
            sx={{width: "100%"}}
            name={"principalStreet"}
            label={"Calle Principal"}
            value={DTO.principalStreet}
            onChange={handleData("principalStreet")}
            variant="standard"
            required
        />
        <TextField
            sx={{width: "100%"}}
            name={"middleStreets"}
            label={"Calles Entremedias"}
            value={DTO.middleStreets}
            onChange={handleData("middleStreets")}
            variant="standard"
            required
        />
        <TextField
            sx={{width: "100%"}}
            name={"buildingNumber"}
            type={"number"}
            label={"Edificio"}
            value={DTO.buildingNumber}
            onChange={handleData("buildingNumber")}
            variant="standard"
            required
        />

        <div className='flex justify-center'>

          <BackButton
          />

          <ForwardButton
          />

      </div>
    </form>
  )
}

export default Step2