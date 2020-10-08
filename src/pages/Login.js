import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { PlainButton as LoginButton } from "./../components/Buttons";
import { TextInput } from "./../components/TextInput";
import ActivityLoader from "./../components/ActivityLoader";
import apiServices from "./../utils/api.service";
import { setUser, resetUser } from "./../utils/actions";
import styles from "./css/Login.module.css";

class Login extends React.Component {
  state = {
    txtUsername: "",
    txtPassword: "",
    txtError: "",
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
    const { txtPassword, txtUsername } = this.state;
    let result = null;
    if (txtUsername.length === 0) result = "Username cannot be empty";
    else if (txtPassword.length === 0) result = "Password cannot be empty.";

    return result;
  };

  didLogin = () => {
    const validationError = this.isValid();
    if (validationError) {
      this.setState({ txtError: validationError });
      return;
    } else this.setState({ txtError: "" });

    const { txtUsername, txtPassword } = this.state;

    const data = {
      email: txtUsername,
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
    const { txtUsername, txtPassword, txtError, chkRememberMe, showLoader } = this.state;
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
                <span className={styles.cardTitle}>Sign In</span>
                <TextInput
                  value={txtUsername}
                  placeholder="Username"
                  onKeyPress={(e) => e.key === "Enter" && this.didLogin()}
                  onChange={(e) => this.setState({ txtUsername: e.target.value, txtError: "" })}
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
                  title="Login"
                  onKeyPress={(e) => e.key === "Enter" && this.didLogin()}
                  onClick={this.didLogin}
                />

                <div className={styles.forgotDiv}>
                  <Form.Check
                    id="rememberme"
                    className={styles.txtRememberMe}
                    checked={chkRememberMe}
                    type="checkbox"
                    label="Remember Me"
                    onChange={(e) => this.setState({ chkRememberMe: e.target.checked })}
                  />
                  <span className={styles.txtForgot} onClick={this.didForgotPassword}>
                    Forgot Password?
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

export default connect((state) => ({ user: state.user }), { setUser, resetUser })(withRouter(Login));
