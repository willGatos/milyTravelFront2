import axios from "axios";

const updateData = (
    route,
    selectedObject, 
    updateCurrencyToDeliever,
    setAllCurrency,
    setUpdateOpenDialog,
    setUpdateIsLoading,
) => {
    const accessToken = localStorage.getItem("accessToken");
    const toUpdateObject = {
      id: selectedObject._id,
      updateDTO: updateCurrencyToDeliever,
    }

    axios.patch( 
    route,
    toUpdateObject,
    { headers: {'Authorization': 'Bearer '+ accessToken} })
    .then((e)=>{
      setAllCurrency((prevAllCombos) => {
        const value =  prevAllCombos.map(e => {
            if(e._id === selectedObject._id) return updateCurrencyToDeliever;
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

export default updateData;