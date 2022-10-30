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

  const route = useHistory();
  //TODO: determinar cual la forma de tomar el pathname
  return (
    <div>
      <navbar className="navbar flex justify-space-between align-center">
          <img style={{width: "50px", marginLeft: "10px"}} src={MilyTravel} alt='MilyTravel'/>
          {accessToken
          ?
          <div>
            {userFirstName && 
            <div className="text-center">
              ¡ Hola {userFirstName} !
            </div>}
            
            <div style={{fontSize: "18px", marginRight: "2vw"}} className="align-end navbarLinks flex justify-center">
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
              className="align-center navbarLinks flex justify-center">
              <Link to={"/auth/login"}>Iniciar Sesión</Link>
              <Link to={"/auth/register"}>Suscribirse</Link>
            </div>
          }
      </navbar>
      {children}
    </div>
  )
}

export default NavbarTop