import React, { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [localCopy, setLocalCopy] = useState([]);
  
  useEffect(() => {
    setLoading(true);
    const getUsers = async () => {
      const res = await axios.get(
        `https://api.github.com/users?client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      setLocalCopy(res.data);
      setUsers(res.data);
      setLoading(false);
    }
    getUsers();
    // eslint-disable-next-line
  }, []);


  // Search github users
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUsers(res.data.items); 
    setLoading(false);
  };

  // Get a single Github user
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUser(res.data); 
    setLoading(false);
  }

  // Get user's repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setRepos(res.data)
    setLoading(false);
  }

  // Clear users
  const clearUsers = () => setUsers(localCopy)

  // Set alert
  const showAlert = (msg, type) => {
    setAlert({msg, type});

    setTimeout(() => setAlert(null), 5000);
  }

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search searchUsers={searchUsers} 
                  clearUsers={clearUsers}
                  setAlert={showAlert} />
                <Users users={users} loading={loading} />
              </Fragment>
            )} />
            <Route exact path='/about' component={About} />
            <Route exact path='/users/:login' render={props => (
              <User {...props} 
                getUser={getUser} 
                getUserRepos={getUserRepos} 
                user={user} 
                repos={repos}
                loading={loading} />
            )} />
          </Switch>  
        </div>
      </div>
    </Router>
  );
  
}

export default App;
