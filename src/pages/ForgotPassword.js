import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { PlainButton as ForgotPasswordButton } from "./../components/Buttons";
import { TextInput } from "./../components/TextInput";
import styles from "./css/ForgotPassword.module.css";
import apiServices from "./../utils/api.service";
import ActivityLoader from "./../components/ActivityLoader";
class ForgotPassword extends React.Component {
  state = {
    txtEmail: "",
    txtError: "",
    showSuccessMsg: false,
    showLoader: false,
    emailRegex: /^([A-Za-z0-9+_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
    showBackButton: true,
  };

  toggleLoader = (showLoader) => this.setState({ showLoader });

  isValid = () => {
    const { txtEmail, emailRegex } = this.state;
    let result = null;
    if (txtEmail.length === 0) result = "Email cannot be empty";
    else if (emailRegex.test(txtEmail) === false) result = "Enter valid Email";

    return result;
  };

  onBackToLogin = () => {
    this.props.history.push({
      pathname: "/",
    });
  };

  onForgotPassword = () => {
    const validationError = this.isValid();
    if (validationError) {
      this.setState({ txtError: validationError, showSuccessMsg: false });
      return;
    } else this.setState({ txtError: "" });

    // FORGOT-PASSWORD
    const { txtEmail } = this.state;
    const data = {
      domain: window.location.host,
      email: txtEmail,
    };
    apiServices.post("/auth/forgot/password/", data, {}, this.toggleLoader, (responseData, errorData) => {
      if (errorData === null) {
        this.setState({ showSuccessMsg: true, showBackButton: false });
      } else {
        console.log(errorData);
        for (let error in errorData) {
          this.setState({ txtError: errorData[error][0] });
        }
      }
    });
  };

  render() {
    const { txtEmail, txtError, showSuccessMsg, showLoader, showBackButton } = this.state;
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
                <span className={styles.cardTitle}>Forgot your password?</span>
                <TextInput
                  value={txtEmail}
                  placeholder="Please enter email address"
                  onKeyPress={(e) => e.key === "Enter" && this.onForgotPassword()}
                  onChange={(e) => this.setState({ txtEmail: e.target.value, txtError: "" })}
                />
                {txtError !== "" && (
                  <div className={styles.errorDiv}>
                    <img className={styles.imgError} src={require("./../assets/images/login_error.png")} alt="error" />
                    <span className={styles.txtError}>{txtError}</span>
                  </div>
                )}
                <ForgotPasswordButton className={styles.requestResetLinkBtn} title="Request reset link" onClick={this.onForgotPassword} />
              </div>
            </Col>
          </Row>
          {showBackButton && (
            <Row>
              <Col className={[styles.cardDiv, "mt-4"].join(" ")} style={{ cursor: "pointer", borderColor: "transparent" }}>
                <div style={{ backgroundColor: "#324767", borderRadius: 5, display: "flex", alignItems: "center" }} onClick={this.onBackToLogin}>
                  <i className={[styles.btnBack, "fa fa-arrow-left"].join(" ")} />
                  <ForgotPasswordButton
                    title="Back to Login"
                    className={styles.forgotButton}
                    style={{ backgroundColor: "#324767", width: 115, padding: 0, fontSize: 15, height: 35, margin: 0 }}
                  />
                </div>
              </Col>
            </Row>
          )}
          {showSuccessMsg === true && (
            <Row>
              <Col className={styles.alertDiv}>
                <div className={styles.alertCard}>
                  <img className={styles.imgError} src={require("./../assets/images/success_icon.png")} alt="success" />
                  <span className={styles.alertTitle}>Password reset e-mail has been sent.</span>
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

export default connect()(withRouter(ForgotPassword));
