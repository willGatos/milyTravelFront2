import {useEffect} from 'react';
import { Dialog, TextField } from '@mui/material';
import updateData from '../helpers/CRUD/updateData';
import createCombo from '../helpers/CRUD/createData';

function CurrencyDialog({
    openDialog, 
    setOpenDialog,  
    updateValues,
    isLoading,
    callToActionFunction,
    handleData,
}) {

  return (
    <div>
        <Dialog 
            open={openDialog}
            onClose={() => setOpenDialog(false)}>
        <form onSubmit={callToActionFunction}
            style={{padding: "20px", gap: "10px"}}
            className='flex justify-center align-center flex-column'>

        {isLoading && 
        <div style={{margin: "auto", overflow: "hidden"}} className="spinner-container">
            <div className="loading-spinner"></div>
        </div>}
            <TextField
              name={"nameOfTheCurrency"}
              sx={{width:"100%"}}
              value={updateValues.nameOfTheCurrency}
              label={"Nombre"}
              onChange={handleData("nameOfTheCurrency")}
              required
              variant="standard"
            />

            <TextField
              name={"exchangeRateValuePerDollar"}
              sx={{width:"100%"}}
              value={updateValues.exchangeRateValuePerDollar}
              label={"Tasa de Cambio Actual por USD"}
              onChange={handleData("exchangeRateValuePerDollar")}
              required
              variant="standard"
            />

            <TextField
              name={"minimumValueAllowed"}
              sx={{width:"100%"}}
              value={updateValues.minimumValueAllowed}
              label={"Valor Mínimo Aceptado"}
              onChange={handleData("minimumValueAllowed")}
              required
              variant="standard"
            />

            <TextField
              name={"intermediateValueToChangeRate"}
              sx={{width:"100%"}}
              value={updateValues.intermediateValueToChangeRate}
              label={"Cantidad Intermedia para Cambio de Cargo"}
              onChange={handleData("intermediateValueToChangeRate")}
              required
              variant="standard"
            />

            <TextField
              name={"underIntermediateValueChargeToSum"}
              sx={{width:"100%"}}
              value={updateValues.underIntermediateValueChargeToSum}
              label={"Cantidad Sumada bajo valor Intermedio Cargo"}
              onChange={handleData("underIntermediateValueChargeToSum")}
              required
              variant="standard"
            />

            <TextField
              name={"overIntermediateValueChargeInPercentage"}
              sx={{width:"100%"}}
              value={updateValues.overIntermediateValueChargeInPercentage}
              label={"Cargo Porcentual sobre valor Intermedio"}
              onChange={handleData("overIntermediateValueChargeInPercentage")}
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

export default CurrencyDialog