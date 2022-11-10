import {useEffect} from 'react'
import { Dialog, TextField } from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function UserDialog({
    openDialog,
    setOpenDialog,
    callToActionFunction,
    updateValues,
    isLoading,
    handleData,
    handleChange
}) {
  const onSubmit= (e) => {
    e.preventDefault()
    callToActionFunction()
  }
  return (
    <div>
        <Dialog 
            open={openDialog}
            onClose={()=>setOpenDialog(false)}>
        <form onSubmit={onSubmit}
            style={{padding: "80px", gap: "10px"}}
            className='flex justify-center align-center flex-column'>
        {isLoading && 
        <div style={{margin: "auto", overflow: "hidden"}} className="spinner-container">
            <div className="loading-spinner"></div>
        </div>}
            <TextField
              name={"clientName"}
              sx={{width:"100%"}}
              value={updateValues.clientName}
              label={"Nombre"}
              onChange={handleData("clientName")}
              required
              variant="standard"
            />

            <TextField
              name={"email"}
              sx={{width:"100%"}}
              value={updateValues.email}
              label={"Precio"}
              onChange={handleData("email")}
              required
              variant="standard"
            />

            <FormGroup>
                <FormControlLabel 
                control={
                <Switch
                checked={updateValues.isAuth}
                onChange={handleChange} />
                }
                label="Autenticación" />
            </FormGroup>

            <div className="flex justify-center">
              <button 
                disabled={isLoading}
                onClick={()=>setOpenDialog(false)}
                style={{
                  background: "rgb(210, 30, 30)",
                  borderRadius: "8px"
                }}
                className='seeComboDialogButton'>
                Cancelar
              </button>
              <button 
                disabled={isLoading}
                type="submit"
                style={{
                    background: "rgb(30, 134, 210)",
                    borderRadius: "8px"
                }}
                className='seeComboDialogButton'>
                Guardar
              </button>
            </div>
        </form>
      </Dialog>
    </div>
  )
}

export default UserDialog