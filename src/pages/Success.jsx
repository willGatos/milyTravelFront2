import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react';
import { useParams  } from 'react-router-dom'
import axios from 'axios';

function Success({query2}) {
  const Router = useParams ();
  let hasRun = useRef(true)
  useEffect(()=>{
    const accessToken = localStorage.getItem("accessToken")
    const query = Object.fromEntries(new URLSearchParams(window.location.search))
    if(hasRun.current){
      if(query.combo){
        axios.post("/buys/sendCombo", query,{
          headers: {'Authorization': 'Bearer '+ accessToken}
        })
        .catch((error)=> console.log(error))
      }
      if(query.amount){
        axios.post("/buys/sendingMoney", query,{
          headers: {'Authorization': 'Bearer '+ accessToken}
        })
        .catch((error)=> console.log(error))
      }
      hasRun.current = !hasRun.current
    }

  },[])

  return (
    <div style={{  height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}>
        <p style={{borderRight: "1px solid",padding: "15px"}}>Transacción Exitosa</p>
        <Link 
        style={{margin: "15px"}}
        to={"/"}>Página Principal</Link>
    </div>
  )
}

export default Success