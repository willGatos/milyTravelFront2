import CurrencySection from "./CurrencySection";
import ComboSection from "./ComboSection";
import UsersSection from "./UsersSection";

import { useState } from "react";

function Admin() {
  const [adminWindow, setAdminWindow] = useState(0)

  const handleWindowChange = () =>{
    switch(adminWindow){
      case 0:
        return <ComboSection />;

      case 1:
        return <CurrencySection />;

      case 2:
        return <UsersSection />;

      default:
        return <div>
                <p>Error en los Pasos a seguir</p>
               </div>
           }
    }

    const handleButtonOptions = (page) => setAdminWindow(page)
      /* const updateData = (event) => {
        event.preventDefault()
        const accessToken = localStorage.getItem("accessToken");
        const toUpdateObject = {
          comboId: selectedCombo._id,
          updateDTO: updateValues,
        }
        
        axios.post(route, toUpdateObject,{
        headers: {'Authorization': 'Bearer '+ accessToken}
        })
        .then((e)=>{
          console.log(e.data)
          setAllCombos(prevAllCombos => {
            
            const value =  prevAllCombos.map(e => {
                console.log(e.name === selectedCombo.name, e.name, selectedCombo.name)
                if(e.name === selectedCombo.name) {
                    return updateValues;
                }
                return e;
            })
            console.log(prevAllCombos,value);
            return value;
        } )
        setOpenUpdateDialog(false)
          //TODO: Cartel de Operacion Exitosa
        })
        .catch(res => console.log("TODO: Operacion Fallida"))
      } */

  return (
    <div style={{paddingTop: "65px"}}>
      <div className="flex justify-space-evenly">
        <button className="navigationButton" onClick={()=> handleButtonOptions(0)}>Combos</button>
        <button className="navigationButton" onClick={()=> handleButtonOptions(1)}>Dinero</button>
        <button className="navigationButton" onClick={()=> handleButtonOptions(2)}>Usuarios</button>
      </div>
      {handleWindowChange()}
    </div>
  )
}

export default Admin