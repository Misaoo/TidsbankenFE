import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../components/auth/AuthContext";
import API from "../../api/API";
import sidebarStyles from "../../css/profile/SideBarComponent.module.css";
import commonStyles from "../../css/Common.module.css";
import Modal from "../common/modal/Modal";
import Webcam from "react-webcam";
import axios from "axios";
import SettingComponent from "../../components/profile/SettingComponent";


/**********************/
// This file handles the:
//    1. picture functionality, 
//    2. name of user, 
/**********************/

const SideBarComponent = (props: any) => {
  const { user } = useContext(AuthContext);
  const [img, setImg] = useState();                           // handles image for user 
  const [name, setName] = useState();                         // first name for user
  const [lastName, setLastName] = useState();                 // Lastname
  const [admin, setAdmin] = useState();                       // If user is admin or not
  const [usremail, setEmail] = useState();
  const [webcamMsg, setWebcamMsg] = useState();
  const [imgUploadMsg, setImgUploadMsg] = useState();

  let [showModalPicture, setshowModalPicture] = useState(false);      // Show and set picture 
  let [showModalWebcam, setshowModalWebcam] = useState(false);        // Show and set webcam  

  let [browsePic, setBrowsePic] = useState();                 //  handles the browsing for picture. 

  /**********************/
  /* GENERAL */
  /**********************/
  useEffect(() => {
    if (user && user.userId) {
      getFromServer(user.userId); // Get image from server
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, [user]);

  // Gets all information from user on server and displays it. Example, image - name - email etc. 
  async function getFromServer(userId: number) {
    try {
      let response = await API.user(userId);
      if (response.status === 200) {
        setImg(response.data.profilePic);
        setName(response.data.name);
        setLastName(response.data.lastName);
        setAdmin(response.data.isAdmin);
        setEmail(response.data.email);
        props.setEmail(response.data.email);
      }
    } catch (error) { }
  }


  /**********************/
  /* WEBCAM */
  /**********************/
  const videoConstraints = {
    facingMode: "user"
  };

  // Handles the webcam
  const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(() => {

      const imageSrc = (webcamRef as any).current.getScreenshot();

      updateUserImage(imageSrc);
      setImg(imageSrc);
    }, [webcamRef]);

    return (
      <>
        <div className={commonStyles.buttonplacement}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            mirrored={false}
          />
        </div>

        <div className={commonStyles.buttonplacement}>
          <br />
          {webcamMsg}
          <br />
          <button
            className={commonStyles.buttonpa}
            onClick={capture}
          >
            Capture photo
        </button>
          <button
            className={commonStyles.buttonpa}
            onClick={event => setshowModalWebcam(false)}
          >
            Close
        </button>
        </div>
      </>
    );
  };

  /**********************/
  /* BROWSE PICTURE */
  /**********************/

  // Saves the picture that the user has browsed for. 
  async function savePictureBrowse(e: any) {
    e.preventDefault();
    var base64data: any;
    if (user && user.userId) {
      var userId = user.userId;
    }
    var reader = new FileReader();
    reader.readAsDataURL(browsePic);
    reader.onloadend = function () {
      base64data = reader.result;
      axios(process.env.REACT_APP_API_URL + "/user/" + userId, {
        method: "PATCH",
        withCredentials: true,
        data: {
          userId: userId,
          email: usremail,
          name: name,
          lastName: lastName,
          isAdmin: admin,
          profilePic: base64data
        }
      }).then(res => {
        if (res.status === 200) {
          setImgUploadMsg('Image uploaded.')
          setImg(base64data);
        }
      })
        .catch((error) => {
          if (error.response.status === 400) {
            //console.log(error);
            setImgUploadMsg('Failed to upload image.')
          }
        })
    };
  }

  /**********************/
  /* IMAGE */
  /**********************/

  async function updateUserImage(img: string) {
    if (user && user.name) {
      axios(process.env.REACT_APP_API_URL + "/user/" + user.userId, {
        method: "PATCH",
        withCredentials: true,
        data: {
          userId: user.userId,
          email: user.email,
          name: user.name,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
          profilePic: img
        }
      })
        .then(res => {
          if (res.status === 200) {
            //console.log('ok picture stored')
            setWebcamMsg('Image saved')
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            //console.log(error);
            setWebcamMsg('Failed to save image from webcam')
          }
        });
    }
  }

  function handleChangePicture(e: any) {
    setBrowsePic(e.target.files[0]);
  }

  function changeImage(target: string, event: any) {
    if (target === "browse") {
      setshowModalPicture(true);
    } else {
      setshowModalWebcam(true);
    }
  }


  /**********************/
  /* HTML */
  /**********************/

  return (
    <div className={sidebarStyles.SideBarWrapper}>

      <div className={sidebarStyles.imageWrapper}>
        <div className={sidebarStyles.selectNewImage}>
          <div onClick={evt => changeImage("browse", evt)}>
            <p>Browse picture</p>
          </div>
          <div onClick={evt => changeImage("webcam", evt)}>
            <p>Webcam picture</p>
          </div>
        </div>
        <img src={img} alt="profilepicture" />
      </div>

      <h1>
        {name} {lastName}
      </h1>
      <h3>{admin === "1" ? "Admin" : "Employee"}</h3>

      <div className={sidebarStyles.text}>
        <label className={commonStyles.label} htmlFor="email">
          Email
        </label>
        <input
          className={commonStyles.input}
          disabled
          name="email"
          type="email"
          value={props.email}
        />
      </div>

      <div>
        <SettingComponent></SettingComponent>
      </div>




      <Modal display={showModalPicture} setDisplay={setshowModalPicture} title="Upload a picture">
        <form onSubmit={savePictureBrowse}>
          <label className={commonStyles.label} htmlFor="savePic">
            Please provide link to picture
          </label>
          <input
            type="file"
            name="savePic"
            onChange={handleChangePicture}
            className={commonStyles.input}
          />
          <div className={commonStyles.buttonplacement}>
            <br />
            {imgUploadMsg}
            <br />
            <button
              type="submit"
              className={commonStyles.buttonpa}
            >
              Save
            </button>
            <button
              className={commonStyles.buttonpa}
              onClick={event => setshowModalPicture(false)}
            >
              close
            </button>
          </div>
        </form>
      </Modal>

      <Modal display={showModalWebcam} setDisplay={setshowModalWebcam} title="Take a picture">
        {WebcamCapture()}
      </Modal>
    </div>
  );
};

export default SideBarComponent;
