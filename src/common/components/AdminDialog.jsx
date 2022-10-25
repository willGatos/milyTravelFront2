import React from 'react'
import { Dialog, TextField } from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function AdminDialog({
    openDialog, 
    setOpenDialog, 
    updateData, 
    updateValues, 
    handlePrincipalImageChange,
    isLoading,
    handleData,
    handleChange
}) {
  return (
    <div>
        <Dialog 
            open={openDialog}
            onClose={()=>setOpenDialog(false)}>
        <form onSubmit={updateData}
            style={{padding: "80px", gap: "10px"}}
            className='flex justify-center align-center flex-column'>
          <img 
            style={{width: "90%",height: "94%"}} 
            src={updateValues.image} 
            alt=""
          />
            <input 
            type="file" 
            onChange={handlePrincipalImageChange} 
            accept="image/*"
            />
        {isLoading && 
        <div style={{margin: "auto", overflow: "hidden"}} className="spinner-container">
            <div className="loading-spinner"></div>
        </div>}
            <TextField
            name={"name"}
            sx={{width:"100%"}}
            value={updateValues.name}
            label={"Nombre"}
            onChange={handleData("name")}
            required
            variant="standard"
            />

            <TextField
            name={"price"}
            sx={{width:"100%"}}
            value={updateValues.price}
            label={"Precio"}
            onChange={handleData("price")}
            required
            variant="standard"
            />

            <FormGroup>
                <FormControlLabel control={<Switch 
                checked={updateValues.isAvailable}
                onChange={handleChange}
                defaultChecked />} label="Label" />
            </FormGroup>

          <button 
            disabled={isLoading}
            type="submit"
            style={{
                background: "rgb(30, 134, 210)",
                borderRadius: "8px"
            }}
            className='seeComboDialogButton'>
            Actualizar
          </button>
        </form>
      </Dialog>
    </div>
  )
}

export default AdminDialog