// import React from "react";
// import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

// import { connect } from "react-redux";
// import { Row, Col } from "react-bootstrap";

import styles from "./css/Header.module.css";

// function Header(props) {
//   let history = useHistory();

//   function didClickNavigate(path) {
//     if (props.active !== path) history.push(path);
//   }
//   function didClickContactUS() {
//     let email = "test@gmail.com";
//     window.open("mailto:" + email + "?subject=", "_blank");
//   }

//   const userName = `${props.user.user_data.first_name} ${props.user.user_data.last_name}`;

//   return <>dd</>;
// }
// export default connect((state) => ({ user: state.user }), {})(Header);
import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  //   didClickNavigate = (path) => {
  //     let history = useHistory();
  //     if (this.props.active !== path) this.history.push(path);
  //   };
  render() {
    return (
      <div className={styles.headerOuterBar}>
        <Router>
          <MDBNavbar className={styles.navBarStyle} light expand="md">
            <MDBNavbarBrand>
              <strong className={styles.logo}>PIXXLER</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
              <MDBNavbarNav right>
                <MDBNavItem className={styles.navbarTitleStyle}>
                  <MDBNavLink to="#!">HOW IT WORKS</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem className={styles.navbarTitleStyle}>
                  <MDBNavLink to="#!">CONTESTS</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem className={styles.navbarTitleStyle}>
                  <MDBNavLink to="/">LOGIN</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem className={styles.navbarTitleStyle}>
                  <MDBNavLink to="/signup">SIGN UP</MDBNavLink>
                </MDBNavItem>
                {/* <MDBNavItem className={styles.navbarTitleStyle}>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <div className="d-none d-md-inline">Dropdown</div>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem> */}
                <MDBNavbarNav>
                  <Dropdown>
                    <Dropdown.Toggle className={styles.formSelectDiv}>
                      <span className={styles.userName}>
                        <span className={styles.role_label}>SIGN UP</span>
                      </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className={styles.dropdown_options_style}>
                      <Dropdown.Item>
                        <span>
                          <i className={["fa fa-envelope", styles.contactIcon].join(" ")} aria-hidden="true"></i>
                        </span>
                        <span style={{ marginLeft: 10 }}>Contact Us</span>
                      </Dropdown.Item>
                      <Dropdown.Divider className={styles.dividerStyle} />

                      <Dropdown.Item href="/changepassword" className={styles.dropdownList}>
                        <span>
                          <i className={["fa fa-unlock", styles.changePassIcon].join(" ")} aria-hidden="true"></i>
                        </span>
                        <span style={{ marginLeft: 10 }}>Change Password</span>
                      </Dropdown.Item>
                      <Dropdown.Divider className={styles.dividerStyle} />

                      <Dropdown.Item href="/" className={styles.dropdownList}>
                        <span>
                          <i className={["fa fa-arrow-circle-right", styles.logoutIconStyle].join(" ")} aria-hidden="true"></i>
                        </span>
                        <span style={{ marginLeft: 10 }}>Logout</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </MDBNavbarNav>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        </Router>
      </div>
    );
  }
}

export default Header;
