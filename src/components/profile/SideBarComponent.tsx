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
    setBrowsePic(null)
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
    const capture = (e: any) => {
    const imageSrc = (webcamRef as any).current.getScreenshot();

    updateUserImage(imageSrc, e)
      setImg(imageSrc);
    }
    return (
      <>        
        <form onSubmit={capture}>
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
            <label className={commonStyles.badLabel}>{webcamMsg}</label>
            <br />
            <button
              className={commonStyles.buttonpa}
              type="submit"
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
        </form>
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
        },
        headers: {
          Authorization: localStorage.getItem('jwt')
        }
      }).then(res => {
        if (res.status === 200) {
          setImgUploadMsg('Image uploaded.')
          setTimeout(() => setImgUploadMsg(""), 3000)
          setImg(base64data);
          setshowModalPicture(false)
        }
      })
        .catch((error) => {
          if (error.response.status === 400) {
            setImgUploadMsg('Failed to upload image.')
            setTimeout(() => setImgUploadMsg(""), 3000)
          }
        })
    };
  }

  /**********************/
  /* IMAGE */
  /**********************/

  async function updateUserImage(img: string, e: any) {
    e.preventDefault();
    let userIdd = 0
    if (user && user.userId) {
      userIdd = user.userId;
    }
    axios(process.env.REACT_APP_API_URL + "/user/" + userIdd, {
      method: "PATCH",
      withCredentials: true,
      data: {
        userId: userIdd,
        email: usremail,
        name: name,
        lastName: lastName,
        isAdmin: admin,
        profilePic: img
      },
      headers: {
        Authorization: localStorage.getItem('jwt')
      }
    })
      .then(res => {
        if (res.status === 200) {
          setshowModalWebcam(false)
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setWebcamMsg('Failed to save image from webcam, try again')
          setTimeout(() => setWebcamMsg(""), 3000)
        }
      }); 
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
        <img src={img} height="200" alt="profilepicture" />
      </div>

      <h1>
        {name} {lastName}
      </h1>
      <h3>{(() => {
        if(admin === 1){
          return 'Group manager'
        } else if (admin === 2) {
          return 'Region manager'
        } else {
          return 'Employee'
        }
      }) ()}</h3>

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
            <label className={commonStyles.successLabel}>{imgUploadMsg}</label>
            <br />
            <button
              className={commonStyles.buttonpa}
              disabled={(browsePic === null)}
              type="submit"
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
