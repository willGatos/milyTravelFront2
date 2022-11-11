import {useState, useEffect} from 'react'
import getData from '../../common/helpers/CRUD/getData'
import { TextField } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UserAdminDialogs from '../../common/components/admin/AdminEditUsersDialog';
import axios from 'axios';
import UsersRows from '../../common/components/admin/UsersRows';
import updateData from '../../common/helpers/CRUD/updateData';
import ReceiverDialog from '../../common/components/Dialogs/ReceiverDialog';

function UsersSection() {

    const [searchBarValue, setSearchBarValue] = useState("")

    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [openReceiverDialog, setOpenReceiverDialog] = useState(false)

    const [receiversUser, setReceiversUser] = useState({})
    const [updateUser, setUpdateUser] = useState({
        clientName:"William",
        email:"ironmorew@gmail.com",
        isAuth: true,
        receivers: []
    })
    const [allUsers, setAllUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [receiverToUpdate, setReceiverToUpdate] = useState({
        receiverName:"",
        phone:"",
        township: "",
        province : "",
        distribution: "",
        principalStreet : "",
        middleStreets : "",
        buildingNumber: "",
        apartment: "",
        carnet: ""
    })

    const receiverUpdate = () => {
      const accessToken = localStorage.getItem('accessToken')
      const toSendData = { receiverToUpdate, receiverId : receiverToUpdate._id }
      axios.patch("/user/updateReceiver", toSendData,{
        headers: {'Authorization': 'Bearer '+ accessToken}
      })
      .then(e => {
        setAllUsers(prevUsers => {
          return prevUsers.map(user => {
            if(receiversUser.clientName == user.clientName)
            {
              user.receivers = user.receivers.map( receiver => {
                if (receiver._id === receiverToUpdate._id) receiver = receiverToUpdate
                return receiver;
              })
            }
            console.log('User Charge',user);
            return user;
          })
          
        })
        setOpenReceiverDialog(false)
      })
      .catch(e => console.log(e))
    }

    useEffect(()=>{
        const accessToken = localStorage.getItem("accessToken")
        axios.get("/user/getUsersForAdmin",{
            headers: {'Authorization': 'Bearer '+ accessToken}
        })
        .then((response)=> {
            const visibleCombos = response.data
            setAllUsers     (visibleCombos)
        }).catch(e=> console.log(e))

   },[])

    const handleData = (event) => {
        const text = event.target.value;
        setSearchBarValue(text);
    }

    const handleDataReceiver = input => e => setReceiverToUpdate({...receiverToUpdate, [input]: e.target.value})

  return (
    <div className='flex justify-center align-center flex-column'>
      <div style={{margin: "15px"}} className='flex justify-center'>
        <TextField 
          name={"nameOfTheCurrency"}
          sx={{ width : "300px" }}
          value={searchBarValue}
          label={"Filtrar Por Correo"}
          onChange={handleData}
          required
        />
      </div>
      <div style={{width: "95%"}} className="flex justify-center align-center">
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Destinatarios</TableCell>
            <TableCell>Nombre del Usuario</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right">Botones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.filter((val)=>{
                if(searchBarValue===""){
                    return val;
                } else if (val.email.toLowerCase().includes(searchBarValue.toLowerCase())){
                    return val;
                }
              }).map((user) => (
                    <UsersRows 
                        row={user} 
                        setOpenEditDialog = {setOpenEditDialog} 
                        setUpdateUser={setUpdateUser}
                        setReceiverToUpdate={setReceiverToUpdate}
                        setReceiversUser={setReceiversUser}
                        setOpenReceiverDialog={setOpenReceiverDialog}
                    />
            

          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>

    <UserAdminDialogs
        setAllUser       =    {setAllUsers}
        selectedUser     =    {updateUser}
        updateOpenDialog =    {openEditDialog}
        setUpdateOpenDialog = {setOpenEditDialog}
        updateUser       =    {updateUser}
        setUpdateUser    =    {setUpdateUser}
    />

    <ReceiverDialog
      updateValues  = {receiverToUpdate}
      openDialog    = {openReceiverDialog}
      setOpenDialog = {setOpenReceiverDialog}
      callToActionFunction = {receiverUpdate}
      isLoading     = {isLoading}
      handleData    = {handleDataReceiver}
    />

    </div>
  )
}

export default UsersSection