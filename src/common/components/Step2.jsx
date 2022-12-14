import BarInput from './BarInput'
import ForwardButton from './ForwardButton'
import BackButton from './BackButton'
import { useState, useEffect,useContext } from 'react'
import UserContext from '../helpers/userContext'
import { TextField } from '@mui/material'

function Step2({DTO,setDTO, usableCurrency}) {

  useEffect(()=>{
    if(DTO.receiverName === "Nuevo Destinatario")
    setDTO({...DTO, receiverName: ""})
  },[])

  const handleData = input => e =>{
    setDTO({...DTO, [input]: e.target.value})
  }

  const {setActualStep} = useContext(UserContext);
  const [errorOfMin, setErrorOfMin] = useState(false)
  const onSubmit= (event)=>{
    event.preventDefault();
    if(DTO.carnet.length !== 11){
      setErrorOfMin(true)
    } else {
      setActualStep(prevStep => prevStep + 1)
    }
    
  }

  return (
    <form onSubmit={onSubmit} style={{width: "100%"}} className='flex flex-column justify-center'>
      <h3>Información del Destinatario</h3>
      <BarInput
        name={"receiverName"}
        label={"Nombre Completo"}
        object = {DTO}
        setObject={setDTO}
        value={DTO.receiverName}
        sx={{width: "100%"}}
        required
      />

      <BarInput
        name={"carnet"}
        label={"Carnet"}
        object = {DTO}
        setObject={setDTO}
        value={DTO.carnet}
        sx={{width: "100%"}}
      />

      {DTO.carnet.length !== 11 && <p 
      style={{color: errorOfMin? "red" : "black" }}
      >Debe tener 11 valores</p>}

      <BarInput
        name={"phone"}
        label={"Teléfono"}
        object = {DTO}
        setObject={setDTO}
        value={DTO.phone}
        sx={{width: "100%"}}
      />
      {DTO.amount && 
      usableCurrency.map((currency)=>{
        if(currency.nameOfTheCurrency === DTO.paymentType){
          if(currency.requiresTargetForTransaction){
            return(
                    <TextField
                      name={"receiverCard"}
                      label={"Tarjeta del Destinatario"}
                      value={DTO.receiverCard}
                      onChange={handleData("receiverCard")}
                      required 
                      variant='standard'
                    />
                  )
          }
        }
      })
      }
      

    <div className='flex justify-center'>

      <BackButton/>

      <ForwardButton/>

    </div>
      
    </form>
  )
}

export default Step2