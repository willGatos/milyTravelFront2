import SubmitButton from './SubmitButton';
import BackButton from './BackButton';
import { Stack, Alert } from '@mui/material'
import { useState } from 'react';
function LastStep({DTO, setDTO, usableCurrency}) {
  
  const [isLoading, setIsLoading] = useState(false)

  const handleData = input => e =>{
    setDTO({...DTO, [input]: e.target.value})
  }

  return (
    <div style={{width: "100%"}} className='relative flex flex-column justify-center'>

      <div  className='absolute putTop'> {isLoading
      && <Alert severity="info">   Cargando         </Alert>}</div>
    <h3 className="text-center">Verificación de Información</h3>
      <h4>Información del Cliente</h4>
        <p>Nombre: {DTO.clientName}</p>
        <p>Email : {DTO.email}</p>
        {DTO.amount && <p>Cantidad:{DTO.amount}</p>}
        {DTO.paymentType && <p>Moneda a Enviar: {DTO.paymentType}</p>}
        {DTO.combo && <p>Combo: {DTO.combo}</p>}
    <h4>Información del Destinatario</h4>
        <p>Nombre: {DTO.receiverName}</p>
        <p>Carnet: {DTO.carnet}</p>
        <p>Teléfono: {DTO.phone}</p>
      {DTO.receiverCard !== "" && <p>Tarjeta de Destinatario:
         {DTO.receiverCard}</p>}

    <h4>Dirección Exacta de Envío</h4>
        <p>Provincia:{DTO.province}</p>
        <p>Municipio:{DTO.township}</p>
        <p>Reparto:  {DTO.distribution}</p>
        <p>Dirección: {DTO.principalStreet} e/ {DTO.middleStreets} No.{DTO.buildingNumber}</p>
        
        <div className='flex justify-center'>
          <BackButton/>
          <SubmitButton 
            setIsLoading={setIsLoading}
            usableCurrency={usableCurrency} 
            DTO={DTO}/>
      </div>
    </div>
  )
}

export default LastStep