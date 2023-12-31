
import React, { useEffect, useState } from 'react';
import './App.css';
import Loader from './components/globalLoader/Loader';
import { ErrorModel } from './components/globalErrorModel/ErrorModel';
import AxiosInstance from './axios/globalAxios';
import { store } from './redux/store';
import UsersTable from './pages/UsersTable';
import UserPosts from './pages/UserPosts';
function App() {

  useEffect(() => {
  }, []);
  useEffect(() => {
    AxiosInstance(store); 
  }, []);
  return (
    <div className='App-div'>
      {<ErrorModel></ErrorModel>}
      {<Loader />}
        <UsersTable/>
        { <UserPosts/>}
    </div>
  );
  }
export default App;