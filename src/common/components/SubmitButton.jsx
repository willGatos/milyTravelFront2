import {useContext} from 'react';
import UserContext from '../helpers/userContext';

function SubmitButton({DTO, usableCurrency}) {
    const {newCombos} = useContext(UserContext);
    let items  = [];
    let serviceCharge = {
      id: 2,
      quantity: 1,
      name: "Cargo por Servicio",
      priceInCents: 0
    };
    const onSubmit= ()=>{
        console.log(DTO)
        if(DTO.combo) {
          DTO.stripeProductName = DTO.combo
          const comboObject = newCombos.filter((e)=> e.name === DTO.combo)
          DTO.stripeProductPrice = comboObject[0].price
        }
        if(DTO.amount) {
          
          DTO.stripeProductName = "Envío de Remesa"
          DTO.stripeProductPrice = DTO.amount

          usableCurrency.map( currency => {
            if( currency.nameOfTheCurrency === DTO.paymentType ){
              if( DTO.amount <= currency.intermediateValueToChangeRate){
                serviceCharge.priceInCents = +currency.underIntermediateValueChargeToSum;
              }
              if( DTO.amount > currency.intermediateValueToChangeRate ){
                let percentageToExchange = currency.overIntermediateValueChargeInPercentage / 100;
                let valueToCharge = DTO.amount * percentageToExchange
                serviceCharge.priceInCents = +valueToCharge;
              }
            }
            console.log("serviceCharge",serviceCharge)
            return 0
          })
          items.push(serviceCharge)
          console.log(items)
        }
        items.push({
          id: 1,
          quantity: 1,
          name: DTO.stripeProductName,
          priceInCents: DTO.stripeProductPrice
        })
        console.log(items)
        const accessToken = localStorage.getItem("accessToken")
        fetch("http://localhost:3001/buys/create-checkout-session", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': 'Bearer '+ accessToken
         },
        body: JSON.stringify({
          emailRequest: DTO,
          items,
        }),
        })
        .then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
        })
        .then(({ url }) => window.location = url)
        .catch(e => console.error(e.error))
      }
  return (
        <button
          style={{width: "100px", marginTop: "50px", marginLeft: "10px"}}
          className='hero-section-button bg-red font-color-w text-center flex justify-center align-center'
          onClick={()=> onSubmit()}
        >Enviar
        </button>
  )
}

export default SubmitButton