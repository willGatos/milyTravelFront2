import { useContext, useState, useEffect } from 'react'
import BarInput from './BarInput'
import UserContext from '../helpers/userContext';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ForwardButton from './ForwardButton';
function Step1({
  DTO, 
  setDTO,
  registeredReceivers,
  selectedReceiver,
  setSelectedReceiver,
  usableCurrency,
  children
}) {

  const {setActualStep} = useContext(UserContext);
  const [minimumAmountOfMoney, setMinimumAmountOfMoney] = useState(0)
  const [errorOfMin, setErrorOfMin] = useState(false)
  const [exchangeRate, setExchangeRate] = useState(1)

  const onSubmit= (event)=>{
    event.preventDefault();
    if(DTO.amount >= (+minimumAmountOfMoney * exchangeRate) ){
      setActualStep(prevStep => prevStep + 1)
    }
    else{ 
      setErrorOfMin(true)
    }
    
  }

  const handleChange = (event) => {
    const selected = event.target.value
    setSelectedReceiver(selected);
    registeredReceivers.map(receiver=>{
      if(receiver.receiverName === selected){
        setDTO({...DTO,
        receiverName: receiver.receiverName,
        carnet: receiver.carnet,
        phone: receiver.phone,
        //Exact Direction
        province: receiver.province,
        township: receiver.township,
        distribution: receiver.distribution,
        principalStreet: receiver.principalStreet,
        middleStreets: receiver.middleStreets,
        buildingNumber: receiver.buildingNumber,
        apartment: receiver.apartment
      })
      }
    })
    
  };
  const handleData = input => e =>{
    const selectedValue = e.target.value;

    if(input === "paymentType"){
      usableCurrency.map((currency, key) => {
        if(selectedValue === currency.nameOfTheCurrency){
          setMinimumAmountOfMoney(currency.minimumValueAllowed)
          setExchangeRate(currency.exchangeRateValuePerDollar)
        }
        return 0
      })
    }

    setDTO({...DTO, [input]: selectedValue})
}

  return (
    <form onSubmit={onSubmit} style={{width: "100%"}} className='flex flex-column justify-center'>
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
      <FormControl variant="standard" fullWidth sx={{width: "100%"}}>
        <InputLabel>Moneda a Entregar</InputLabel>
        <Select
          label='Moneda a Entregar'
          name={"paymentType"}
          value={DTO.paymentType}
          onChange={handleData("paymentType")}
          color="primary"
          required
          sx={{width: "100%"}}
        >
          {usableCurrency.map((currency, key)=>(
            <MenuItem 
              key={key}
              value={currency.nameOfTheCurrency}
            >
            {currency.nameOfTheCurrency}
            </MenuItem>
          ))}
      </Select>
      </FormControl>
      {/**TODO: Hacer parte de conversion a USD */}

      <BarInput
      name={"amount"}
      label={"Cantidad a Enviar"}
      value={DTO.amount}
      object={DTO}
      setObject={setDTO}
      sx={{width: "100%"}}/>

      {DTO.amount < (+minimumAmountOfMoney * exchangeRate) &&
      <p style={{color: errorOfMin? "red" : "black" }}>
        El mínimo requerido es de {minimumAmountOfMoney} USD
      </p>
      }
      {DTO.paymentType==="Moneda Nacional" && 
      <p>Son {Math.round((DTO.amount / exchangeRate) * 100) / 100} USD Convertidos</p>
      }

      {registeredReceivers.length !== 0 
      &&<FormControl variant="standard" fullWidth sx={{width: "100%"}}>
        <InputLabel id="demo-simple-select-label">
          Seleccionar Destinatario
        </InputLabel>
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
        <ForwardButton
        />
      </div>
    </form>
  )
}

export default Step1