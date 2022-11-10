import React, {useState} from 'react'
import UserDialog from '../Dialogs/UserDialog'
import updateData from '../../helpers/CRUD/updateData'

function UserAdminDialogs({
  setAllUser,
  selectedUser,
  updateOpenDialog,
  setUpdateOpenDialog,
  updateUser,
  setUpdateUser
}) {

    const [updateIsLoading, setUpdateIsLoading] = useState(false)

    const handleDataForUpdate = input => e => setUpdateUser({...updateUser, [input]: e.target.value})

    const handleChangeForCreating = (event) => {
        console.log(event.target.checked)
        setUpdateUser({...updateUser, isAuth : event.target.checked})};

    const update = () => updateData(
        "/user/updateUser",
        selectedUser, 
        updateUser,
        setAllUser,
        setUpdateOpenDialog,
        setUpdateIsLoading,
      )

  return (
    <div>
        <UserDialog
            openDialog={updateOpenDialog} 
            setOpenDialog={setUpdateOpenDialog}
            updateValues={updateUser}
            isLoading={updateIsLoading}
            callToActionFunction={update}
            handleData={handleDataForUpdate}
            handleChange={handleChangeForCreating}
        />
    </div>
  )
}

export default UserAdminDialogs