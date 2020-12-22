import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/MenuBar';
import BottomBar from './components/BottomBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import Confirmation from './pages/Confirmation';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home}/>
          <AuthRoute exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/posts/:postId' component={SinglePost} />
          <Route exact path='/confirmation/:vtokenId' component={Confirmation} />
          <BottomBar />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;