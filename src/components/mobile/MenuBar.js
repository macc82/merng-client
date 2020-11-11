import React, { useContext, useState } from 'react'
import { Dropdown, Menu, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

function MenuBar() {
    const { user, logout } = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e) => setActiveItem(e.target.name);

    const homeItemBar = user ? (
        <Dropdown.Item as={Link} to="/" active={true} name={user.username}>{user.username}</Dropdown.Item>
    ) : (
            <Dropdown.Item as={Link}
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
                to="/">Home</Dropdown.Item>
        );

    const subMenuBar = user ? (
        <Dropdown.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={logout}>Logout</Dropdown.Item>
    ) : (
            <>
                <Dropdown.Item as={Link}
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    to="/login">Login</Dropdown.Item>
                <Dropdown.Item as={Link}
                    name='register'
                    active={activeItem === 'register'}
                    onClick={handleItemClick}
                    to="/register">Register</Dropdown.Item>
            </>
        );

    const iconMenu = (
        <Dropdown item icon='bars' openOnFocus closeOnBlur closeOnEscape>
            <Dropdown.Menu>
                {homeItemBar}
                <Dropdown.Divider />
                {subMenuBar}
            </Dropdown.Menu>
        </Dropdown>
    );

    const menuBar = (
        <Menu fixed="top" inverted pointing>
            {iconMenu}
            <Menu.Item fitted header style={{fontFamily: "'Bebas Neue', cursive", color: "teal", margin: "auto", fontSize: 'x-large'}}>Simple Social Media Project</Menu.Item>
            <Menu.Item position='right' fitted>{user && <Image src={`https://react.semantic-ui.com/images/avatar/large/${user.avatarImage}`} avatar />}</Menu.Item>
        </Menu>
        /*    <Grid.Column textAlign='left' width={2}>
                <Dropdown item icon='bars' openOnFocus closeOnBlur closeOnEscape>
                    <Dropdown.Menu>
                        {homeItemBar}
                        <Dropdown.Divider />
                        {subMenuBar}
                    </Dropdown.Menu>
                </Dropdown>
            </Grid.Column>
            <Grid.Column width={14}>
                <div className="logoMobile">Simple Social Media Project{ user && <Image src={`https://react.semantic-ui.com/images/avatar/large/${user.avatarImage}`} avatar floated='right' /> }</div>
                
            </Grid.Column>
        </>*/
    );

    return menuBar;
}

export default MenuBar;