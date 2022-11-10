import axios from "axios"

function getData(route, setAllCombos){
    const accessToken = localStorage.getItem("accessToken")
        axios.get(route,{
          headers: {'Authorization': 'Bearer '+ accessToken}
          } )
        .then((response)=> {
          const visibleCombos = response.data
          setAllCombos(visibleCombos)
          return visibleCombos;
        }).catch(e=> console.log(e))

}

export default getData;