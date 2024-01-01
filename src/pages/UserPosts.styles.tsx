import { Snackbar } from '@mui/material';
import { styled } from '@mui/system';
export const Post_Div = styled('div')({
    overflow: "auto", maxHeight: "100vh", width: "130vh"
})
export const SnackBar=styled(Snackbar)({
    position: "absolute", top: "300px" 
})
export const Post_Title = styled('h1')({
    alignItems: "center", justifyContent: "center",  display: "flex"
  })