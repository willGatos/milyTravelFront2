function Buttons({ DTO, actualStep, setActualStep }) {
  
  return (
    <div className='flex'>
       
    {console.log("actualStep",actualStep)}
          {actualStep !== 3
          ? <button
              type="submit"
              style={{width: "100px", marginTop: "50px", marginLeft: "10px"}}
              className='hero-section-button bg-red font-color-w text-center flex justify-center align-center' 
              onClick={()=> setActualStep(actualStep+1)}
            >
            Siguiente
            </button>
          : <button 
              type="submit"
              style={{width: "100px", marginTop: "50px", marginLeft: "10px"}}
              className='hero-section-button bg-red font-color-w text-center flex justify-center align-center'
            >
            Enviar
          </button>}
    </div>
  )
}


export default Buttons