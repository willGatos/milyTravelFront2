import React,{useEffect} from 'react'
import BarInput from './BarInput'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Step1({
  DTO, 
  setDTO,
  registeredReceivers,
  selectedReceiver,
  setSelectedReceiver,
  children
}) {

  const handleChange = (event) => {
    const selected = event.target.value
    console.log(selected)
    setSelectedReceiver(selected);
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

  return (
    <div style={{width: "100%"}} className='flex flex-column justify-center'>
      <h4>Información de Cliente</h4>
      <BarInput 
      name={"clientName"}
      label={"Su Nombre"}
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

      <BarInput
      name={"paymentType"}
      label={"Moneda a la Entrega"}
      value={DTO.paymentType}
      object={DTO}
      setObject={setDTO}
      sx={{width: "100%"}}/>

      <BarInput
      name={"amount"}
      label={"Cantidad"}
      value={DTO.amount}
      object={DTO}
      setObject={setDTO}
      sx={{width: "100%"}}/>

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
      {children}
    </div>
  )
}

export default Step1