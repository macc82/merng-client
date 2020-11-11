import React, { useContext, useState } from 'react'
import { Menu, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

function MenuBar() {
    const { user, logout } = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, { name }) => setActiveItem(name);

    const imageAvatar = user ? (
        <>&nbsp;<Image src={`https://react.semantic-ui.com/images/avatar/large/${user.avatarImage}`} avatar /><span>{user.username}</span>&nbsp;</>
    ) : (
            ''
        );

    const homeMenuItemBar = user ? (
        <Menu.Item
            name={user.username}
            active
            as={Link}
            to="/"
            fitted
        >{imageAvatar}
        </Menu.Item>

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
        <Menu fixed="top" inverted pointing size='large'>
            {homeMenuItemBar}
            <Menu.Item fitted='vertically' header style={{ fontFamily: "'Bebas Neue', cursive", color: "teal", margin: "auto", fontSize: 'x-large' }}>Simple Social Media Project</Menu.Item>
            <Menu.Menu fitted='vertically' position='right'>{subMenuBar}</Menu.Menu>
        </Menu>
    );

    return menuBar;
}

export default MenuBar;