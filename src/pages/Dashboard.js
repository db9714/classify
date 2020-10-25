import React from "react";
import { Container, Row, Col, Form, Carousel, Popover, OverlayTrigger } from "react-bootstrap";
import _ from "lodash";
import ReactPlayer from "react-player";
import AsyncCreatableSelect from "react-select/async-creatable";

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
    selectedImages: [],
    uploadImageName: "",
    schoolLogoUrl: "",
    isImageUpload: true,
    selectedTab: "image",
    uploadVideoName: "",
    selectedVideos: [],
    txtTagName: "",
    selectedTags: [],
    defaultTags: [
      { label: "aaaaa", value: "aaa" },
      { label: "aaaaa2", value: "aaa2" },
      { label: "aaaaa", value: "aaa" },
      { label: "aaaaa3", value: "aaa2" },
      { label: "aaaaa4", value: "aaa" },
      { label: "aaaaa5", value: "aaa2" },
      { label: "aaaa6", value: "aaa" },
      { label: "aaaaa7", value: "aaa2" },
      { label: "aaaa8", value: "aaa" },
      { label: "aaaa99", value: "aaa2" },
    ],
  };

  componentDidMount() {}

  toggleLoader = (showLoader) => this.setState({ showLoader });

  fetchData = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        const data = {};

      });
    }
  };
  didAddTag = (itm) => {
    var newTags = [];
    var containSpecialSymbol = 0;
    var dupticateCount = 0;
    var tempArray = itm.value.split(",");
    let { selectedTags } = this.state;

    tempArray.forEach((element) => {
      if (/^[a-z0-9]+$/i.test(element)) {
        if (_.find(selectedTags, ["label", element])) {
          dupticateCount++;
        } else {
          newTags.push({ label: element, value: element });
        }
      } else {
        containSpecialSymbol++;
      }
    });

    if (dupticateCount >= 1 && containSpecialSymbol === 0) {
      if (window.confirm(dupticateCount + "Tags are already exists Do you want to continue ?")) {
        this.setState({ txtTagName: "" });
        Array.prototype.push.apply(selectedTags, newTags);
        this.setState({ selectedTags });
      }
    } else if (containSpecialSymbol >= 1 && dupticateCount === 0) {
      if (window.confirm(containSpecialSymbol + "tag contains special symbols, do you want to continue ?")) {
        this.setState({ txtTagName: "" });
        Array.prototype.push.apply(selectedTags, newTags);
        this.setState({ selectedTags });
      }
    } else if (containSpecialSymbol >= 1 && dupticateCount >= 1) {
      if (
        window.confirm(containSpecialSymbol + " Tags Contains Special Symbols and " + dupticateCount + " Duplicate Tags Do you want to continue ?")
      ) {
        this.setState({ txtTagName: "" });
        Array.prototype.push.apply(selectedTags, newTags);
        this.setState({ selectedTags });
      }
    } else {
      this.setState({ txtTagName: "" });
      Array.prototype.push.apply(selectedTags, newTags);
      this.setState({ selectedTags });
    }
  };
  didImageSelected = (e) => {
    let { selectedImages } = this.state;
    const file = e.target.files[0];
    if (file === undefined || file === null) return; // invalid data or user clicks cancel for select.

    if (selectedImages.length >= 5) {
      alert("Maximum 5 images are allowed per story");
      return;
    }

    if (_.find(selectedImages, ["name", file.name])) {
      console.log("found same name");
      return;
    }

    if (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg") {
      let reader = new FileReader();
      // console.log(e.target.files[0])
      // this.setState({ selectedImages, uploadImageName: file.name });
      reader.onloadend = () => this.setState({ schoolLogoUrl: reader.result, schoolLogoExist: reader.result });

      if (file) {
        reader.readAsDataURL(file);
        this.setState({ schoolLogoUrl: reader.result, showDeleteSchoolLogo: true });
      } else {
        this.setState({ schoolLogoUrl: "" });
      }
    } else {
      alert("Invalid file format selected, only .jpg, .jpeg, .png files are supported");
    }
  };
  didSelectTab = (item) => {
    if (item === "image") {
      this.setState({ isImageUpload: true, selectedTab: item });
    } else {
      this.setState({ isImageUpload: false, selectedTab: item });
    }
  };
  didTagSelected = (itm) => {
    const { selectedTags, defaultTags } = this.state;
    selectedTags.push(itm);

    this.setState({ selectedTags, defaultTags: _.filter(defaultTags, (obj) => obj.label !== itm.label) });
  };

  didRemoveTag = (itm) =>{
    const { selectedTags, defaultTags } = this.state;
    defaultTags.push(itm);
    this.setState({ selectedTags: _.filter(this.state.selectedTags, (obj) => obj.label !== itm.label) });
  } 
  render() {
    const {
      showLoader,
      uploadImageName,
      selectedImages,
      schoolLogoUrl,
      isImageUpload,
      selectedTab,
      uploadVideoName,
      selectedVideos,
      defaultTags,
      txtTagName,
      selectedTags,
    } = this.state;
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
            <Col className={styles.secondOuterBlock}>
              <div className={styles.selectImageBlock}>
                {isImageUpload === true ? <div className={styles.txtTitle}>Upload Image</div> : <div className={styles.txtTitle}>Upload Video</div>}
                <TabComponent selectedTab={selectedTab} didSelectTab={this.didSelectTab} />
                {selectedTab === "image" ? (
                  <FileUpload
                    uploadImageName={uploadImageName}
                    selectedImages={selectedImages}
                    didImageSelected={this.didImageSelected}
                    didImageRemove={this.didImageRemove}
                  />
                ) : (
                  <VideoFileUpload
                    uploadVideoName={uploadVideoName}
                    selectedVideos={selectedVideos}
                    didVideoSelected={this.didVideoSelected}
                    didVideoRemove={this.didVideoRemove}
                  />
                )}
                <div className={styles.imageDiv}>
                  <img className={styles.imageStyle} src={schoolLogoUrl} alt="" />
                </div>
                {/* {selectedImages.map((itm) => (
                  <div className={styles.imgPreviewDiv}>
                    <img className={styles.imgPreview} src={itm.image} alt={itm.image} />
                    <i className={[styles.imgRemove, "fa fa-times"].join(" ")} />
                  </div>
                ))} */}
              </div>
              {/* <div className={styles.selectImageBlock}>
                <Form>
                  <Form.File
                    type="file"
                    accept="image/*"
                    id="custom-file"
                    label={"Upload Images"}
                    data-browse="Upload"
                    custom
                    onChange={this.didImageSelected}
                  />
                </Form>

                <div>
                  {console.log(selectedImages)}
                  {selectedImages.map((itm) => (
                    <div className={styles.imgPreviewDiv}>
                     
                      <img className={styles.imgPreview} src={itm.image} alt={itm.image} />
                      <i className={[styles.imgRemove, "fa fa-times"].join(" ")} />
                    </div>
                  ))}
                  <div className={styles.imageDiv}>
                    <img className={styles.imageStyle} src={schoolLogoUrl} alt="" />
                    <ReactPlayer
                      url={"https://www.youtube.com/watch?v=ysz5S6PUM-U"}
                      controls={true}
                      className="video-player"
                      width={"100%"}
                      height={140}
                    />
                  </div>
                </div>
              </div> */}
              <div className={styles.selectTagsBlocks}>
                <div className={styles.txtTitle}>Select Tags</div>

                {/* <form action="/action_page.php">
                  <input type="submit" label="tag1" />
                  <input type="submit" label="tag2" />
                  <input type="submit" label="tag3" />
                </form> */}
                <div className={styles.tagsDiv}>
                  {defaultTags.map((itm, index) => (
                    <OverlayTrigger
                      key={index}
                      trigger="hover"
                      placement="bottom"
                      className={styles.tagCapsule}
                      overlay={
                        <Popover>
                          <span>{itm.label}</span>
                        </Popover>
                      }
                    >
                      <div className={styles.tagCapsule} onClick={() => this.didTagSelected(itm)}>
                        <span className={styles.tagLabel}>{itm.label.length < 40 ? itm.label : itm.label.substring(0, 40).concat("...")}</span>
                      </div>
                    </OverlayTrigger>
                  ))}

                  <Tags
                    txtTagName={txtTagName}
                    TAGS={(inputValue, callback) => this.fetchData(inputValue, callback, "tags")}
                    selectedTags={selectedTags}
                    didAddTag={this.didAddTag}
                    didRemoveTag={this.didRemoveTag}
                  />
                </div>
              </div>
              {/* <div className={styles.secondBlock}>
                <input type="submit" />
              </div> */}
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
              <div className={styles.footerBlock}>{"Copyright © 2020 Pixller - All Rights Reserved."}</div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const FileUpload = ({ selectedImages, didImageSelected, didImageRemove, uploadImageName, imageSizeError }) => (
  <>
    <Form id="custom-file">
      <Form.File
        type="file"
        accept="image/*"
        label={uploadImageName ? uploadImageName : "Upload Images"}
        data-browse="Choose File"
        custom
        onChange={didImageSelected}
      />
    </Form>
    <span className={styles.txtSupportedFiles}>**Supported file format is jpg, jpeg, png</span>
    <br />
    <span className={styles.txtSupportedFiles}>**Maximum upload image size: 15MB</span>
    <div className={styles.imgPreviewContainer}>
      {selectedImages.map((itm, key) => (
        <div className={styles.imgPreviewDiv} key={key}>
          {/* <img className={styles.imgPreview} src={URL.createObjectURL(itm)} alt={itm.name} /> */}
          {/* <img className={styles.imgPreview} src={itm.image} alt={itm.image} /> */}
          <img className={styles.imgPreview} src={itm.image} />
          <i className={[styles.imgRemove, "fa fa-times"].join(" ")} onClick={() => didImageRemove(itm.id)} />
        </div>
      ))}
    </div>
  </>
);

const Tags = ({ txtTagName, TAGS, selectedTags, didAddTag, didRemoveTag }) => (
  <>
    <div className={styles.txtTagsTitleDiv}>
      <i className={[styles.iconSearch, "fa fa-search"].join(" ")} />
      <AsyncCreatableSelect
        cacheOptions
        defaultOptions
        loadOptions={TAGS}
        onChange={(e) => didAddTag(e)}
        className={styles.txtTag}
        placeholder="Add Tags"
        value={txtTagName}
        styles={{
          control: (base) => ({
            ...base,
            border: "1 !important",
            boxShadow: "none",
            borderColor: "#ced4da !important",
          }),
        }}
      />
    </div>
    <div className={styles.tagsDiv}>
      {selectedTags.map((itm, index) => (
        <OverlayTrigger
          key={index}
          trigger="hover"
          placement="bottom"
          className={styles.tagCapsule}
          overlay={
            <Popover>
              <span>{itm.label}</span>
            </Popover>
          }
        >
          <div className={styles.tagCapsule}>
            <span className={styles.tagLabel}>{itm.label.length < 40 ? itm.label : itm.label.substring(0, 40).concat("...")}</span>
            <i className={[styles.tagClose, "fa fa-times-circle"].join(" ")} onClick={() => didRemoveTag(itm)} />
          </div>
        </OverlayTrigger>
      ))}
    </div>
  </>
);
const TabComponent = ({ selectedTab, didSelectTab }) => (
  <div className={styles.tabOuterDiv}>
    <div className={selectedTab === "image" ? styles.activeTabStyle : styles.uploadImageDiv} onClick={() => didSelectTab("image")}>
      <span className={styles.tabTextStyle}>Upload Images</span>
    </div>
    <div className={selectedTab === "video" ? styles.activeTabStyle : styles.uploadVideoDiv} onClick={() => didSelectTab("video")}>
      <span className={styles.tabTextStyle}>Upload Video</span>
    </div>
  </div>
);

const VideoFileUpload = ({ selectedVideos, didVideoSelected, didVideoRemove, uploadVideoName }) => (
  <>
    <Form id="custom-file">
      <Form.File
        type="file"
        accept="video/*"
        label={uploadVideoName ? uploadVideoName : "Upload Videos"}
        data-browse="Choose File"
        custom
        onChange={didVideoSelected}
      />
    </Form>
    <span className={styles.txtSupportedFiles}>**Supported file format is mp4, mov</span>
    <br />
    <span className={styles.txtSupportedFiles}>**Maximum upload video size: 150MB</span>
    <div className={styles.imgPreviewContainer}>
      {selectedVideos.map((itm, key) => (
        <div className={styles.imgPreviewDiv} key={key}>
          {/* <img className={styles.imgPreview} src={itm.thumbnail} alt={itm.thumbnail} /> */}
          <img className={styles.imgPreview} src={itm.thumbnail} />
          <i className={[styles.imgRemove, "fa fa-times"].join(" ")} onClick={() => didVideoRemove(itm.id)} />
        </div>
      ))}
    </div>
  </>
);
export default connect((state) => ({ user: state.user }), { setUser, resetUser })(withRouter(Dashboard));
