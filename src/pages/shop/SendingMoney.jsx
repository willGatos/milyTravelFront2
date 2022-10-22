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
    paymentType: "",
    creditCard: "",
    //DEL DESTINATARIO
    receiverName: "",
    carnet: "",
    province: "",
    township: "",
    city: "",
    address: "",
    phone: "",
    //stripe Info
    stripeProductName: "",
    stripeProductPrice: 0,
  })

  const [selectedReceiver, setSelectedReceiver] = useState("")
  const [registeredReceivers, setRegisteredReceivers] = useState([])
  const { clientData, setRouteToNavigate } = useContext(UserContext)

  useEffect(()=>{
    const accessToken = localStorage.getItem("accessToken")
    setRouteToNavigate("/shop/sendMoney")
    setSendingMoney( () => {
      return {
        ...sendingMoney,
        email: clientData.email,
        clientName: clientData.clientName,
      }
    })
    if( accessToken )
    axios.post("http://localhost:3001/buys/getReceivers",clientData,
    {headers: {'Authorization': 'Bearer '+ accessToken}})
    .then(e => {
      const user = e.data;
      console.log(user)
      const receiversData = user.receiver;
      setSendingMoney( () => {
        return {
          ...sendingMoney,
          email: user.email,
          clientName: user.clientName,
        }
      })
      setRegisteredReceivers(user.receivers)
    })
    .catch(e=> console.log(e))
  },[])

  return (
    <>
      <div
       className='shopContainer flex flex-column justify-center align-center'>
        <MultiStepForm
          route={"http://localhost:3001/buys/sendMoney"}
          DTO={sendingMoney}
          setDTO={setSendingMoney}
        >
            <Step1 
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