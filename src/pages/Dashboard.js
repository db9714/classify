import React from "react";
import { Container, Row, Col, Form, Carousel } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { PlainButton } from "./../components/Buttons";
import { TextInput } from "./../components/TextInput";
import ActivityLoader from "./../components/ActivityLoader";
import apiServices from "./../utils/api.service";
import { setUser, resetUser } from "./../utils/actions";
import styles from "./css/Dashboard.module.css";
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

          <div className={styles.carouselOuterBar}>
            <Carousel>
              <Carousel.Item>
                <img
                  className={["d-block", styles.carouselImg].join(" ")}
                  src="https://picsum.photos/500/400?text=Third slide&bg=20232a"
                  alt="Upload Content"
                />
                <Carousel.Caption>
                  <h3>Upload Content</h3>
                  <p>Upload your Image Or Video </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className={["d-block", styles.carouselImg].join(" ")}
                  src="https://picsum.photos/500/400?text=First slide&bg=373940"
                  alt="Enter in Contest"
                />

                <Carousel.Caption>
                  <h3>Select Tag and Participate</h3>
                  <p>Select the best describing tag for your content and Post It</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className={["d-block", styles.carouselImg].join(" ")}
                  src="https://picsum.photos/500/400?text=Second slide&bg=282c34"
                  alt="Get Votes"
                />

                <Carousel.Caption>
                  <h3>Attract people to vote on your participation</h3>
                  <p>Promote your entry and get votes</p>
                </Carousel.Caption>
              </Carousel.Item>
			  <Carousel.Item>
                <img
                  className={["d-block", styles.carouselImg].join(" ")}
                  src="https://picsum.photos/500/400?text=Second slide&bg=282c34"
                  alt="Win Prizes"
                />

                <Carousel.Caption>
                  <h3>Win Exciting Prizes</h3>
                  <p>Lead the vote count and win exciting prizes at each month end</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <Row>
			<Col style={{display : "flex" }}>
				<div className = {styles.secondBlock}>
					<Row>
						<input type="file" id="myFile" name="filename">
						<input type="submit">
					</Row>
					<Row>
						<div className= {styles.secondBlock}>
						</div>
					</Row>
			
				</div>
				<div className = {styles.secondBlock}>
					<input type="submit">tag1</input>
					<input type="submit">tag2</input>
					<input type="submit">tag3</input>
				</div>
				<div className = {styles.secondBlock}>
					<input type="submit">Upload</input>
				</div>
			</Col>
			</Row>
			
			<Row>
            <Col style={{ display: "flex" }}>
              <div className={styles.addBlock}></div>
            </Col>
          </Row>
          <Row>
            <Col style={{ display: "flex" }}>
              <div className={styles.addBlock}></div>
            </Col>
          </Row>
          
		  <Row>
            <Col style={{ display: "flex" }}>
              <div className={styles.addBlock}></div>
            </Col>
          </Row>
		  <Row>
            <Col style={{ display: "flex" }}>
              <div className={styles.footerBlock}>
                {"Copyright © 2020 Pixller - All Rights Reserved."}
              </div>
            </Col>
          </Row>
		  
        </Container>
      </>
    );
  }
}

export default connect((state) => ({ user: state.user }), { setUser, resetUser })(withRouter(Dashboard));
