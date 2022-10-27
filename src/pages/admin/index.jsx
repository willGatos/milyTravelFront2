import { useState, useEffect, useContext } from "react";
import UserContext from "../../common/helpers/userContext";
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


    const { newCombos, setNewCombos } = useContext(UserContext)
    const [updateValues, setUpdateValues] =  useState ({name:"", price:"", image: "", contains: [], isAvailable: true})
    const [toCreateCombo,setToCreateCombo] = useState ({name:"", price:"", image: "", contains: [], isAvailable: true})

    const Router = useHistory()

    const handleDataForUpdate = input => e =>{
        setUpdateValues({...updateValues, [input]: e.target.value})
      }

    const handleChangeForUpdate = (event) => {
        setUpdateValues({...updateValues, isAvailable : event.target.checked});
      };

    const handleDataForCreating = input => e =>{
      setToCreateCombo({...toCreateCombo, [input]: e.target.value})
      }

    const handleChangeForCreating = (event) => {
      setToCreateCombo({...toCreateCombo, isAvailable : event.target.checked});
      };

      const handlePrincipalImageChangeToUpdate = (e)=>{
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
      const handlePrincipalImageChangeToCreate = (e)=>{
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
            setToCreateCombo( { ...toCreateCombo, image: url } );
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

      const createCombo = (event) =>{
        const accessToken = localStorage.getItem("accessToken");
        event.preventDefault()
        axios.post("https://api.milytravel.net/buys/createCombo",toCreateCombo,{
        headers: {'Authorization': 'Bearer '+ accessToken}
        })
        .then((e)=>{
          setAllCombos([toCreateCombo, ...allCombos])
          //TODO: Cartel de Operacion Exitosa
        })
        .catch(res => console.log("TODO: Operacion Fallida"))
        
      }

      const updateData = (event)=>{
        event.preventDefault()
        const accessToken = localStorage.getItem("accessToken");
        const toUpdateObject = {
          comboId: selectedCombo._id,
          updateDTO: updateValues,
        }
        
        axios.post("https://api.milytravel.net/buys/combosUpdate", toUpdateObject,{
        headers: {'Authorization': 'Bearer '+ accessToken}
        })
        .then((e)=>{
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
       

      }

      const deleteCombo = (_id) => {
        const accessToken = localStorage.getItem("accessToken")
        axios.delete(`https://api.milytravel.net/buys/CombosDelete/${_id}`,{
          headers: {'Authorization': 'Bearer '+ accessToken}
        })
        .then(e => {
          setAllCombos(allCombos.filter(e => e._id !== _id));
        })
        .catch(e => console.log(e) )
      }

      useEffect(()=>{
        axios.get("https://api.milytravel.net/buys/getComboToUsers")
        .then((response)=> {
          const visibleCombos = response.data
          console.log("vis" , visibleCombos)
          setAllCombos(visibleCombos)
        })
      },[])

      useEffect(()=>{
        const accessToken = localStorage.getItem("accessToken")

        if(!accessToken) Router.push("/")
            axios.get("https://api.milytravel.net/user/fullUser",{
                headers: {'Authorization': 'Bearer '+ accessToken}
                }
            ).then(e => {
                if(!e.data.isAdmin) Router.push("/")
                console.log("isAdmin ",e.data.isAdmin)
                }
            )
            .catch( e => console.log(e) )
      },[])

  return (
    <div
     style={{flexWrap: "wrap", gap: "30px", paddingTop: "65px"}}
     className="flex justify-center">
        <button onClick={()=> setOpenCreateDialog(true)} >Crear Combo</button>
        {allCombos.map((singleCombo, key)=>
        <div 
        key={key}
        onClick={ ()=> {
          console.log(singleCombo)
          setSelectedCombo(singleCombo)
          setUpdateValues(singleCombo)
        }}>
            <Cards
              _id={singleCombo._id}
              comboName={singleCombo.name}
              imageUrl={singleCombo.image}
              price={singleCombo.price}
              isAvailable={singleCombo.isAvailable}
              setOpenDialog={setOpenUpdateDialog}
              deleteCombo={deleteCombo}
            />
        </div>)}

        <AdminDialog
          handleData={handleDataForUpdate}
          handleChange={handleChangeForUpdate}
          handlePrincipalImageChange={handlePrincipalImageChangeToUpdate}
          isLoading={isLoading}
          openDialog={openUpdateDialog}
          setOpenDialog={setOpenUpdateDialog}
          callToActionFunction={updateData}
          updateValues={updateValues}
        />

        <AdminDialog
          handleData={handleDataForCreating}
          handleChange={handleChangeForCreating}
          handlePrincipalImageChange={handlePrincipalImageChangeToCreate}
          isLoading={isLoading}
          openDialog={openCreateDialog}
          setOpenDialog={setOpenCreateDialog}
          callToActionFunction={createCombo}
          updateValues={toCreateCombo}
        />
    </div>
  )
}

export default Admin