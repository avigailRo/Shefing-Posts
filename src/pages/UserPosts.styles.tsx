import { Button, Snackbar } from '@mui/material';
import { styled } from '@mui/system';
export const Post_Div = styled('div')({
    overflow: "auto", maxHeight: "100vh", width: "130vh"
})
export const SnackBar=styled(Snackbar)({
    position: "absolute", top: "300px" 
})
export const Post_Title = styled('h1')({
    alignItems: "center", justifyContent: "center",  display: "flex",color:"#971b4b",fontSize:"8vh",fontFamily: "fantasy",opacity:"0.5"
})
export const Create_Button=styled(Button)({
backgroundColor:"#971b4b"
})
export const Content_Div = styled('div')({
    border: "2px solid #971b4b",
    width:"80vh",
    borderRadius: "2vh",
    padding: "20px"
})