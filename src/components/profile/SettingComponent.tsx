import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../auth/AuthContext';
import SettingsStyles from '../../css/profile/SettingComponent.module.css';
import commonStyles from '../../css/Common.module.css';
import API from '../../api/API';
import Modal from '../common/modal/Modal';
import authpicture from '../../pic/undraw_authentication_fsn5.svg';
import removepicture from '../../pic/undraw_notify_88a4.svg';

const SettingComponent = (props: any) => {
    const { user } = useContext(AuthContext);
    let [showModal, setshowModal] = useState(false);
    let [showModal2, setshowModal2] = useState(false);
    let [showModal3, setshowModal3] = useState(false);

    let [oldPass, setOldPass] = useState();
    let [newPass1, setNewPass1] = useState();
    let [newPass2, setNewPass2] = useState();

    let [twoAuth, setTwoAuth ] = useState();

    function UpdatePasswordModal(){ setshowModal(true); }
    function Update2faModal(){ setshowModal2(true); }
    function Update3faModal(){ setshowModal3(true); }

    useEffect(() =>{
        if(user && user.name) {
            NewAuth(user.twoFacAut);
        }
    },[user])

    // Sets new useState for auth - switches the number from 0 to 1 or 1 to 0
    function NewAuth(number:any){
        if(number == 0){
            setTwoAuth(1);
        } else if (number == 1){
            setTwoAuth(0);
        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        let oldPassword = testOldPassword();
        let newPassword = testNewPasswords();
        
        //Update password in database
        if(await oldPassword === true && newPassword === true){
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

    function handleChangeOldPass(event:any){ setOldPass(event.target.value); }
    function handleChangeNewPass1(event:any){ setNewPass1(event.target.value); }
    function handleChangeNewPass2(event:any){ setNewPass2(event.target.value); }

    // Test old password so it's correct compared to the one in the database
    const testOldPassword = async () => {
        try {
            // let response = await API.login(props.email, oldPass);
            let response = await API.validatePassword(oldPass)
            if (response.status === 200) {
                return true;
            }
        } catch (error) {
            // if (error.response.status === 401 || error.response.status === 504) {
            //     return false;
            // }
            // // If TwoFactorAuthentication
            // if (error.response.status === 418) {
            //     return false;
            // }
        }
    }

    // update 2fa for database
    const update2fa = async (event: any) => {
        event.preventDefault();
        let number=event.target.value;
        
        //UPDATE 2fa
        try {
            let response = await API.updateUser2fa(user!.userId, number);
            if (response.status === 200) {
                NewAuth(number);
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

    const deleteAccount = async (event:any) => {
        event.preventDefault();
        

        //UPDATE 2fa
        try {
            let response = await API.deleteAccount(user!.userId);
            if (response.status === 200) {
                console.log("deleted account");
                
                if (typeof window !== 'undefined') {
                    window.location.href = "/logout";
               }
            }
        } catch (error) {
            if (error.response.status === 401 || error.response.status === 504) {
                console.log(error);
                console.log("asd");
            }
            // If TwoFactorAuthentication
            if (error.response.status === 418) {
            }
            console.log(error);
        }
    }

    function testNewPasswords(){
        if(newPass1 === newPass2){
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className={SettingsStyles.wrapper}>
            <button className={[commonStyles.button, SettingsStyles.button].join(" ")} value="changePassword" onClick={UpdatePasswordModal}>Change Password</button>
            <button className={[commonStyles.button, SettingsStyles.button].join(" ")} onClick={Update2faModal}>Two factor authentication</button>
            <button className={[commonStyles.button, SettingsStyles.button].join(" ")} onClick={Update3faModal}>Delete account</button>

            <Modal display={showModal} setDisplay={setshowModal} title="New password">
                <form onSubmit={handleSubmit}>
                    <label className={commonStyles.label} htmlFor="OldPassword">Old Password</label>
                    <input className={commonStyles.input} type="password" name="OldPassword" value={oldPass} placeholder="Enter your old password" onChange={handleChangeOldPass}/>

                    <label className={commonStyles.label} htmlFor="NewPassword">New Password</label>
                    <input className={commonStyles.input} type="password" name="NewPassword" value={newPass1} placeholder="Enter your new password" onChange={handleChangeNewPass1}/>

                    <label className={commonStyles.label} htmlFor="NewPassword">New Password</label>
                    <input className={commonStyles.input} type="password" name="NewPassword" value={newPass2} placeholder="Enter your new password" onChange={handleChangeNewPass2}/>

                    <button className={[commonStyles.button, SettingsStyles.twoFabBtn].join(" ")} type="submit">Submit</button>
                </form>
            </Modal>

            <Modal className={SettingsStyles.modal} display={showModal2} setDisplay={setshowModal2} title="Two factor authentication">
                <h3>Two Factor Authentication - is {(() => {
                    switch(twoAuth) {
                    case 1:
                        return <span className={SettingsStyles.notActivated}>not activated</span>;         
                    case 0:
                        return <span className={SettingsStyles.Activated}>activated</span>;                    
                    default:
                        return null;
                    }
                })()} for your account</h3>
                

                <p>Two Factor Authentication, or 2FA, adds an extra layer of protection to ensure the security of your accounts beyond just a username and password.</p>
                
                <div className={SettingsStyles.twoFactorAuthimg}><img src={authpicture} alt="2fa picture"/></div>
                
                <div>{(() => {
                    console.log(twoAuth);
                    switch(twoAuth) {
                    case 1:
                        return <button className={[commonStyles.button, SettingsStyles.twoFabBtn].join(" ")} onClick={update2fa} value={1} >Activate 2fa</button>;
                    case 0:
                        return <button className={[commonStyles.button, SettingsStyles.twoFabBtn].join(" ")} onClick={update2fa} value={0} >Remove 2fa</button>;
                    default:
                        return null;
                    }
                })()} </div>
            </Modal> 

            <Modal display={showModal3} setDisplay={setshowModal3} title="Delete Account">
                <p>Are you sure? Your account will be permanently deleted and will not be recoverable.</p>
                <div className={SettingsStyles.twoFactorAuthimg}><img src={removepicture} alt="2fa picture"/></div>
                <button className={[commonStyles.button, SettingsStyles.twoFabBtn].join(" ")} onClick={deleteAccount}>Delete my Account</button>
            </Modal>
        </div>
    )
}

export default SettingComponent;