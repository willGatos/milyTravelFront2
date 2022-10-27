import combos from "../helpers/combosRelationship"
function Buttons({ DTO, actualStep, setActualStep }) {
  const onSubmit= ()=>{
    console.log(DTO)
    if(DTO.combo) {
      console.log("combo", DTO.combo)
      DTO.stripeProductName = DTO.combo
      const comboObject = combos.filter((e)=> e.name === DTO.combo)
      console.log("COmbo",comboObject)
      DTO.stripeProductPrice = comboObject[0].price
    }
    if(DTO.amount) {
      console.log("amount", DTO.amount)
      DTO.stripeProductName = "Envío de Remesa"
      DTO.stripeProductPrice = DTO.amount
    }
    const accessToken = localStorage.getItem("accessToken")

    fetch("https://api.milytravel.net/buys/create-checkout-session", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      'Authorization': 'Bearer '+ accessToken
     },
    body: JSON.stringify({
      emailRequest: DTO,
      items: [ { 
        id: 1, 
        quantity: 1,
        name: DTO.stripeProductName, 
        priceInCents: DTO.stripeProductPrice
      } ],
    }),
    })
    .then(res => {
    if (res.ok) return res.json()
    return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
    window.location = url
    })
    .catch(e => {
    console.error(e.error)
    })
  }
  return (
    <div className='flex'>
       {actualStep !== 0&&
        <button 
          style={{width: "100px", marginTop: "50px"}}
          className='hero-section-button bg-blue font-color-w text-center flex justify-center align-center'
          onClick={()=> setActualStep(actualStep-1)}
        >
            Anterior
        </button>
       }
       
    {console.log("actualStep",actualStep)}
          {actualStep !== 1
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
              onClick={()=> onSubmit()}
            >
            Enviar
          </button>}
    </div>
  )
}


export default Buttons