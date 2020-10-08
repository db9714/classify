import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { PlainButton as ResetButton, OutlineButton } from "./../components/Buttons";
import { TextInput } from "./../components/TextInput";
import { setUser } from "./../utils/actions";
import styles from "./css/ActivateAccount.module.css";
import ActivityLoader from "./../components/ActivityLoader";
import apiServices from "./../utils/api.service";

class ActivateAccount extends React.Component {
  state = {
    password: "",
    confirmPassword: "",
    txtError: "",
    showLoader: false,
    showSuccessMsg: false,
  };
  toggleLoader = (showLoader) => this.setState({ showLoader });

  didCancel = () =>
    this.props.history.push({
      pathname: "/",
    });

  isValid = () => {
    const { confirmPassword, password } = this.state;
    let result = null;
    if (password.length === 0 || confirmPassword.length === 0) result = "Password cannot be empty.";
    else if (confirmPassword !== password) result = "Passwords do not match.";
    return result;
  };

  didActivateAccount = () => {
    const validationError = this.isValid();
    if (validationError) {
      this.setState({ txtError: validationError });
      return;
    } else this.setState({ txtError: "" });

    const { password, confirmPassword } = this.state;

    let pathname = window.location.pathname;
    var pathArray = pathname.split("/");

    var token = pathArray[pathArray.length - 2];
    var uid = pathArray[pathArray.length - 3];

    const data = {
      uid: uid,
      token: token,
      new_password1: password,
      new_password2: confirmPassword,
    };

    apiServices.post("auth/password/reset/confirm/", data, {}, this.toggleLoader, (responseData, errorData) => {
      if (errorData === null) {
        this.setState({ showSuccessMsg: true });
      } else {
        console.log(errorData);
        for (let error in errorData) {
          this.setState({ txtError: errorData[error][0] });
        }
      }
    });
  };

  render() {
    const { password, confirmPassword, txtError, showLoader, showSuccessMsg } = this.state;
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
                <span className={styles.cardTitle}>Activate Your Account</span>
                <TextInput
                  value={password}
                  type="password"
                  placeholder="Enter new password"
                  onChange={(e) => this.setState({ password: e.target.value, txtError: "" })}
                  onKeyPress={(e) => e.key === "Enter" && this.didActivateAccount()}
                />
                <TextInput
                  value={confirmPassword}
                  placeholder="Re-enter new password"
                  type="password"
                  onChange={(e) => this.setState({ confirmPassword: e.target.value, txtError: "" })}
                  onKeyPress={(e) => e.key === "Enter" && this.didActivateAccount()}
                />
                {txtError !== "" && (
                  <div className={styles.errorDiv}>
                    <img className={styles.imgError} src={require("./../assets/images/login_error.png")} alt="error" />
                    <span className={styles.txtError}>{txtError}</span>
                  </div>
                )}
                <div className={styles.buttonsBlock}>
                  <ResetButton title="Submit" className={styles.submitBtn} onClick={this.didActivateAccount} />
                  {/* <ResetButton title="Cancel" className={styles.cancelBtn} onClick={this.didCancel} /> */}
                  <OutlineButton title="Cancel" className={styles.cancelBtn} onClick={this.didCancel} />
                </div>
              </div>
            </Col>
          </Row>

          {showSuccessMsg === true && (
            <Row>
              <Col className={styles.alertDiv}>
                <div className={styles.alertCard}>
                  <img className={styles.imgError} src={require("./../assets/images/success_icon.png")} alt="success" />
                  <span className={styles.alertTitle}>Your account has been activated successfully.</span>
                  <Link to="/" className={styles.loginLink}>
                    Back to login
                  </Link>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </>
    );
  }
}

export default connect((state) => ({ user: state.user }), {
  setUser,
})(withRouter(ActivateAccount));
