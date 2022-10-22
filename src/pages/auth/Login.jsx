import {useState, useContext} from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useHistory } from 'react-router-dom'

import TextField from "@mui/material/TextField";

import UserContext from "../../common/helpers/userContext";
import signHandler from "../../common/helpers/signHandler"
import AuthFormWrapper from '../../common/components/AuthFormWrapper'

function Login() {
  const [loginObject, setLoginObject] = useState({ 
  email: "", 
  password: "",
  confirmationPassword: ""
  });
  
  const {selectedComboToBuy,routeToNavigate, setClientData, setAccessToken} = useContext(UserContext);
  const Router = useHistory();

  const onSubmit = (e) => {
    e.preventDefault()
    const toSendLoginObject = {email: loginObject.email, password: loginObject.password}
    axios.post("http://localhost:3001/user/signin", toSendLoginObject)
    .then((response)=> {
      console.log("Response Data from Server ",response.data)
      const {accessToken, clientData} = response.data;
      signHandler(accessToken, clientData, setClientData, setAccessToken)
      console.log(selectedComboToBuy)
      Router.push(routeToNavigate);
    })
    .catch((e) => console.log("Error De Nuevo", e))
  }

  const handleData = input => e =>{
    setLoginObject({...loginObject, [input]: e.target.value})
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <AuthFormWrapper onSubmit={onSubmit}>
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