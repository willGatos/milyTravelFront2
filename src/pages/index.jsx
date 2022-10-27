import { useState,useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import { Dialog } from '@mui/material'
import socialNetworkItems from '../common/helpers/socialNetwork'
import contactItems from '../common/helpers/contact'
import UserContext from '../common/helpers/userContext'

import BarInput from '../common/components/BarInput'
import BarInputMultirow from '../common/components/BarInputMultirow'
import ComboCarousel from '../common/components/ComboCarousel'

import ArrowRight from "../public/ArrowRight.svg"
import MilyTravel from "../public/MilyTravel.png"
import axios from 'axios'
import EmailState from '../common/components/EmailState'

export default function Home() {
  const [sendEmailObject, setSendEmailObject] = useState({
    name: "",
    email: "",
    emailBody: "",
  })
  const [stateOfEmail, setStateOfEmail ] = useState("")
  const {accessToken,           setAccessToken, 
         setSelectedComboToBuy, setRouteToNavigate} = useContext(UserContext);
  const Router = useHistory()

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
    setRouteToNavigate("/");
  }, [])

  const [selectedCombo, setSelectedCombo] = useState({
    name: "Combo Mixto 1",
    price: "105",
    image: "https://res.cloudinary.com/dq98mlb66/image/upload/v1666563055/Combo_Mixto_1_zmzsrk.jpg",
    contains: ["Mixto","Pollo"],
    isAvailable: true
  })
  const [openDialog, setOpenDialog] = useState(false)

  const sendEmail = () => {
    setStateOfEmail("Loading")
    axios.post("https://api.milytravel.net/user/sendSuggestion", sendEmailObject)
    .then(()=>  {
      setStateOfEmail("success")
      setTimeout(()=>{
        setStateOfEmail("")
      },5000)
    })
    .catch(()=> {
      setTimeout(()=>{setStateOfEmail("")},3000)
      setStateOfEmail("fail")
    })
    }

  const OpenDialogAndCheckCombo = (Combo) => {
    setSelectedCombo(Combo)
    setOpenDialog(true)
  }

  return (
    <div>
      <main className="main height-100 flex justify-center align-end flex-column">
        <div className='responsiveMainContent width-40 height-100 font-color-w bg-black flex justify-center align-start flex-column'>
          <div style={{padding: "0 50px"}} >
            <h1>Ayuda a tus seres queridos ahora mismo</h1>
            <p style={{fontSize: "20px"}}>Enviales una pequeña remesa o uno de nuestros suplementos alimenticios.</p>
            <button 
            onClick={()=>{
              accessToken ?
              Router.push("/shop/sendingMoney") :
              Router.push("/auth/login");
              setRouteToNavigate("/shop/sendingMoney");
            }}
            className='hero-section-button bg-red font-color-w text-center flex justify-center align-center'>
              <span 
                style={{marginRight: "15px", fontSize: "20px"}}
              >
                  Enviar Remesa 
                </span>
              <img
                width={"15px"} 
                height={ArrowRight.height}
                src={ArrowRight} alt=">"
              />
            </button>
          </div>
        </div>
      </main>
      <section className='HomeMiddleSection' style={{margin: "70px 0"}}>
        <div className='flex flex-column justify-center align-center text-center'>
          <h3>Seleccione el combo correcto</h3>
          {<ComboCarousel
            selectedCombo={selectedCombo}
            OpenDialogAndCheckCombo={OpenDialogAndCheckCombo}
          />}
          <Link
            style={{margin: "25px 0"}}
            to={"/seeCombos"}
            >
            <div 
              style={{margin: "15px"}} 
              className='hero-section-button bg-red font-color-w text-center flex justify-center align-center'
              onClick={()=>{
                setRouteToNavigate("/shop/buyingCombos")
              }}
              >
              Ver Todos
            </div>
          </Link>
        </div>
      </section>

      <footer className='home-page-footer' >
        <div
          style={{borderRadius: "7px"}}
          className='contact-container flex justify-space-evenly align-center box-shadow-basic relative'
        >
          <section className='flex flex-column contactFormDimensions'>
          <div 
            style={{zIndex: "15",top: "50px",left: "50%",
                    transform: "translate(-50%,50%)",
                    width: "202px"}}

            className="absolute">
                {stateOfEmail !== "" &&
                  <EmailState stateOfEmail={stateOfEmail}/>
                }
          </div>
            <div>
              <h3>Estamos a tú disposición</h3>
              <p>¿Cómo podemos ayudarte?</p>
            </div>
              <BarInput
                name={"name"}
                label={"Nombre"}
                value={sendEmailObject.name}
                object={sendEmailObject}
                setObject={setSendEmailObject}
              />
              <BarInput
                name={"email"}
                label={"Email"}
                value={sendEmailObject.email}
                object={sendEmailObject}
                setObject={setSendEmailObject}
              />
              <BarInputMultirow
                name={"emailBody"}
                row={"4"}
                label={"Mensaje"}
                value={sendEmailObject.emailBody}
                object={sendEmailObject}
                setObject={setSendEmailObject}
              />
              <button
                onClick={()=>sendEmail()}
                style={{marginTop: "20px"}}
                className='contact-section-button bg-red font-color-w text-center flex justify-center align-center'
              >
                Enviar
              </button>
          </section>
          <hr className="absolute footerBarDimensions"/>
          <section style={{width: "37%"}} className='flex flex-column justify-center align-center'>
            <div className='flex flex-column'>
            {contactItems.map((WayToContact, key)=>(
              <a 
                style={{marginBottom: "20px"}}
                rel="noreferrer" 
                className='flex align-center'
                target="_blank" 
                key={key} 
                href={WayToContact.href}>

                <img
                  style={{height: WayToContact.height, marginRight: "15px"}} 
                  src={WayToContact.iconRef}
                  alt=""
                  />

                <span>{WayToContact.text}</span>
              </a>
            ))}
            </div>
            <div style={{width: "200px"}} className='flex justify-space-around align-center'>
            {socialNetworkItems.map((socialNetwork, key)=> (
              <a target="_blank" rel="noreferrer" key={key} href={socialNetwork.href}>
                <img style={{height: socialNetwork.height}} src={socialNetwork.iconRef}/>
              </a>
            ))}
            </div>
          </section>
          <img className='logoFromContact absolute' src={MilyTravel} alt=""/>
        </div>
      </footer>
      <Dialog 
        open={openDialog}
        onClose={()=>setOpenDialog(false)}>
        <div className='flex justify-center align-center flex-column'>
          <img 
            style={{width: "90%",height: "94%"}} 
            src={selectedCombo.image} 
            alt=""
          />
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
