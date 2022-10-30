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
  const handleData = input => e =>{
    setDTO({...DTO, [input]: e.target.value})
}

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

      <Select
        label='Moneda a Entregar'
        name={"paymentType"}
        value={DTO.paymentType}
        onChange={handleData("paymentType")}
        color="primary"
        required
        sx={{width: "100%"}}
      >

           <MenuItem value={"Moneda Nacional"}>Moneda Nacional</MenuItem>
           <MenuItem value={"MLC"}>MLC</MenuItem>
           <MenuItem value={"Dolar Américano"}>Dólar Américano</MenuItem>
      </Select>

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