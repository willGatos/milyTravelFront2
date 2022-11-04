import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function CurrencyCard({
  setOpenUpdateDialog,
  deleteCombo,
  currency,
  updateOpenDialog,
  setUpdateOpenDialog,
}) {
    const { _id,
            nameOfTheCurrency,
            minimumValueAllowed,
            exchangeRateValuePerDollar,
            intermediateValueToChangeRate,
            underIntermediateValueChargeToSum,
            overIntermediateValueChargeInPercentage,
           } = currency;

  return (
    <Card sx={{ minWidth: "100px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          
        </Typography>
        <Typography variant="h5" component="div">
          {nameOfTheCurrency}
        </Typography>
        <Typography variant="body2">
          Tasa de Cambio Actual: {exchangeRateValuePerDollar}
          <br/>
          Valor Mínimo Permitido: {minimumValueAllowed}
          <br />
          Valor Intermedio para Tasa de Cambio: {intermediateValueToChangeRate}
          <br/>
          Valor Sumado bajo Valor Intermedio: {underIntermediateValueChargeToSum}
          <br/>
          Porcentaje Sumado sobre Valor Intermedio:{overIntermediateValueChargeInPercentage}
        </Typography>
      </CardContent>
      <CardActions>
      <button
          onClick={ ()=> setUpdateOpenDialog(true) }
            style={{
                background: "rgb(30, 134, 210)",
                borderRadius: "8px"
            }}
         size="small"><EditIcon sx={{color: "white"}} color={"white"}/></button>

        <button 
          onClick={()=>deleteCombo(_id)}
          size="small" style={{
            background: "#d21e1e",
            borderRadius: "8px"
        }}><DeleteIcon sx={{color: "white"}} color={"white"}/></button>
      </CardActions>
    </Card>
  )
}

export default CurrencyCard