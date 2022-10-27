import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Cards({
  _id,
  comboName, 
  imageUrl, 
  price, 
  isAvailable, 
  setOpenDialog,
  deleteCombo,
  setSelectedCombo,
  setUpdateValues,
  singleCombo
}) {
  return (
    <Card onClick={()=>{
      setUpdateValues(singleCombo)
      setSelectedCombo(singleCombo)
      }} sx={{ maxWidth: 345, border: `1px solid ${isAvailable ? "#8f6" : "red"}` }}>
      <LazyLoadImage
        alt={comboName}
        width={"345"}
        height="300"
        src={imageUrl} />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {comboName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Precio: {price} <br/>
          Estado: {isAvailable? "Disponible": "No Disponible"}

        </Typography>
      </CardContent>
      <CardActions>
        <button
          onClick={()=>setOpenDialog(true)}
            style={{
                background: "rgb(30, 134, 210)",
                borderRadius: "8px"
            }}
         size="small"><EditIcon sx={{color: "white"}} color={"white"}/></button>

        <button 
          onClick={()=>{
            deleteCombo(_id)
          }}
          size="small" style={{
            background: "#d21e1e",
            borderRadius: "8px"
        }}><DeleteIcon sx={{color: "white"}} color={"white"}/></button>
        
      </CardActions>
    </Card>
  );
}
