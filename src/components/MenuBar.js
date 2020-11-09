import React, { useContext, useState } from 'react'
import { Dropdown, Menu, Segment, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const handleMobileItemClick = (e) => setActiveItem(e.target.name);

  const homeMenuItemBar = user ? (
    <Menu.Item
        name={user.username}
        active
        as={Link}
        to="/"
      />
  ) : (
    <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
  );

  const mobileHomeItemBar = user ? (
    <Link to="/" active name={user.username}>{user.username}</Link>
  ) : (
    <Link
        name='mobileHome'
        active={activeItem === 'mobileHome' || activeItem === 'home'}
        onClick={handleMobileItemClick}
        to="/"
      >Home</Link>
  );

  const subMenuBar = user ? (
    <Menu.Item
        name='logout'
        active={activeItem === 'logout'}
        onClick={logout}
    />
  ) : (
    <>
      <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
        />
        <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
        />
      </>
  );

  const mobileSubMenuBar = user ? (
    <Dropdown.Item><Link
        name='mobileLogout'
        active={activeItem === 'mobileLogout' || activeItem === 'logout'}
        onClick={logout}
    >Logout</Link></Dropdown.Item>
  ) : (
    <>
      <Dropdown.Item><Link
            name='mobileLogin'
            active={activeItem === 'mobileLogin' || activeItem === 'login'}
            onClick={handleMobileItemClick}
            to="/login"
        >Login</Link></Dropdown.Item>
      <Dropdown.Item><Link
            name='mobileRegister'
            active={activeItem === 'mobileRegister' || activeItem === 'register'}
            onClick={handleMobileItemClick}
            to="/register"
        >Register</Link></Dropdown.Item>
      </>
  );

  const menuBar = (
    <Segment inverted textAlign="center" fixed='top'>      
        <Grid>
          <Grid.Row only='mobile tablet'>
            <Grid.Column textAlign='left' width={2}>
              <Dropdown item icon='bars' openOnFocus closeOnBlur closeOnEscape>
                <Dropdown.Menu>
                  <Dropdown.Item>{mobileHomeItemBar}</Dropdown.Item>
                  <Dropdown.Divider />
                  {mobileSubMenuBar}
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
            <Grid.Column width={14}>
              <div className="logoMobile">Simple Social Media Project</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row only="computer">
            <Grid.Column>
              <Menu fixed="top" inverted pointing size='large' >
                {homeMenuItemBar}
                <div className="logo">Simple Social Media Project</div>
                {subMenuBar}
              </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      
    </Segment>
  );

  return menuBar;
}

export default MenuBar;