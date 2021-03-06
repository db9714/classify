import React from "react";
import { Container, Row, Col, Form, Carousel } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { PlainButton } from "./../components/Buttons";
import { TextInput } from "./../components/TextInput";
import ActivityLoader from "./../components/ActivityLoader";
import apiServices from "./../utils/api.service";
import { setUser, resetUser } from "./../utils/actions";
import styles from "./css/firstPage.module.css";
import Header from "./../components/Header";

const CONTEST_LIST = [
  {
    name: "India1234fgjkgk",
    id: 1,
    votes: 56,
  },
  {
    name: "Maharastra",
    id: 2,
    votes: 15,
  },
  {
    name: "UP",
    id: 3,
    votes: 20,
  },
  {
    name: "POK",
    id: 4,
    votes: 0,
  },
  {
    name: "India",
    id: 5,
    votes: 56,
  },
  {
    name: "MH",
    id: 6,
    votes: 15,
  },
  {
    name: "UP",
    id: 7,
    votes: 20,
  },
  {
    name: "POK",
    id: 8,
    votes: 0,
  },
];
class firstPage extends React.Component {
	
	componentDidMount() {}
	toggleLoader = (showLoader) => this.setState({ showLoader });
	
	render() {
		const { showLoader } = this.state;
		return (
		<>
        {showLoader && <ActivityLoader show={showLoader} />}
		<Container className={styles.container} fluid>
		<Header active="firstPage" onSchoolChange={() => this.didResetFilter()} />
		<Row>
			<Col style={{ display: "flex" }}>
			<div className={styles.block2_1} xs={12} sm={12}>
                <div className={styles.buttonsBlock}>
                  <PlainButton
                    className={styles.btnCss}
                    title="Top 5 contest"
                    onKeyPress={(e) => e.key === "Enter" && this.didLogin()}
                    onClick={this.didLogin}
                  />
                  <PlainButton
                    className={styles.btnCss}
                    title="Top 5 contest"
                    onKeyPress={(e) => e.key === "Enter" && this.didLogin()}
                    onClick={this.didLogin}
                  />
                  <PlainButton
                    className={styles.btnCss}
                    title="Top 5 contest"
                    onKeyPress={(e) => e.key === "Enter" && this.didLogin()}
                    onClick={this.didLogin}
                  />
                </div>
                <div className={styles.addBlock}></div>
              </div>
			  <div className={styles.block2_2} xs={12} sm={12}>
                {CONTEST_LIST.map((obj, index) => (
                  <div className={styles.contestList}>
                    <div className={styles.contestListItem}>
                      <span>{obj.name}</span>
                      <span>{obj.votes}</span>
                    </div>
                  </div>
                ))}
              </div>
			  </Col>	
		</Row>
		</Container>
      </>
		);		
	}	
}

export default connect((state) => ({ user: state.user }), { setUser, resetUser })(withRouter(firstPage));