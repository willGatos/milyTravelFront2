import React from 'react'

function AuthFormWrapper({onSubmit, children}) {
  return (
    <div className="authContainer align-center flex flex-column justify-center" style={{}}>
      <form style={{paddingTop: "30px"}} onSubmit={onSubmit}>
        <div className="formContainer align-center flex flex-column justify-center relative">
            {children}
        </div>
      </form>
    </div>
  )
}

export default AuthFormWrapper