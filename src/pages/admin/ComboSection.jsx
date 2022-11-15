import React from 'react'
import createCombo from '../../common/helpers/CRUD/createData'
import updateData from '../../common/helpers/CRUD/updateData'
import { useState, useEffect, useContext } from "react";
import UserContext from "../../common/helpers/userContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cards from "../../common/components/Cards";
import Compressor from 'compressorjs';
import AdminDialog from "../../common/components/Dialogs/AdminDialog";
import ExchangeRate from "./CurrencySection";
import getData from "../../common/helpers/CRUD/getData";

function ComboSection() {

    const { newCombos } = useContext(UserContext)
    const [allCombos, setAllCombos] = useState(newCombos)
    const [selectedCombo, setSelectedCombo] = useState({})

    const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
    const [openCreateDialog, setOpenCreateDialog] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingForUpdate, setIsLoadingForUpdate] = useState(false)

    useEffect(()=>{
        getData(
          "/buys/getComboToAdmin",
          setAllCombos
        )
      },[])

    useEffect(()=>{
        const accessToken = localStorage.getItem("accessToken")

        if(!accessToken) Router.push("/")
            axios.get("/user/fullUser",{
                headers: {'Authorization': 'Bearer '+ accessToken}
                }
            ).then(e => {
                if(!e.data.isAdmin) Router.push("/")
                }
            )
            .catch( e => console.log(e) )
      },[])

    //TODO:Ver como hacer para que los nuevos combos no sean 
    //     los de los Users, sino, los del Admin
    const [updateValues, setUpdateValues] =  useState ({name:"", price:"", image: "", provinceAvailability: [], isAvailable: true})
    const [toCreateCombo,setToCreateCombo] = useState ({name:"", price:"", image: "", provinceAvailability: [], isAvailable: true})

    const Router = useHistory()

    const handleDataForUpdate = input => e => {
        setUpdateValues({...updateValues, [input]: e.target.value})
      }

    const handleChangeForUpdate = (event) => {
        setUpdateValues({...updateValues, isAvailable : event.target.checked});
      };

    const handleDataForCreating = input => e => {
      setToCreateCombo({...toCreateCombo, [input]: e.target.value})
      }

    const handleChangeForCreating = (event) => {
      setToCreateCombo({...toCreateCombo, isAvailable : event.target.checked});
      };

      const handlePrincipalImageChangeToUpdate = (e) => {
        const file = e.target.files[0];

        setIsLoading(true)

        new Compressor(file, {
            quality: 0.9,

            success(result) {
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
            })},
            error(err) {
              setIsLoading(false)
            },
          })
      }

    const handlePrincipalImageChangeToCreate = (e)=>{
    const file = e.target.files[0];

    setIsLoading(true)

    new Compressor(file, {
        quality: 0.9,

        success(result) {
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
        })},
        error(err) {
          setIsLoading(false)
        },
      })
      }

    const create = ()=>{
        createCombo(
          "/buys/createCombo",
          toCreateCombo,
          setAllCombos,
          setOpenCreateDialog,
          allCombos,
          setIsLoading,
        )
      }

      const update = () => updateData(
          "/buys/combosUpdate",
          selectedCombo,
          updateValues,
          setAllCombos,
          setOpenUpdateDialog,
          setIsLoadingForUpdate
        )
  return (
    <div>
        <div className="flex justify-center">
        <button className="createButton" onClick={()=> setOpenCreateDialog(true)} >Crear Combo</button>
      </div>
    <div
     style={{ flexWrap: "wrap",
      gap: "30px",
      paddingTop: "35px"}}
     className="flex justify-center">
        {allCombos.map((singleCombo, key)=>
            <Cards
              key={key}
              setOpenDialog={setOpenUpdateDialog}
              setSelectedCombo={setSelectedCombo}
              setUpdateValues={setUpdateValues}
              singleCombo={singleCombo}
              allCombos={allCombos}
              setAllCombos={setAllCombos}
            />
            )}

        <AdminDialog
          handleData={handleDataForUpdate}
          handleChange={handleChangeForUpdate}
          setValues={setUpdateValues}
          handlePrincipalImageChange={handlePrincipalImageChangeToUpdate}
          isLoading={isLoading}
          openDialog={openUpdateDialog}
          setOpenDialog={setOpenUpdateDialog}
          callToActionFunction={update}
          Values={updateValues}
        />

        <AdminDialog
          handleData={handleDataForCreating}
          handleChange={handleChangeForCreating}
          handlePrincipalImageChange={handlePrincipalImageChangeToCreate}
          isLoading={isLoading}
          openDialog={openCreateDialog}
          setOpenDialog={setOpenCreateDialog}
          callToActionFunction={create}
          Values={toCreateCombo}
          setValues={setToCreateCombo}
        />
    </div>
    </div>
  )
}

export default ComboSection