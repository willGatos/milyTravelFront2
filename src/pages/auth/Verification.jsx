import AuthFormWrapper from "../../common/components/AuthFormWrapper"
import { TextField } from "@mui/material"
import {useState, useContext} from "react";
import axios from "axios";
import signHandler from "../../common/helpers/signHandler";
import UserContext from "../../common/helpers/userContext";
import { useHistory } from 'react-router-dom'

function Verification() {
const [formValues, setFormValues] = useState({
    email: "", 
    verificationCode: ""
})

    const {setClientData, setAccessToken, routeToNavigate} = useContext(UserContext)
    const Router = useHistory();

    const onSubmit = (event) =>{
        event.preventDefault()

        axios.post("http://localhost:3001/user/verification", formValues)
        .then((response)=> {

        const {accessToken, clientData} = response.data;

        signHandler(accessToken, clientData, setClientData, setAccessToken);

        Router.push(routeToNavigate);
        })
        .catch((e) => console.log("Error De Nuevo", e))
    }

  const handleChange = input => e =>{
    console.log(formValues)
    setFormValues({...formValues, [input]: e.target.value})
  }

  return (
    <AuthFormWrapper onSubmit={onSubmit}>
        <TextField
            required
            label="Email"
            autoComplete="off"
            value={formValues.email}
            name="email"
            color="primary"
            variant="standard"
            onChange={handleChange("email")}
            sx={{width: "100%"}}
          />
          <TextField
            label="Código de Verificación"
            autoComplete="off"
            type="text"
            name="verificationCode"
            color="primary"
            variant="standard"
            placeholder="_ _ _ _"
            sx={{width: "100%"}}
            value={formValues.verificationCode}
            onChange={handleChange("verificationCode")}
          />

          <button
          type="submit"
          style={{fontSize: "16px"}}
        className='hero-section-button bg-red font-color-w text-center flex justify-center align-center'
          > Valida
          </button>

          <button
          type="submit"
          style={{fontSize: "16px"}}
        className='hero-section-button bg-red font-color-w text-center flex justify-center align-center'
          > Reenviar Correo
          </button>
    </AuthFormWrapper>
  )
}

export default Verification