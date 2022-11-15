import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import deleteData from '../helpers/CRUD/deleteData';

export default function Cards({
  setOpenDialog,
  setSelectedCombo,
  setUpdateValues,
  singleCombo,
  allCombos,
  setAllCombos,
}) {
  const {_id,
    name, 
    image, 
    price, 
    isAvailable,
    provinceAvailability,} = singleCombo;
  return (
    <Card onClick={()=>{
      setUpdateValues(singleCombo)
      setSelectedCombo(singleCombo)
      }} sx={{ maxWidth: 345, border: `1px solid ${isAvailable ? "#8f6" : "red"}` }}>
      <LazyLoadImage
        alt={name}
        width={"345"}
        height="300"
        src={image} />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Precio: {price} <br/>
          Estado: {isAvailable? "Disponible": "No Disponible"}<br/>
          {provinceAvailability && "Provincia: " + provinceAvailability}
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
            deleteData(
              _id,
              "/buys/CombosDelete/",
              setAllCombos,
              allCombos,
              )
          }}
          size="small" style={{
            background: "#d21e1e",
            borderRadius: "8px"
        }}><DeleteIcon sx={{color: "white"}} color={"white"}/></button>
        
      </CardActions>
    </Card>
  );
}
