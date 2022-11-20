import {useContext} from 'react';
import UserContext from '../helpers/userContext';

function SubmitButton({DTO, usableCurrency, setIsLoading}) {
    const {newCombos} = useContext(UserContext);
    let items  = [];
    let serviceCharge = {
      id: 2,
      quantity: 1,
      name: "Cargo por Servicio",
      priceInCents: 0
    };
    const onSubmit= ()=>{
      setIsLoading(true)
        if(DTO.combo) {
          DTO.stripeProductName = DTO.combo
          const comboObject = newCombos.filter((e)=> e.name === DTO.combo)
          DTO.stripeProductPrice = comboObject[0].price
        }
        if(DTO.amount) {
          
          DTO.stripeProductName = "Envío de Remesa"

          usableCurrency.map( currency => {
            if( currency.nameOfTheCurrency === DTO.paymentType ){
              let amountToPay = DTO.amount / currency.exchangeRateValuePerDollar
              DTO.stripeProductPrice = amountToPay;

              if( amountToPay <= currency.intermediateValueToChangeRate){
                serviceCharge.priceInCents = +currency.underIntermediateValueChargeToSum;
              }
              if( amountToPay > currency.intermediateValueToChangeRate ){
                let percentageToExchange = currency.overIntermediateValueChargeInPercentage / 100;
                let valueToCharge = amountToPay * percentageToExchange
                serviceCharge.priceInCents = +valueToCharge;
              }
            }
            return 0
          })
          items.push(serviceCharge)
        }
        items.push({
          id: 1,
          quantity: 1,
          name: DTO.stripeProductName,
          priceInCents: DTO.stripeProductPrice
        })
        const accessToken = localStorage.getItem("accessToken")
        fetch("https://api.milytravel.net/buys/create-checkout-session", {//http://localhost:3001
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
        .then(({ url }) => {
          setIsLoading(false)
          window.location = url
        
        })
        .catch(e => {
          setIsLoading(false)
          console.error(e.error)
        })
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