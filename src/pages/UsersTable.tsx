// UsersTable.js
import React, { useState, useEffect } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserPosts from './UserPosts';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { getUsers } from '../apiCalls/userCalls';
import Alert, { AlertProps } from '@mui/material/Alert';
import IUser from '../model/IUser';
import { SnackBar } from './UserPosts.styles';
import { TableCells, User_Div, User_Title } from './UsersTable.styles';

const UsersTable = (onSelectUser: any) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const dispatch = useDispatch()
  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  useEffect(() => {
    getUsers().then(res => {
      setUsers(res.data)
    }).catch(err => {
      setSnackbar({ children: "something went wrong a error occurred" + err.response.data, severity: 'error' });
    })
  }, []);


  useEffect(() => {
    const filtered = users.filter((user: IUser) => {
      const nameMatch = user.name.toLowerCase().includes(nameFilter.toLowerCase());
      const emailMatch = user.email.toLowerCase().includes(emailFilter.toLowerCase());
      return nameMatch && emailMatch;
    });
    setFilteredUsers(filtered);
  }, [users, nameFilter, emailFilter]);

  return (<div>
    <User_Title>users</User_Title><br></br>
    <User_Div >
      <TextField label="Filter by Name" onChange={(e) => setNameFilter(e.target.value)} />
      <TextField label="Filter by Email" onChange={(e) => setEmailFilter(e.target.value)} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCells>Name</TableCells>
              <TableCells>Email</TableCells>
              <TableCells>Company Name</TableCells>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user: IUser) => (
              <TableRow key={user.id} onClick={() => {
                dispatch(setUser(user));

              }}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.company.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!!snackbar && (
        <SnackBar 
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </SnackBar>)}
    </User_Div>
  </div>
  );
};

export default UsersTable;