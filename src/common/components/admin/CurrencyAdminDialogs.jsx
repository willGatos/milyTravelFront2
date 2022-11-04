import React, {useState} from 'react'
import CurrencyDialog from '../CurrencyDialog'
import axios from 'axios'

function CurrencyAdminDialogs({
  allCurrency,
  setAllCurrency,
  selectedCurrency,
  createOpenDialog,
  setCreateOpenDialog,
  updateOpenDialog,
  setUpdateOpenDialog,
  updateCurrencyToDeliever,
  setUpdateCurrencyToDeliever
}) {

    const [updateIsLoading, setUpdateIsLoading] = useState(false)
    const [createIsLoading, setCreateIsLoading] = useState(false)

    const [createCurrencyToDeliever, setCreateCurrencyToDeliever] = useState({
        nameOfTheCurrency: "",
        actualExchangeRate: 1,
        minimumValueAllowed: 50,
        intermediateValueToChangeRate: 100,
        exchangeValuePerDollar: 1,
        underIntermediateValueChargeToSum: 25,
        overIntermediateValueChargeInPercentage: 25
    })

    const handleDataForUpdate = input => e =>{
        setUpdateCurrencyToDeliever({...updateCurrencyToDeliever, [input]: e.target.value})
    }
    const handleDataForCreating = input => e =>{
        setCreateCurrencyToDeliever({...createCurrencyToDeliever, [input]: e.target.value})
    }

    const createCombo = (event) =>{
        const accessToken = localStorage.getItem("accessToken");
        event.preventDefault()
        axios.post("http://localhost:3001/currency/create",createCurrencyToDeliever,{
        headers: {'Authorization': 'Bearer '+ accessToken}
        })
        .then((e)=>{
          setAllCurrency([e.data, ...allCurrency])
          //TODO: Cartel de Operacion Exitosa
          setCreateOpenDialog(false)
          setCreateIsLoading(false)
        })
        .catch(res => {
          setCreateOpenDialog(false)
          setCreateIsLoading(false)
          console.log("TODO: Operacion Fallida")
        })
      }

      const updateData = (event) => {
        event.preventDefault()
        const accessToken = localStorage.getItem("accessToken");
        const toUpdateObject = {
          CurrencyId: selectedCurrency._id,
          updateCurrencyDTO: updateCurrencyToDeliever,
        }
        console.log("toUpdateObject",toUpdateObject);
        
        axios.patch("http://localhost:3001/currency/update", toUpdateObject,{
        headers: {'Authorization': 'Bearer '+ accessToken}
        })
        .then((e)=>{
          setAllCurrency((prevAllCombos) => {
            const value =  prevAllCombos.map(e => {
                console.log(e._id === selectedCurrency._id)
                if(e._id === selectedCurrency._id) return updateCurrencyToDeliever;
                return e;
            })

            return value;
        })
        setUpdateOpenDialog(false)
        setUpdateIsLoading (false)
          //TODO: Cartel de Operacion Exitosa
        })
        .catch(res => console.log("TODO: Operacion Fallida"))
      }

  return (
    <div>
        <CurrencyDialog
            openDialog={updateOpenDialog} 
            setOpenDialog={setUpdateOpenDialog}
            callToActionFunction={updateData}
            updateValues={updateCurrencyToDeliever}
            isLoading={updateIsLoading}
            handleData={handleDataForUpdate}
        />
        <CurrencyDialog
            openDialog={createOpenDialog} 
            setOpenDialog={setCreateOpenDialog}
            callToActionFunction={createCombo}
            updateValues={createCurrencyToDeliever}
            isLoading={createIsLoading}
            handleData={handleDataForCreating}
        />
    </div>
  )
}

export default CurrencyAdminDialogs