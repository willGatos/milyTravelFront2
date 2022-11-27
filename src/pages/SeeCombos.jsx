import {useState, useEffect, useContext} from 'react';
import {motion, AnimatePresence} from "framer-motion"
import Dialog from "@mui/material/Dialog"
import UserContext from '../common/helpers/userContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import provinceAndTownships from '../common/helpers/townshipProvince';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function SeeCombos() {

  const {setRouteToNavigate,setSelectedComboToBuy, 
          accessToken, newCombos, setNewCombos} = useContext(UserContext);

  const [actualFilter, setActualFilter] = useState("")
  const [selectedCombo, setSelectedCombo] = useState({name:"", price:"", image: "", provinceAvailability: [], isAvailable: true})
  const [arrayFiltered, setArrayFiltered] = useState(newCombos)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(()=>{
    axios.get("/buys/getComboToUsers")
    .then((response)=> {
      const visibleCombos = response.data;
      setNewCombos(visibleCombos);
    })
  },[])

  const handleChange = (event) => {
    const selected = event.target.value;
    setActualFilter(selected);
  };
  const Router = useHistory()

  useEffect(()=>{

    setArrayFiltered(() => newCombos.filter(combo => {
      if(actualFilter) return  combo.provinceAvailability.includes(actualFilter)
      else return true
    }))
  },[actualFilter, newCombos])

  const OpenDialogAndCheckCombo = (Combo) => {
    setSelectedCombo(Combo)
    setOpenDialog(true)
  }

  return (
    <div style={{paddingTop: "10vh"}}>
      <div className='flex justify-center' style={{marginBottom: "40px"}}>
        <div style={{width: "300px"}}>
        <FormControl variant="standard" fullWidth sx={{width: "100%"}}>
        <InputLabel id="demo-simple-select-label">Seleccionar Destino</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={actualFilter}
            label="Seleccionar Destino"
            onChange={handleChange}
          >
            {provinceAndTownships.map((e, key)=> 
            <MenuItem key={key} value={e.province}>{e.province}</MenuItem>)}
          </Select>
          </FormControl>
        </div>
      </div>
     
      <AnimatePresence>
        <motion.div 
          className='combosContainer'
          animate={{opacity: 1}}
          initial={{opacity:0}}
          exit={{opacity:0}}
          transition={{duration: 0.5 }}
        >
        {arrayFiltered.map((e,key)=> <motion.div 

        animate={{opacity: 1}}
        initial={{opacity:0}}
        exit={{opacity:0}}
        transition={{duration: 0.5 }}
        layout
        onClick={ () => OpenDialogAndCheckCombo(e) }
        key={e.name} >
          <img 
            style={{
            width: "320px",
            borderRadius: "10px",
            marginLeft: "15px",
            marginTop: "20px"
            }} 
            src={e.image}
            alt={e.name + " " + e.price + "Pesos" }
          />
          </motion.div>)}
        </motion.div>
      </AnimatePresence>
      <Dialog 
        open={openDialog}
        onClose={()=>setOpenDialog(false)}>
        <div className='flex justify-center align-center flex-column'>
          <img style={{width: "90%",height: "94%"}}src={selectedCombo.image} alt=""/>
          <p>{selectedCombo.name}</p>
          <p>Disponible en: {selectedCombo.provinceAvailability.map(e => e + ", ")}</p>
          <button 
            onClick={()=>{
              setSelectedComboToBuy(selectedCombo)

              accessToken ?
              Router.push("/shop/buyingCombos") :
              Router.push("/auth/login");

              setRouteToNavigate("/shop/buyingCombos");
            }}
            className='seeComboDialogButton'>Me interesa</button>
        </div>
      </Dialog>
    </div>
  )
}

export default SeeCombos

/**
 *  <Link to={"/"}>
        <div className='goBackComboButton bg-blue font-color-w text-center flex justify-center '>
          <img style={{width:"15px"}} src={LeftArrow} alt="<"/>
        </div>
      </Link> 
 * 
 *  <div className="flex justify-center buttonsContainer">
      
        <button
         className={(actualFilter==="") &&'activeButton'}
         onClick={()=> setActualFilter("")}>Todos</button>
        <button 
          className={(actualFilter==="Mixto") && 'activeButton'}
          onClick={()=> setActualFilter("Mixto")}>Mixto</button>
        <button 
          className={(actualFilter==="Res") && 'activeButton'}
          onClick={()=> setActualFilter("Res")}>Res</button>
      </div>
      <div className="flex justify-center buttonsContainer">
        <button 
         className={(actualFilter==="Pollo") && 'activeButton'}
         onClick={()=> setActualFilter("Pollo")}>Pollo</button>
        <button
          className={actualFilter==="Cerdo" && 'activeButton'}
          onClick={()=> setActualFilter("Cerdo")}>Cerdo</button>
      </div>
 */