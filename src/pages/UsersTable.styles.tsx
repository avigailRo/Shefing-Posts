import { TableCell } from '@mui/material';
import { styled } from '@mui/system';
export const User_Div = styled('div')({
    overflow: "auto", maxHeight: "100vh"
})
export const User_Title = styled('h1')({
  alignItems: "center", justifyContent: "center",  display: "flex",color:"#971b4b",fontSize:"8vh",fontFamily: "fantasy"
})
export const TableCells = styled(TableCell)({
    color:"#971b4b",
    fontWeight:'bold', 
    fontSize:'3vh'
})