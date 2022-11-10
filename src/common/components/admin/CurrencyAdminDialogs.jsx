import React, {useState} from 'react'
import CurrencyDialog from '../CurrencyDialog'
import updateData from '../../helpers/CRUD/updateData'
import createCombo from '../../helpers/CRUD/createData'

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

      const createFunction = () => createCombo(
        "/currency/create",
        createCurrencyToDeliever,
        setAllCurrency,
        setCreateOpenDialog,
        allCurrency,
        setCreateIsLoading,
      )

      const update = () => updateData(
        "/currency/update",
        selectedCurrency, 
        updateCurrencyToDeliever,
        setAllCurrency,
        setUpdateOpenDialog,
        setUpdateIsLoading,
      )

  return (
    <div>
        <CurrencyDialog
            openDialog={updateOpenDialog} 
            setOpenDialog={setUpdateOpenDialog}
            updateValues={updateCurrencyToDeliever}
            isLoading={updateIsLoading}
            callToActionFunction={update}
            handleData={handleDataForUpdate}
        />
        <CurrencyDialog
            openDialog={createOpenDialog} 
            setOpenDialog={setCreateOpenDialog}
            updateValues={createCurrencyToDeliever}
            isLoading={createIsLoading}
            callToActionFunction={createFunction}
            handleData={handleDataForCreating}
        />
    </div>
  )
}

export default CurrencyAdminDialogs