import {useState, useContext} from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useHistory } from 'react-router-dom'
import { Stack, Alert } from '@mui/material'
import TextField from "@mui/material/TextField";
import EmailState from "../../common/components/EmailState"
import UserContext from "../../common/helpers/userContext";
import signHandler from "../../common/helpers/signHandler"
import AuthFormWrapper from '../../common/components/AuthFormWrapper'

function Login() {
  const [loginObject, setLoginObject] = useState({ 
  email: "", 
  password: "",
  confirmationPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false)
  
  const {selectedComboToBuy,routeToNavigate, setClientData, setAccessToken} = useContext(UserContext);
  const Router = useHistory();

  const onSubmit = (e) => {
    e.preventDefault()
    setIsLoading("Loading")
    const toSendLoginObject = {
      email: loginObject.email,
      password: loginObject.password,
    }//
    axios.post("/user/signin", toSendLoginObject)
    .then((response)=> {
      const {accessToken, clientData} = response.data;
      signHandler(accessToken, clientData, setClientData, setAccessToken)
      Router.push(routeToNavigate);
      setIsLoading("success")
    })
    .catch((e) => {
      setIsLoading("fail")
      console.log("Error De Nuevo", e)})
  }

  const handleData = input => e =>{
    setLoginObject({...loginObject, [input]: e.target.value})
  }

  return (
    <AuthFormWrapper onSubmit={onSubmit}>
      
        <div className="absolute putTop">
        <EmailState stateOfEmail={isLoading}/>
        </div>

      <h3 style={{textAlign: "center"}}>Iniciar Sesión</h3>

        <TextField
          name={"email"}
          sx={{width:"100%"}}
          value={loginObject.email}
          label={"Email"}
          onChange={handleData("email")}
          required
          variant="standard"
        />

        <TextField
          type={"password"}
          name={"password"}
          sx={{width:"100%"}}
          value={loginObject.password}
          label={"Contraseña"}
          onChange={handleData("password")}
          required
          variant="standard"
        />
        <div>
            <Link to={"sendEmailToRecoverPass"}>¿Ha olvidado su contraseña? </Link>
            /
            <Link to={"register"}> Registrate</Link>
        </div>

        <button className="redButton" type="submit">Iniciar Sesión</button>
      </AuthFormWrapper>
  )
}

export default Login