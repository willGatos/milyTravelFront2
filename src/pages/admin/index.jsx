import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import combos from "../../common/helpers/combosRelationship";
import Cards from "../../common/components/Cards";
import * as React from 'react';
import Compressor from 'compressorjs';
import AdminDialog from "../../common/components/AdminDialog";

function Admin() {
    const [allCombos, setAllCombos] = useState(combos)
    const [selectedCombo, setSelectedCombo] = useState({})

    const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
    const [openCreateDialog, setOpenCreateDialog] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [updateValues, setUpdateValues] = useState  ({name:"", price:"", image: "", contains: []})
    const [toCreateCombo,setToCreateCombo] = useState ({name:"", price:"", image: "", contains: []})
    
    const Router = useHistory()

    const handleData = input => e =>{
        setUpdateValues({...updateValues, [input]: e.target.value})
      }

    const handleChange = (event) => {
        setUpdateValues({...updateValues, isAvailable : event.target.checked});
      };

    const handlePrincipalImageChange = (e)=>{
        const file = e.target.files[0];

        setIsLoading(true)

        new Compressor(file, {
            quality: 0.9,

            success(result) {
              console.log(isLoading)
              const formData = new FormData();
              formData.append("file", result)
              formData.append("upload_preset", `zfvhwnfp`)
              axios.post("https://api.cloudinary.com/v1_1/milytravel/image/upload",formData)
              .then(e =>{
                const url = e.data.secure_url;
                setUpdateValues( { ...selectedCombo, image: url } );
                setIsLoading(false)
                return url;
            })
      
            .catch( e => {
                
              setIsLoading(false)
              console.log(e)
            })},
            error(err) {
              setIsLoading(false)
              console.log("error2",err);
            },
          })
  }

  const createCombo = () =>{
    setAllCombos([...allCombos, toCreateCombo])
  }

  const updateData = (event)=>{
    event.preventDefault()
    console.log("hola");
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

  }

  const deleteCombo = (name) => {
    const accessToken = localStorage.getItem("accessToken")
    setAllCombos(allCombos.filter(e => e.name !== name))
    /* axios.delete(`http://localhost:3001/buys/combos/${id}`,{
            headers: {'Authorization': 'Bearer '+ accessToken}
            })
        .then(e => {if(!e.data.isAdmin) Router.push("/")})
        .catch( e => console.log(e) ) */
  }

    useEffect(()=>{
        const accessToken = localStorage.getItem("accessToken")

        /* if(!accessToken) Router.push("/")
        axios.get("http://localhost:3001/user/fullUser",{
            headers: {'Authorization': 'Bearer '+ accessToken}
            }
        ).then(e => {
            if(!e.data.isAdmin) Router.push("/")
            }
        )
        .catch( e => console.log(e) ) */

    })

  return (
    <div
     style={{flexWrap: "wrap", gap: "30px", paddingTop: "65px"}}
     className="flex justify-center">
        <button >Crear Combo</button>
        {allCombos.map((singleCombo, key)=>        
        <div 
        key={key}
        onClick={ ()=> {
            setSelectedCombo(singleCombo)
            setUpdateValues(singleCombo)
            } }>
            <Cards 
             comboName={singleCombo.name}
             imageUrl={singleCombo.image}
             price={singleCombo.price}
             isAvailable={singleCombo.isAvailable}
             setOpenDialog={setOpenUpdateDialog}
             deleteCombo={deleteCombo}
            />
        </div>)}

        <AdminDialog
        handleData={handleData}
        handlePrincipalImageChange={handlePrincipalImageChange}
        isLoading={isLoading}
        openDialog={setOpenUpdateDialog}
        setOpenDialog={setOpenUpdateDialog}
        updateData={updateData}
        updateValues={updateValues}
        />
        
    </div>
  )
}

export default Admin