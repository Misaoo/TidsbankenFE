import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../auth/AuthContext';
import SettingsStyles from '../../css/profile/SettingComponent.module.css';
import commonStyles from '../../css/Common.module.css';
import API from '../../api/API';
import Modal from '../common/modal/Modal';
import authpicture from '../../pic/undraw_authentication_fsn5.svg';
import removepicture from '../../pic/undraw_notify_88a4.svg';

/* This file controlls three buttons in the profile page: 
        1. change password 
        3. delete account request to admin  
*/

const SettingComponent = (props: any) => {
    const { user } = useContext(AuthContext);
    let [showModal, setshowModal] = useState(false);    //popup for password
    let [showModal2, setshowModal2] = useState(false);  //popup for two factor authentication


    let [oldPass, setOldPass] = useState();             // used for controlling if the old password is equal to the one that the user enters in the input fields in the popup
    let [newPass1, setNewPass1] = useState();           // new password
    let [newPass2, setNewPass2] = useState();           // new password have to match
    let [statusText, setStatusText] = useState();
    let [isRequested, setIsRequested] = useState(false);


    /*******************************/
    /* AUTHENTICATION */
    /*******************************/

    function removeAccountModal() { setshowModal2(true); }
    // checks if user have two factor authentication and sets and send the infomration to NewAuth that sets it in a useState. 

    const removeAccountReq = async (event: any) => {
        event.preventDefault();
        let remove = event.target.value;
        console.log('remove ', remove)
        //send request to api
        if (remove === '1') {
            try {
                // do api call to backend
                console.log('tjoo')
                console.log('user: ', user!.userId)
                let response = await API.removeAccountRequest(user!.userId);
                if (response.status === 200) {
                    setStatusText('Account removal request sent.')
                    setIsRequested(true)

                }

                //setshowModal2(false)

            } catch (error) {
                console.log(error)
                console.log(error.response)
                if (error.response.status === 404) {
                    console.log('400 error... print stuff.')
                    setStatusText('Something went wrong please try again')
                }
            }
        } else {
            console.log('do nothing :P')
        }
    }

    /*******************************/
    /* PASSOWRD */
    /*******************************/

    function UpdatePasswordModal() { setshowModal(true); }   // is called when the user pressed the password button. This makes the popup show. 

    // When user presses the submit button for changing password it changes to 
    const handlePasswordSubmit = async (event: any) => {
        event.preventDefault();

        let oldPassword = testOldPassword();
        let newPassword = testNewPasswords();

        //Update password in database
        if (await oldPassword === true && newPassword === true) {
            try {
                let response = await API.updateUserPassword(user!.userId, newPass1);
                if (response.status === 200) {
                    console.log("USER updated his password");
                }
            } catch (error) {
                if (error.response.status === 401 || error.response.status === 504) {
                    console.log(error);
                }
                // If TwoFactorAuthentication
                if (error.response.status === 418) {
                }
                console.log(error);
            }
        }
    }

    function handleChangeOldPass(event: any) { setOldPass(event.target.value); }      // gets the old password from the input field and send it further to a function that checks if it is the correct
    function handleChangeNewPass1(event: any) { setNewPass1(event.target.value); }    // Takes the new password and sets it
    function handleChangeNewPass2(event: any) { setNewPass2(event.target.value); }    // Takes the new password and sets it

    // Test old password so it's correct compared to the one in the database
    const testOldPassword = async () => {
        try {
            // let response = await API.login(props.email, oldPass);
            let response = await API.validatePassword(oldPass)
            if (response.status === 200) {
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Checks if new password are matching in the input fields
    function testNewPasswords() {
        if (newPass1 === newPass2) {
            return true;
        } else { return false; }
    }

    /**********************/
    /* HTML */
    /**********************/

    return (
        <div className={SettingsStyles.wrapper}>
            <button className={[commonStyles.button, SettingsStyles.button].join(" ")} value="changePassword" onClick={UpdatePasswordModal}>Change Password</button>
            <button className={[commonStyles.button, SettingsStyles.button].join(" ")} onClick={removeAccountModal}>Remove account</button>

            <Modal display={showModal} setDisplay={setshowModal} title="New password">
                <form onSubmit={handlePasswordSubmit}>
                    <label className={commonStyles.label} htmlFor="OldPassword">Old Password</label>
                    <input className={commonStyles.input} type="password" name="OldPassword" value={oldPass} placeholder="Enter your old password" onChange={handleChangeOldPass} />

                    <label className={commonStyles.label} htmlFor="NewPassword">New Password</label>
                    <input className={commonStyles.input} type="password" name="NewPassword" value={newPass1} placeholder="Enter your new password" onChange={handleChangeNewPass1} />

                    <label className={commonStyles.label} htmlFor="NewPassword">New Password</label>
                    <input className={commonStyles.input} type="password" name="NewPassword" value={newPass2} placeholder="Enter your new password" onChange={handleChangeNewPass2} />

                    <button className={[commonStyles.button, SettingsStyles.twoFabBtn].join(" ")} type="submit">Submit</button>
                </form>
            </Modal>

            <Modal className={[SettingsStyles.modal, SettingsStyles.modalpa]} display={showModal2} setDisplay={setshowModal2} title="Remove account request">

                <div className={commonStyles.buttonplacement}>
                    <h1><p>Are you sure you want to remove your account?<br /> A request will be sent to your admin.</p></h1>
                    <br />

                    {statusText}
                </div>

                <div className={commonStyles.buttonplacement}>
                    {(() => {

                        if (!isRequested) {
                            return [<button key="btn1"className={[commonStyles.buttonpa].join(" ")} onClick={removeAccountReq} value={'1'} >Yes</button>,
                            <button key="btn2"className={[commonStyles.buttonpa].join(" ")} onClick={event => setshowModal2(false)} >No</button>];
                        } else {
                            return <button key="btn3" className={[commonStyles.buttonpa].join(" ")} onClick={event => setshowModal2(false)} >Close</button>
                        }

                    })()} </div>
            </Modal>
        </div>
    )
}

export default SettingComponent;