import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { PlainButton as LoginButton } from "./../components/Buttons";
import { TextInput } from "./../components/TextInput";
import ActivityLoader from "./../components/ActivityLoader";
import apiServices from "./../utils/api.service";
import { setUser, resetUser } from "./../utils/actions";
import styles from "./css/Signup.module.css";

class Signup extends React.Component {
  state = {
    txtEmail: "",
    txtPassword: "",
    txtError: "",
    txtLname: "",
    txtFname: "",
    chkRememberMe: false,
    showLoader: false,
  };

  componentDidMount() {
    this.props.resetUser();
  }

  toggleLoader = (showLoader) => this.setState({ showLoader });

  didForgotPassword = () =>
    this.props.history.push({
      pathname: "/forgotpassword",
    });

  isValid = () => {
    const { txtPassword, txtEmail } = this.state;
    let result = null;
    if (txtEmail.length === 0) result = "Username cannot be empty";
    else if (txtPassword.length === 0) result = "Password cannot be empty.";

    return result;
  };

  didLogin = () => {
    const validationError = this.isValid();
    if (validationError) {
      this.setState({ txtError: validationError });
      return;
    } else this.setState({ txtError: "" });

    const { txtEmail, txtPassword } = this.state;

    const data = {
      email: txtEmail,
      password: txtPassword,
    };

    apiServices.post("login/", data, {}, this.toggleLoader, (responseData, errorData) => {
      if (errorData === null) {
        this.props.setUser({ user_data: responseData.user_data, token: responseData.key });
        this.props.history.push({
          pathname: "/dashboard",
        });
      } else {
        for (let error in errorData) {
          this.setState({ txtError: errorData[error][0] });
        }
      }
    });
  };

  render() {
    const { txtEmail, txtPassword, txtError, chkRememberMe, showLoader, txtFname, txtLname } = this.state;
    return (
      <>
        {showLoader && <ActivityLoader show={showLoader} />}
        <Container className={styles.container} fluid>
          <Row>
            <Col className={styles.logoDiv}>
              <div className={styles.appLogo}>Classify</div>
            </Col>
          </Row>
          <Row>
            <Col className={styles.cardDiv}>
              <div className={styles.card}>
                <span className={styles.cardTitle}>Sign Up</span>
                <TextInput
                  value={txtFname}
                  placeholder="First Name"
                  onKeyPress={(e) => e.key === "Enter" && this.didLogin()}
                  onChange={(e) => this.setState({ txtFname: e.target.value, txtError: "" })}
                />
                <TextInput
                  value={txtLname}
                  placeholder="Last Name"
                  onKeyPress={(e) => e.key === "Enter" && this.didLogin()}
                  onChange={(e) => this.setState({ txtLname: e.target.value, txtError: "" })}
                />
                <TextInput
                  value={txtEmail}
                  placeholder="Email"
                  onKeyPress={(e) => e.key === "Enter" && this.didLogin()}
                  onChange={(e) => this.setState({ txtEmail: e.target.value, txtError: "" })}
                />
                <TextInput
                  value={txtPassword}
                  placeholder="Password"
                  type="password"
                  onChange={(e) => this.setState({ txtPassword: e.target.value, txtError: "" })}
                  onKeyPress={(e) => e.key === "Enter" && this.didLogin()}
                />
                {txtError !== "" && (
                  <div className={styles.errorDiv}>
                    <img className={styles.imgError} src={require("./../assets/images/login_error.png")} alt="error" />
                    <span className={styles.txtError}>{txtError}</span>
                  </div>
                )}

                <LoginButton
                  className={styles.btnCss}
                  title="Sign up"
                  onKeyPress={(e) => e.key === "Enter" && this.didLogin()}
                  onClick={this.didLogin}
                />

                <div className={styles.forgotDiv}>
                  <span className={styles.txtForgot} onClick={() => (window.location.href = "/")}>
                    Already user? Login here
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default connect((state) => ({ user: state.user }), { setUser, resetUser })(withRouter(Signup));
