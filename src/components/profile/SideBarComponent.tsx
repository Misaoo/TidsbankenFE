import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../components/auth/AuthContext";
import API from "../../api/API";
import sidebarStyles from "../../css/profile/SideBarComponent.module.css";
import commonStyles from "../../css/Common.module.css";
import Modal from "../common/modal/Modal";
import Webcam from "react-webcam";
import axios from "axios";

  /**********************/
  // This file handles the:
  //    1. picture functionality, 
  //    2. name of user, 
  //    3. email
  /**********************/

const SideBarComponent = (props: any) => {
  const { user } = useContext(AuthContext);   
  const [img, setImg] = useState();                           // handles image for user 
  const [name, setName] = useState();                         // first name for user
  const [lastName, setLastName] = useState();                 // Lastname
  const [admin, setAdmin] = useState();                       // If user is admin or not

  const [saved, setSaved] = useState(false);                  // handles a small message that tells user if email has been saved to database
  let [timer, setTimer] = useState(0);                        // handles a timer that resets the save message

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
    }, [webcamRef, user]);

    return (
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          mirrored={true}
        />
        <button
          className={
            commonStyles.button + " " + sidebarStyles.buttonTweaks_webcam
          }
          onClick={capture}
        >
          Capture photo
        </button>
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
          profilePic: base64data
        }
      }).then(() => {
        setImg(base64data);
      });
    };
  }

  /**********************/
  /* IMAGE */
  /**********************/

  async function updateUserImage(img: string) {
    if(user && user.name) {
      try {
        let response = await API.updateUserImage(user.userId, img);
        if (response.status === 200) { }
      } catch (error) { }
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
  /* EMAIL */
  /**********************/
  async function updateUserEmail(userId: number, email:string) {
    try {
      let response = await API.updateUser(
        userId,
        email
      );
      if (response.status === 200) {
        setSaved(true);
        setTimer(
          window.setTimeout(() => {
            setSaved(false);
          }, 3000)
        );
      }
    } catch (error) { }
  }
  
  function handleChange(e: any) {
    e.preventDefault();
    let type = e.target.type;
    let value = e.target.value;
    props.setEmail(value);

    // CLICK OUTSIDE CONTAINER
    window.onclick = function () {
      if (type === "email") {
        window.clearTimeout(timer); //cancel the previous timer.
        if (user && user.userId) {
          updateUserEmail(user.userId, value); // Update user in server
        }
      }
      window.onclick = null;
    };

    // ENTER KEYPRESS
    document.addEventListener("keydown", function enterKey(event: any) {
      if (event.keyCode === 13) {
        console.log("test");
        if (user && user.userId) {
          updateUserEmail(user.userId, value);
        }
        window.clearTimeout(timer); //cancel the previous timer.
      }
      document.removeEventListener("keydown", enterKey); // cancel the previous eventlistener
    });
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

      <form onSubmit={handleChange}>
        <h1>
          {name} {lastName}
        </h1>
        <h3>{admin === "1" ? "Admin" : "Employee"}</h3>

        <div className={sidebarStyles.text}>
          <label className={commonStyles.label} htmlFor="email">
            Email
          </label>
          <p>{saved ? "Saved" : ""}</p>
          <input
            className={commonStyles.input}
            name="email"
            type="email"
            value={props.email}
            onChange={handleChange}
            onKeyPress={e => {
              if (e.key === "Enter") {
                handleChange(e);
              }
            }}
          />
        </div>
      </form>

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
          <button
            type="submit"
            className={commonStyles.button + " " + sidebarStyles.buttonTweaks}
          >
            Save
          </button>
        </form>
      </Modal>

      <Modal display={showModalWebcam} setDisplay={setshowModalWebcam} title="Take a picture">
        {WebcamCapture()}
      </Modal>
    </div>
  );
};

export default SideBarComponent;
