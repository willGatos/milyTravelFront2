import {useState,useEffect} from 'react'
import CurrencyAdminDialogs from '../../common/components/admin/CurrencyAdminDialogs'
import axios from 'axios'
import CurrencyCard from '../../common/components/admin/CurrencyCard'
function ExchangeRate() {

    const [actualCurrencies, setCurrencies] = useState([])
    const [selectedCurrency, setSelectedCurrency] = useState({})
    const [allCurrency, setAllCurrency] = useState([])

    const [createOpenDialog, setCreateOpenDialog] = useState(false)
    const [updateOpenDialog, setUpdateOpenDialog] = useState(false)

    const [updateCurrencyToDeliever, setUpdateCurrencyToDeliever] = useState(selectedCurrency)

    useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    
    axios.get(
    "http://localhost:3001/currency/get",
    {headers: {'Authorization': 'Bearer '+ accessToken}}
    ).then((e)=> { setCurrencies(e.data) })
    }, [])

    const deleteCombo = (_id) => {
        const accessToken = localStorage.getItem("accessToken")
        axios.delete(`http://localhost:3001/currency/delete/${_id}`,{
          headers: {'Authorization': 'Bearer '+ accessToken}
        }).then(e => setCurrencies(actualCurrencies.filter(e => {
            console.log(e._id !== _id);
            return e._id !== _id})))
          .catch(e => console.log(e) )
    }

  return (
    <div>
        <div className='flex justify-center'>
            <button
                className='createButton'
                onClick={()=>setCreateOpenDialog(true)}
            >
                Añadir Moneda Aceptada
            </button>
        </div>
        <div className="flex justify-space-evenly">
        {actualCurrencies.map( (currency, key) => (
            <div onClick={()=>{
                    console.log(currency);
                    setSelectedCurrency(currency);
                    setUpdateCurrencyToDeliever(currency)
            }}>
                <CurrencyCard
                    key={key}
                    currency={currency}
                    updateOpenDialog={updateOpenDialog}
                    setUpdateOpenDialog={setUpdateOpenDialog}
                    deleteCombo={deleteCombo}
                />
            </div>
        ))}
        </div>

        <CurrencyAdminDialogs
            allCurrency = {actualCurrencies}
            setAllCurrency = {setCurrencies}
            selectedCurrency = {selectedCurrency}
            createOpenDialog = {createOpenDialog}
            setCreateOpenDialog = {setCreateOpenDialog}
            updateOpenDialog = {updateOpenDialog}
            setUpdateOpenDialog = {setUpdateOpenDialog}
            updateCurrencyToDeliever = {updateCurrencyToDeliever}
            setUpdateCurrencyToDeliever = {setUpdateCurrencyToDeliever}
        />
    </div>
  )
}

export default ExchangeRate