import React from 'react'
import { Stack, Alert } from '@mui/material'
import { motion } from 'framer-motion'
function EmailState({stateOfEmail}) {
  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}>
        <Stack sx={{ width: '100%',  }} spacing={2}>
          {stateOfEmail === "fail"
          && <Alert severity="error">  Error en el Envío</Alert>}
          {stateOfEmail === "success" 
          && <Alert severity="success">Envío Éxitoso    </Alert>}
          {stateOfEmail === "Loading"
          && <Alert severity="info">   Cargando         </Alert>}
      </Stack>
    </motion.div>
  )
}

export default EmailState