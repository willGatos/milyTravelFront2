import { Dialog, TextField } from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import provinceAndTownships from '../../helpers/townshipProvince';
import ClearIcon from '@mui/icons-material/Clear';
function AdminDialog({
    openDialog, 
    setOpenDialog, 
    callToActionFunction, 
    Values, 
    setValues, 
    handlePrincipalImageChange,
    isLoading,
    handleData,
    handleChange
}) {
  const onSubmit= (e) =>{
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
          <img 
            style={{width: "90%",height: "94%"}} 
            src={Values.image} 
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
              sx= {{width:"100%"}}
              value={Values.name}
              label={"Nombre"}
              onChange={handleData("name")}
              required
              variant="standard"
            />

            <TextField
              name={"price"}
              sx={{width:"100%"}}
              value={Values.price}
              label={"Precio"}
              onChange={handleData("price")}
              required
              variant="standard"
            />

        <FormControl  variant="standard" fullWidth sx={{width: "100%"}}>
        <InputLabel id="demo-simple-select-label">Disponibilidad Por Provincia</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Values.provinceAvailability[Values.provinceAvailability.length - 1]}
          label="Disponibilidad Por Provincia"
          onChange={(e)=> {
            if(!Values.provinceAvailability.some(province => province === e.target.value ))
            setValues({...Values, provinceAvailability: [...Values.provinceAvailability, e.target.value] })
          }}
        >
          {
          provinceAndTownships.map((e, key)=> 
          <MenuItem key={key} value={e.province}>{e.province}</MenuItem>)
          }
        </Select>
      </FormControl>

        <div className="flex justify-center align-center flex-wrap">
          {Values.provinceAvailability.map((province,key)=>
          <div
          key={key}
          className="flex text-center provinceClearButton"
          onClick={()=>{
            setValues({...Values, provinceAvailability : [
              ...Values.provinceAvailability.filter(date=> date !== province)
            ]
          })
          }}>
            <p>{province}</p>
            <ClearIcon/>
          </div>
          )}
        </div>

            <FormGroup>
                <FormControlLabel control={<Switch 
                checked={Values.isAvailable}
                onChange={handleChange}
                defaultChecked />} label="Disponibilidad" />
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

export default AdminDialog