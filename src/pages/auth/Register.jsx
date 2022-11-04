import {useState, useContext} from 'react'
import TextField from '@mui/material/TextField'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

import BarInput from '../../common/components/BarInput'
import useCheckToken from "../../common/hooks/useCheckToken"
import signHandler from '../../common/helpers/signHandler'
import AuthFormWrapper from '../../common/components/AuthFormWrapper'
import UserContext from "../../common/helpers/userContext";

function Register() {
  const [registerObject, setRegisterObject] = useState({
    clientName :"",
    email: "",
    password: "",
    confirmationPassword: ""
  })

  const setApiCall = useCheckToken();
  const Router = useHistory();
  const {setClientData, setAccessToken, routeToNavigate} = useContext(UserContext)

  const onSubmit = (event) => {
    event.preventDefault();
    const toSendRegisterObject = {
      clientName: registerObject.clientName,
      email: registerObject.email,
      password: registerObject.password,
    }
    setApiCall("post", "https://api.milytravel.net/user/signup", toSendRegisterObject)
    .then( response => {

      const {accessToken, clientData} = response.data;
      signHandler(accessToken, clientData, setClientData, setAccessToken);

      Router.push(routeToNavigate)})
    .catch(()=>console.log("Error De Nuevo"))
    
  }

  const handleData = input => e =>{
    setRegisterObject({...registerObject, [input]: e.target.value})
  }

  return (
    <AuthFormWrapper onSubmit={onSubmit}>
      <h3 style={{textAlign: "center"}}>Suscríbete</h3>
          <BarInput
            name={"clientName"}
            sx={{width:"100%"}}
            label={"Nombre"}
            value={registerObject.clientName}
            object={registerObject}
            setObject={setRegisterObject}
          />
          <BarInput
            name={"email"}
            sx={{width:"100%"}}
            label={"Email"}
            value={registerObject.email}
            object={registerObject}
            setObject={setRegisterObject}
          />
          <TextField
            type={"password"}
            name={"password"}
            sx={{width:"100%"}}
            value={registerObject.password}
            label={"Contraseña"}
            onChange={handleData("password")}
            required
            variant="standard"
         />
          <TextField
            type={"password"}
            name={"confirmationPassword"}
            sx={{width:"100%"}}
            value={registerObject.confirmationPassword}
            label={"Confirmación Contraseña"}
            onChange={handleData("confirmationPassword")}
            required
            variant="standard"
          />
          {registerObject.password !== registerObject.confirmationPassword 
          && <p style={{color: "red", fontSize: "14px"}}>Las Contraseñas no son Iguales</p>}
            <p>¿Ya estás con nosotros? / </p>
            <Link to={"/auth/login"}> Inicia Sesión</Link>
          <button className="redButton" type="submit">Suscribirse</button>
      </AuthFormWrapper>
  )
}

export default Register