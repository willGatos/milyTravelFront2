import { useState, useEffect, useContext } from 'react'
import Step1 from '../../common/components/Step1'
import axios from "axios"
import UserContext from '../../common/helpers/userContext'
import MultiStepForm from '../../common/components/MultiStepForm'

function SendingMoney() {
  const [sendingMoney, setSendingMoney] = useState({
    //DEL CLIENTE
    clientName: "",
    email: "",
    amount: 1,
    paymentType: "Dolar Américano",
    creditCard: "",
    //DEL DESTINATARIO
    receiverName: "",
    carnet: "",
    phone: "",
    receiverCard: "",
    //Direccion Exacta
    province: "",
    township: "",
    distribution: "",
    principalStreet: "",
    middleStreets: "",
    buildingNumber: "",
    apartment: "",
    //stripe Info
    stripeProductName: "",
    stripeProductPrice: 0,
  })

  const [selectedReceiver, setSelectedReceiver] = useState("")
  const [registeredReceivers, setRegisteredReceivers] = useState([])
  const [usableCurrency, setUsableCurrency] = useState([])
  const { clientData, setRouteToNavigate, setActualStep } = useContext(UserContext)

  useEffect(()=>{
    setActualStep(0)
    const accessToken = localStorage.getItem("accessToken")

    setRouteToNavigate("/shop/sendingMoney")

    setSendingMoney( () => ({...sendingMoney,
      email: clientData.email,
      clientName: clientData.clientName,
      }))

    if( accessToken )
    axios.post("/buys/getReceivers",clientData,
    {headers: {'Authorization': 'Bearer '+ accessToken}})
    .then(e => {
      const user = e.data.user;
      const currency = e.data.currency;

      setSendingMoney( () =>  ({
          ...sendingMoney,
          email: user.email,
          clientName: user.clientName}))

      setUsableCurrency(currency)
      setRegisteredReceivers(user.receivers)
    })
    .catch((e) => console.log(e))

  },[])

  return (
    <>
      <div
       className='shopContainer flex flex-column justify-center align-center'>
        <MultiStepForm
          route={"/buys/sendingMoney"}
          DTO={sendingMoney}
          setDTO={setSendingMoney}
          usableCurrency={usableCurrency}
        >
            <Step1 
              usableCurrency={usableCurrency}
              registeredReceivers={registeredReceivers}
              DTO={sendingMoney}
              setDTO={setSendingMoney}
              selectedReceiver={selectedReceiver}
              setSelectedReceiver={setSelectedReceiver}
            />
        </MultiStepForm>
      </div>
    </>
  )
}

export default SendingMoney;