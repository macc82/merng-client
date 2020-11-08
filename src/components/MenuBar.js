import React, { useContext, useState } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  
  const handleItemClick = (e, { name }) => setActiveItem(name);

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

  const menuBar = (
    <Segment inverted textAlign="center">
      <Menu fixed="top" inverted pointing size='large' >
        {homeMenuItemBar}
        <div className="logo">Simple Social Media Project</div>
        {subMenuBar}
      </Menu>
    </Segment>
  );

  return menuBar;
}

export default MenuBar;