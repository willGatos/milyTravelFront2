import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

export default function UsersRows({ 
  row, 
  setOpenEditDialog,
  setUpdateUser,
  setReceiverToUpdate,
  setReceiversUser,
  setOpenReceiverDialog
}) {
  
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.clientName}
        </TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.isAuth ? "Autenticado" : "No Autenticado"}</TableCell>
        <TableCell align="right">
              <button
                onClick={()=>{
                    setOpenEditDialog(true)
                    setUpdateUser(row)
                }}
                    style={{
                        background: "rgb(30, 134, 210)",
                        borderRadius: "8px"
                    }}
                size="small">
                    <EditIcon sx={{color: "white"}} color={"white"}/>
                </button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Destinatarios
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Carnet</TableCell>
                    <TableCell align="right">Botones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.receivers.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.receiverName}
                      </TableCell>
                      <TableCell>{historyRow.carnet}</TableCell>
                      <TableCell>
                        <button 
                        onClick={()=>{
                          setReceiversUser(row)
                          setReceiverToUpdate(historyRow)
                          setOpenReceiverDialog(true)
                          }}>Editar</button>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}