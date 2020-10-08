import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { setUser } from './../utils/actions';

import { PlainButton, OutlineButton } from './../components/Buttons';
import { TextInput } from './../components/TextInput';
import ActivityLoader from './../components/ActivityLoader';
import apiServices from './../utils/api.service';
import styles from './css/ChangePassword.module.css';

class ChangePassword extends React.Component {
  state = {
    showLoader: false,
    txtPassword: '',
    txtReenterPassword: '',
    txtError: '',
    showSuccessMsg: false,
  };

  componentDidMount() {}

  toggleLoader = (showLoader) => this.setState({ showLoader });
  isValid = () => {
    const { txtPassword, txtReenterPassword } = this.state;
    let result = null;
    if (txtPassword.length === 0 || txtReenterPassword.length === 0) result = 'Password cannot be empty';
    else if (txtPassword !== txtReenterPassword) result = 'Passwords do not match.';
    return result;
  };
  didSubmit = () => {
    const validationError = this.isValid();
    if (validationError) {
      this.setState({ txtError: validationError });
      return;
    } else this.setState({ txtError: '' });

    const { txtPassword } = this.state;

    var payload = {};
    payload.password = txtPassword;
    var headers = {
      Authorization: `Token ${this.props.user.token}`,
    };
    apiServices.patch('users/' + this.props.user.user_data.id + '/', payload, headers, this.toggleLoader, (responseData, errorData) => {
      if (errorData === null) {
        console.log(responseData);

        this.setState({ showSuccessMsg: true });
      } else {
        var errmessage = errorData.non_field_errors[0];
        this.setState({ txtError: errmessage, txtPassword: '', txtReenterPassword: '' });
      }
    });
  };
  didCancel = () => {
    this.props.history.push({
      pathname: '/dashboard',
    });
  };
  render() {
    const { showSuccessMsg, txtError, showLoader, txtPassword, txtReenterPassword } = this.state;

    return (
      <>
        {showLoader && <ActivityLoader show={showLoader} />}

        <Container className={styles.container} fluid>
          <Row>
            <Col className={styles.addFilterBar}>
              <span className={styles.changePasswordStyle}> </span>Change Your Password
            </Col>
          </Row>
          <Row className={styles.changePasswordBlock}>
            <Col>
              <Row className={['mt-4'].join(' ')}>
                <Col style={{ justifyContent: 'center', display: 'flex' }}>
                  <div className={['mb-auto', 'mt-auto', styles.txtPasswordLabel].join(' ')}>New password</div>
                  <div className={['pl-4'].join(' ')}>
                    <TextInput
                      style={{ backgroundColor: '#d9dadb', width: 300, height: 40, borderRadius: 5, border: 'solid 0.5px #a3abbd', fontSize: 15 }}
                      placeholder="Enter new password"
                      value={txtPassword}
                      type="password"
                      onChange={(e) => this.setState({ txtPassword: e.target.value, txtError: '' })}
                      onKeyPress={(e) => e.key === 'Enter' && this.didSubmit()}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col style={{ justifyContent: 'center', display: 'flex' }}>
                  <div className={['mb-auto', 'mt-auto', 'pr-0', styles.txtPasswordLabel].join(' ')}>Re-enter password</div>
                  <div className={['pl-4'].join(' ')}>
                    <TextInput
                      style={{ backgroundColor: '#d9dadb', width: 300, height: 40, borderRadius: 5, border: 'solid 0.5px #a3abbd', fontSize: 15 }}
                      placeholder="Re-enter password"
                      value={txtReenterPassword}
                      type="password"
                      onChange={(e) => this.setState({ txtReenterPassword: e.target.value, txtError: '' })}
                      onKeyPress={(e) => e.key === 'Enter' && this.didSubmit()}
                    />
                  </div>
                </Col>
              </Row>
              {txtError !== '' && (
                <div className={styles.errorDiv}>
                  <img className={styles.imgError} src={require('./../assets/images/login_error.png')} alt="error" />
                  <span className={styles.txtError}>{txtError}</span>
                </div>
              )}
              <Row className={[styles.addFilterRow, 'mt-4', 'mb-4'].join(' ')}>
                <Col className={['p-0'].join(' ')}></Col>
                <Col>
                  <Row style={{ justifyContent: 'space-between' }}>
                    <PlainButton
                      style={{ backgroundColor: '#324767', fontSize: 18, width: 200 }}
                      title="Submit"
                      onKeyPress={(e) => e.key === 'Enter' && this.didSubmit()}
                      onClick={this.didSubmit}
                    />

                    <OutlineButton
                      style={{ width: 200 }}
                      title="Cancel"
                      onKeyPress={(e) => e.key === 'Enter' && this.didCancel()}
                      onClick={this.didCancel}
                    />
                  </Row>
                </Col>
                <Col className={['p-0'].join(' ')}></Col>
              </Row>
              {showSuccessMsg === true && (
                <Row>
                  <Col className={styles.alertDiv}>
                    <div className={styles.alertCard}>
                      <img className={styles.imgError} src={require('./../assets/images/success_icon.png')} alt="success" />
                      <span className={styles.alertTitle}>Your password has been changed. Please login with new password.</span>
                      <Link to="/" className={styles.loginLink}>
                        Back to login
                      </Link>
                    </div>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default connect((state) => ({ user: state.user }), { setUser })(withRouter(ChangePassword));
