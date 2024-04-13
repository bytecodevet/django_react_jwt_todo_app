import React, { useEffect, useState } from 'react';

import Auth from './components/Auth/Auth';
import Header from './components/Header/Header';
import './App.css';
import TokenContext from './context/TokensContext';
import { baseUrl, refreshTokenFunction } from './utils';
import TaskList from './components/TaskList/TaskList';
import TaskForm from './components/TaskForm/TaskForm';
import { Task } from './types';
import TasksContext from './context/TasksContext';

const App = () => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (refreshToken !== '') {
      const intervalId = setInterval(() => {
        refreshTokenFunction(refreshToken, setAccessToken);
      }, 60 * 1000)
  
      return () => {
        clearInterval(intervalId);
      };
    } 
  }, [refreshToken]);


  useEffect(() => {
    if (accessToken) {
      const headers = {
        "Authorization": `Bearer ${accessToken}`
      }
      fetch(`${baseUrl}/api/tasks/`, {
        headers,
      })
      .then(response => response.json() as Promise<Task[]>)
      .then(json => {
        setTasks(json);
      });
    }
  }, [accessToken])

  return (
    <TokenContext.Provider value={{accessToken, refreshToken, setAccessToken, setRefreshToken}}>
      <TasksContext.Provider value={{tasks, setTasks}}>
        <div className="wrapper">
          <Header />
          {accessToken && refreshToken
            ? <>
                <TaskForm />
                <TaskList />
              </>
            : <Auth />
          }
        </div>
      </TasksContext.Provider>
    </TokenContext.Provider>
  )
}

export default App;