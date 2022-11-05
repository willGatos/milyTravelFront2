import MilyTravel from "../../public/MilyTravel.png"
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from "react"
import UserContext from "../helpers/userContext"
import { useHistory } from "react-router-dom"

function NavbarTop({children}) {
  const {accessToken, setAccessToken, clientData}=useContext(UserContext)
  const [userFirstName, setUserFirstName] = useState("")
  useEffect(() => {
    console.log("clientData",clientData)
    if(clientData.clientName) setUserFirstName(clientData.clientName.split(' ')[0]) 
    
    setAccessToken(localStorage.getItem("accessToken"))
  }, [clientData])

  const closeSession = () => {
    localStorage.removeItem("accessToken")
    setAccessToken("")
  }

  const route = useHistory();
  //TODO: determinar cual la forma de tomar el pathname
  return (
    <div>
      <div className="navbar flex justify-space-between align-center">
          <img style={{width: "50px", marginLeft: "10px"}} src={MilyTravel} alt='MilyTravel'/>
          {accessToken
          ?
          <div style={{width: "100%"}}>
            <div className="text-end navbarButtons">
            {clientData.isAdmin &&
            <button onClick={()=> route.push("/admin")} className="buttonNavbar ">Admin</button>}
            {accessToken &&
            <button onClick={closeSession} className="buttonNavbar">Cerrar Sesión</button>}
            </div>

            <div style={{fontSize: "18px", marginRight: "2vw"}} className="align-end navbarLinks flex justify-end">
              <div className={route.pathname === "/" && "activeLink"}>
                <Link to={"/"}>Inicio</Link>
              </div>
              <div className={route.pathname === "/seeCombos" && "activeLink"}>
                <Link to={"/seeCombos"}>Combos</Link>
              </div>
              <div className={route.pathname === "/shop/sendingMoney" && "activeLink"}>
                <Link to={"/shop/sendingMoney"}>Remesas</Link>
              </div>
            </div>
          </div>
          :
            <div
              style={{fontSize: "18px", marginRight: "2vw"}}
              className="align-center navbarLinks flex justify-end"
            >
                <Link to={"/auth/login"}>Iniciar Sesión</Link>
                <Link to={"/auth/register"}>Suscribirse</Link>
            </div>
          }
      </div>
      {children}
    </div>
  )
}

export default NavbarTop