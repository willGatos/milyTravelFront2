import {useState, useEffect, useContext} from 'react'
import axios from "axios"

import BuyingStep1 from '../../common/components/BuyingStep1'
import UserContext from '../../common/helpers/userContext'
import MultiStepForm from '../../common/components/MultiStepForm'
import newReceiver from '../../common/helpers/newReceiver'
function BuyingCombos() {
  
  const {clientData, selectedComboToBuy} = useContext(UserContext)
  
  const initialFormState = {
    //DEL CLIENTE
    clientName: "",
    email: "",
    combo: selectedComboToBuy.name,
    price: selectedComboToBuy.price,
    creditCard: "",
    //DEL DESTINATARIO
    receiverName: "",
    carnet: "",
    province: "",
    township: "",
    principalStreet:"",
    middleStreets:"",
    buildingNumber:"",
    distribution:"",
    phone: "",
     //stripe Info
    stripeProductName: "",
    stripeProductPrice: 0,
  }
  const [buyingCombos, setBuyingCombos] = useState(initialFormState)

  const [selectedReceiver, setSelectedReceiver] = useState("")
  const [registeredReceivers, setRegisteredReceivers] = useState([])

  useEffect(()=>{

    const accessToken = localStorage.getItem("accessToken")

    setBuyingCombos( () => {
      return {
        ...buyingCombos,
        email: clientData.email,
        clientName: clientData.clientName,
      }
    })

    if( accessToken )
    axios.post("/buys/getReceivers",clientData,
    {headers: {'Authorization': 'Bearer '+ accessToken}})
    .then(e => {
      const user = e.data.user;
      //const currency = e.data.currency;

      console.log(user)
      const receiversData = user.receivers;
      setBuyingCombos( () => {
        return {
          ...buyingCombos,
          email: user.email,
          clientName: user.clientName,
        }
      })
      setRegisteredReceivers([newReceiver,...receiversData])
    })
    .catch(e=> console.log(e))
  },[])

  return (
    <>
      <div className='shopContainer flex flex-column justify-center align-center'>
        <MultiStepForm
          route={"/buys/sendCombo"}
          DTO={buyingCombos}
          setDTO={setBuyingCombos}
        >
            <BuyingStep1
             DTO={buyingCombos}
             setDTO={setBuyingCombos}
             registeredReceivers={registeredReceivers}
              selectedReceiver={selectedReceiver}
              setSelectedReceiver={setSelectedReceiver}/>
        </MultiStepForm>
      </div>
    </>
  )
}

export default BuyingCombos