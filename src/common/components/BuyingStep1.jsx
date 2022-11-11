import React,{useContext} from 'react'
import BarInput from './BarInput'
import ComboSelector from './ComboSelector'
import UserContext from '../helpers/userContext';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ForwardButton from './ForwardButton';
function BuyingStep1({
  DTO, 
  setDTO,
  registeredReceivers,
  selectedReceiver,
  setSelectedReceiver,
  children
}) {
  const {selectedComboToBuy, setSelectedComboToBuy} = useContext(UserContext)

  const handleChange = (event) => {
    const selected = event.target.value
    setSelectedReceiver(selected);
    setSelectedComboToBuy(selected)
    registeredReceivers.map(receiver=>{
      if(receiver.receiverName === selected){
        setDTO({...DTO,
        receiverName: receiver.receiverName,
        carnet: receiver.carnet,
        province: receiver.province,
        township: receiver.township,
        city: receiver.city,
        address: receiver.address,
        phone: receiver.phone,
      })
      }
    })
    
  };
  const {setActualStep} = useContext(UserContext);

  const onSubmit= (event)=>{
    event.preventDefault();
    setActualStep(prevStep => prevStep + 1)
  }

  return (
    <form onSubmit={onSubmit} style={{width: "100%"}} className='flex flex-column justify-center'>
        <h4>Información de Cliente</h4>
          <BarInput 
            name={"clientName"}
            label={"Nombre"}
            value={DTO.clientName}
            object={DTO}
            setObject={setDTO}
            sx={{width: "100%"}}
          />

          <BarInput 
          name={"email"}
          label={"Email"}
          value={DTO.email}
          object={DTO}
          setObject={setDTO}
          sx={{width: "100%"}}
          />


          <ComboSelector
            object={DTO}
            setObject={setDTO}
            value={DTO.combo}
          />

      {registeredReceivers.length !== 0 
      &&<FormControl variant="standard" fullWidth sx={{width: "100%"}}>
        <InputLabel id="demo-simple-select-label">Seleccionar Destinatario</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedReceiver}
          label="Seleccionar Destinatario"
          onChange={handleChange}
        >
          {registeredReceivers.map((e, key)=> <MenuItem key={key} value={e.receiverName}>{e.receiverName}</MenuItem>)}
        </Select>
      </FormControl>}
      <div className='flex justify-center'>
        <ForwardButton/>
      </div>
        </form>
  )
}

export default BuyingStep1