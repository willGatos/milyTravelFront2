import { Dialog, TextField } from '@mui/material'

export default function ReceiverDialog({
    openDialog, 
    setOpenDialog, 
    callToActionFunction, 
    updateValues, 
    isLoading,
    handleData,
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

            <TextField
              name={"receiverName"}
              sx={{width:"100%"}}
              value={updateValues.receiverName}
              label={"Nombre"}
              onChange={handleData("receiverName")}
              required
              variant="standard"
            />

            <TextField
              name={"phone"}
              sx={{width:"100%"}}
              value={updateValues.phone}
              label={"Precio"}
              onChange={handleData("phone")}
              required
              variant="standard"
            />

            <TextField
              name={"carnet"}
              sx={{width:"100%"}}
              value={updateValues.carnet}
              label={"Carner"}
              onChange={handleData("carnet")}
              required
              variant="standard"
            />

            <TextField
              name={"province"}
              sx={{width:"100%"}}
              value={updateValues.province}
              label={"Provincia"}
              onChange={handleData("province")}
              required
              variant="standard"
            />

            <TextField
              name={"township"}
              sx={{width:"100%"}}
              value={updateValues.township}
              label={"Municipio"}
              onChange={handleData("township")}
              required
              variant="standard"
            />

            <TextField
              name={"distribution"}
              sx={{width:"100%"}}
              value={updateValues.distribution}
              label={"Reparto"}
              onChange={handleData("distribution")}
              required
              variant="standard"
            />

            <TextField
              name={"principalStreet"}
              sx={{width:"100%"}}
              value={updateValues.principalStreet}
              label={"Calle Principal"}
              onChange={handleData("principalStreet")}
              required
              variant="standard"
            />

            <TextField
              name={"middleStreets"}
              sx={{width:"100%"}}
              value={updateValues.middleStreets}
              label={"Entre Calles"}
              onChange={handleData("middleStreets")}
              required
              variant="standard"
            />

            <TextField
              name={"buildingNumber"}
              sx={{width:"100%"}}
              value={updateValues.buildingNumber}
              label={"Número"}
              onChange={handleData("buildingNumber")}
              required
              variant="standard"
            />

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