import axios from "axios";

const deleteData = (_id ,route , setAllCombos, allCombos) => {
    const accessToken = localStorage.getItem("accessToken")
    axios.delete(`${route}${_id}`,{
      headers: {'Authorization': 'Bearer '+ accessToken}
    })
    .then(e => {
      setAllCombos(allCombos.filter(e => e._id !== _id));
    })
    .catch(e => console.log(e) )
  }
export default deleteData;