import SubmitButton from './SubmitButton';
import BackButton from './BackButton';

function LastStep({DTO, setDTO, usableCurrency}) {

  const handleData = input => e =>{
    setDTO({...DTO, [input]: e.target.value})
  }

  return (
    <div style={{width: "100%"}} className='flex flex-column justify-center'>
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

    <h4>Dirección Exacta de Envío</h4>
        <p>Provincia:{DTO.province}</p>
        <p>Municipio:{DTO.township}</p>
        <p>Reparto:  {DTO.distribution}</p>
        <p>Dirección: {DTO.principalStreet} e/ {DTO.middleStreets} No.{DTO.buildingNumber}</p>
        
        <div className='flex justify-center'>
          <BackButton/>
          <SubmitButton usableCurrency={usableCurrency} DTO={DTO}/>
      </div>
    </div>
  )
}

export default LastStep