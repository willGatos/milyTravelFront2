import {useState, useEffect, useContext} from 'react';
import combos from "../common/helpers/combosRelationship"
import {motion, AnimatePresence} from "framer-motion"
import Dialog from "@mui/material/Dialog"
import UserContext from '../common/helpers/userContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


function SeeCombos() {

  const {setRouteToNavigate,setSelectedComboToBuy, 
          accessToken, newCombos, setNewCombos} = useContext(UserContext);

  const [actualFilter, setActualFilter] = useState("")
  const [selectedCombo, setSelectedCombo] = useState(newCombos[0])
  const [arrayFiltered, setArrayFiltered] = useState(newCombos)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(()=>{
    axios.get("http://localhost:3001/buys/getComboToUsers")
    .then((response)=> {
      const visibleCombos = response.data
      console.log("vis",visibleCombos)
      setNewCombos(visibleCombos)
    })
  },[])

  const Router = useHistory()

  useEffect(()=>{
    console.log("Combos",combos)
    setArrayFiltered(() => newCombos.filter(combo => {
      console.log(combo.contains.includes(actualFilter))
      if(actualFilter) return  combo.contains.includes(actualFilter)
      else return true
    }))
  },[actualFilter, newCombos])

  const OpenDialogAndCheckCombo = (Combo) => {
    setSelectedCombo(Combo)
    setOpenDialog(true)
  }

  return (
    <div style={{paddingTop: "10vh"}}>
      {/* <Link to={"/"}>
        <div className='goBackComboButton bg-blue font-color-w text-center flex justify-center '>
          <img style={{width:"15px"}} src={LeftArrow} alt="<"/>
        </div>
      </Link> */}
      <div className="flex justify-center buttonsContainer">
      
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