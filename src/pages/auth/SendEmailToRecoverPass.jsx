import BarInput from "../../common/components/BarInput"
import Button from "../../common/components/Button"
import AuthFormWrapper from "../../common/components/AuthFormWrapper"
import signHandler from "../../common/helpers/signHandler";
import UserContext from "../../common/helpers/userContext";
import { TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from '@mui/material/Stack';

function SendEmailToRecoverPass() {
  const [email, setEmail] = useState("")
  const [stateOfEmail, setStateOfEmail] = useState("")

  const onSubmit = (event) =>{
    event.preventDefault();
    setStateOfEmail("Loading")

    axios.post("http://localhost:3001/user/sendEmailToChangePassword", { email })
    .then((response)=>{
      if(response.data) setStateOfEmail("success")
      else setStateOfEmail("fail")
    })
    .catch(()=>setStateOfEmail("fail"))
  }

  const handleData = e => setEmail(e.target.value)

  return (
  <>
  <div style={{zIndex: "15",top: "50px",left: "50%",transform: "translate(-50%,50%)",width: "202px"}}
   className="absolute">
      {stateOfEmail !== "" &&
      <Stack sx={{ width: '100%',  }} spacing={2}>
      {stateOfEmail == "fail"
          && <Alert severity="error">Error en el Envío</Alert>}
          {stateOfEmail == "success" 
          && <Alert severity="success">Envío Éxitoso</Alert>}
          {stateOfEmail == "Loading"
          && <Alert severity="info">Cargando</Alert>}
      </Stack>
      }
  </div>
      <AuthFormWrapper onSubmit={onSubmit}>
        <h3>Cambiar Contraseña</h3>
        <p>¿Has olvidado tú contraseña? Te tenemos cubierto. Escribe tú correo y sigue los pasos.</p>
        <TextField
          name={"email"}
          sx={{width:"100%"}}
          value={email}
          label={"Email"}
          onChange={handleData}
          required
          variant="standard"
        />
        <button
        style={{fontSize: "16px"}}
        className='hero-section-button bg-red font-color-w text-center flex justify-center align-center'
        type="submit">Enviar Email</button>
      </AuthFormWrapper>
    </>
  )
}

export default SendEmailToRecoverPass