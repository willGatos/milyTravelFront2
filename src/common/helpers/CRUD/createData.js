import axios from "axios"
const createCombo = (
    route,
    createCurrencyToDeliever,
    setAllCurrency,
    setCreateOpenDialog,
    allCurrency,
    setCreateIsLoading,
    ) => {
    const accessToken = localStorage.getItem("accessToken");

    axios.post(
        route,
        createCurrencyToDeliever,
        {headers: {'Authorization': 'Bearer '+ accessToken}}
    )
    .then((e)=>{
      setAllCurrency([
        e.data,
        ...allCurrency
        ])
      //TODO: Cartel de Operacion Exitosa
      setCreateOpenDialog(false)
      setCreateIsLoading(false)
    })
    .catch(res => {

      setCreateOpenDialog(false)

      setCreateIsLoading(false)

    })
  }
export default createCombo