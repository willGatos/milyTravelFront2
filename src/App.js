import './App.css';
import './styles/globals.css'

import { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";

import combos from './common/helpers/combosRelationship';
import NavbarTop from './common/components/Navbar';
import UserContext from './common/helpers/userContext';

import Cancel from './pages/Cancel';
import Success from './pages/Success';
import SeeCombos from './pages/SeeCombos';

import BuyingCombos from './pages/shop/BuyingCombos';
import SendingMoney from './pages/shop/SendingMoney';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import SendEmailToRecoverPass from './pages/auth/SendEmailToRecoverPass';
import Verification from './pages/auth/Verification';
import PasswordChange from './pages/auth/PasswordChange';
import axios from "axios"
import Home from './pages';
import Admin from './pages/admin';

function App() {

  const [clientData, setClientData] = useState({})
  const [routeToNavigate, setRouteToNavigate] = useState("/")
  const [selectedComboToBuy, setSelectedComboToBuy] = useState({})
  const [accessToken, setAccessToken] = useState("")
  const [newCombos, setNewCombos] = useState(combos)

  return (<>
  <UserContext.Provider value={{
      accessToken,        setAccessToken,
      clientData,         setClientData,
      routeToNavigate,    setRouteToNavigate,
      selectedComboToBuy, setSelectedComboToBuy,
      newCombos,          setNewCombos
    }}>
            <NavbarTop/>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/seeCombos" exact component={SeeCombos}/>
              <Route path="/cancel" exact component={Cancel}/>
              <Route path="/success" exact component={Success}/>

              <Route path="/auth/login" exact component={Login}/>
              <Route path="/auth/register" exact component={Register}/>
              <Route path="/auth/sendEmailToRecoverPass" exact component={SendEmailToRecoverPass}/>
              <Route path="/auth/verification" exact component={Verification}/>
              <Route path="/auth/passwordChange" exact component={PasswordChange}/>

              <Route path="/shop/sendingMoney" exact component={SendingMoney}/>
              <Route path="/shop/buyingCombos" exact component={BuyingCombos}/>

              <Route path="/admin" exact component={Admin}/>
            </Switch>
  </UserContext.Provider>
          </>
          );
}

export default App;
