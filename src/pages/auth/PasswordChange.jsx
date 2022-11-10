import React, { useState } from 'react';
import AuthFormWrapper from "../../common/components/AuthFormWrapper";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { TextField } from '@mui/material';

function PasswordChange() {
    const [passwordConfirmation, setPasswordConfirmation] = useState({
        password: "",
        passwordConfirmation: ""
      })

      const [stateOfPasswordSended, setStateOfPasswordSended] = useState("")
      const Router = useHistory();
      const { jwt } = Router.query

      const onSubmit = (event)=>{
        event.preventDefault();

        setStateOfPasswordSended("Loading")

        axios.post("/user/changePassword", {
            password: passwordConfirmation.password,
            jwt
        })
        .then(()=>{
          setStateOfPasswordSended("changed")
          setTimeout(()=>Router.push("/"),3000)
        })
        .catch(()=>setStateOfPasswordSended("fail"))
      }

      const handleData = input => e =>{
        setPasswordConfirmation({...passwordConfirmation, [input]: e.target.value})
      }

      return (
        <> 
          <AuthFormWrapper onSubmit={onSubmit}>
            <h3 style={{textAlign: "center"}}>Escriba su Nueva Contraseña</h3>
            <TextField
              type={"password"}
              name={"password"}
              sx={{width:"100%"}}
              value={passwordConfirmation.password}
              label={"Contraseña"}
              onChange={handleData("password")}
              required
              variant="standard"
            />
          <TextField
            type={"password"}
            name={"confirmationPassword"}
            sx={{width:"100%"}}
            value={passwordConfirmation.confirmationPassword}
            label={"Confirmación Contraseña"}
            onChange={handleData("confirmationPassword")}
            required
            variant="standard"
          />
          {passwordConfirmation.password !== passwordConfirmation.confirmationPassword 
          && <p>Las Contraseñas no son Iguales</p>}
              <button
              className='hero-section-button bg-red font-color-w text-center flex justify-center align-center'
               type='submit' >Cambiar Contraseña</button>
          </AuthFormWrapper>
        </>
      )
}

export default PasswordChange