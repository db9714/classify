import React from "react";
import { Container, Row, Col, Form, Carousel } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { PlainButton as LoginButton } from "./../components/Buttons";
import { TextInput } from "./../components/TextInput";
import ActivityLoader from "./../components/ActivityLoader";
import apiServices from "./../utils/api.service";
import { setUser, resetUser } from "./../utils/actions";
import styles from "./css/Dashboard.module.css";
import Header from "./../components/Header";

class Dashboard extends React.Component {
  state = {
    txtUsername: "",
    txtPassword: "",
    txtError: "",
    chkRememberMe: false,
    showLoader: false,
  };

  componentDidMount() {}

  toggleLoader = (showLoader) => this.setState({ showLoader });

  // didLogin = () => {
  //   const validationError = this.isValid();
  //   if (validationError) {
  //     this.setState({ txtError: validationError });
  //     return;
  //   } else this.setState({ txtError: "" });

  //   const { txtUsername, txtPassword } = this.state;

  //   const data = {
  //     email: txtUsername,
  //     password: txtPassword,
  //   };

  //   apiServices.post("login/", data, {}, this.toggleLoader, (responseData, errorData) => {
  //     if (errorData === null) {
  //       this.props.setUser({ user_data: responseData.user_data, token: responseData.key });
  //       this.props.history.push({
  //         pathname: "/dashboard",
  //       });
  //     } else {
  //       for (let error in errorData) {
  //         this.setState({ txtError: errorData[error][0] });
  //       }
  //     }
  //   });
  // };

  render() {
    const { showLoader } = this.state;
    return (
      <>
        {showLoader && <ActivityLoader show={showLoader} />}

        <Container className={styles.container} fluid>
          <Header active="dashboard" onSchoolChange={() => this.didResetFilter()} />
          <Row style={{ marginBottom: 30 }}>
            <Col>
              <div className={styles.carouselOuterBar}>
                <Carousel>
                  <Carousel.Item>
                    <img className="d-block w-100" src="https://picsum.photos/500/400?text=Third slide&bg=20232a" alt="First slide" />
                    <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className="d-block w-100" src="https://picsum.photos/500/400?text=First slide&bg=373940" alt="Third slide" />

                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className="d-block w-100" src="https://picsum.photos/500/400?text=Second slide&bg=282c34" alt="Third slide" />

                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
            </Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default connect((state) => ({ user: state.user }), { setUser, resetUser })(withRouter(Dashboard));
