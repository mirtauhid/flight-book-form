import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div id="header-nav">
            <Navbar className="navbar-main" collapseOnSelect expand="lg" variant="light">
                <Navbar.Brand as={Link} to="/">
                    Company Logo
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="drop" id="responsive-navbar-nav">
                    <Nav style={{ marginLeft: 'auto' }}>
                        <Nav.Link style={{ margin: '0px 10px' }} eventKey={1} as={Link} to="/">
                            <FontAwesomeIcon size="1x" icon={faHome} />
                            <span style={{ marginLeft: '7px' }}>HOME</span>
                        </Nav.Link>
                        <Nav.Link style={{ margin: '0px 10px' }} eventKey={2} as={Link} to="/faq">
                            FAQ
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;
