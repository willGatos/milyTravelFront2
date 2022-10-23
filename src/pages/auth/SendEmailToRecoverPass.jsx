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
import EmailState from "../../common/components/EmailState";
function SendEmailToRecoverPass() {
  const [email, setEmail] = useState("")
  const [stateOfEmail, setStateOfEmail] = useState("")

  const onSubmit = (event) =>{
    event.preventDefault();
    setStateOfEmail("Loading")

    axios.post("https://api.milytravel.net/user/sendEmailToChangePassword", { email })
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
        <EmailState stateOfEmail={stateOfEmail}/>
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