import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../auth/AuthContext';
import SettingsStyles from '../../css/profile/SettingComponent.module.css';
import commonStyles from '../../css/Common.module.css';
import API from '../../api/API';
import Modal from '../common/modal/Modal';
import pictures from '../../pic/undraw_authentication_fsn5.svg'

const SettingComponent = (props: any) => {
    const { user } = useContext(AuthContext);
    let [showModal, setshowModal] = useState(false);
    let [showModal2, setshowModal2] = useState(false);

    let [oldPass, setOldPass] = useState();
    let [newPass1, setNewPass1] = useState();
    let [newPass2, setNewPass2] = useState();

    let [twoAuth, setTwoAuth ] = useState();

    function UpdatePasswordModal(){
        setshowModal(true);
    }

    function Update2faModal(){
        setshowModal2(true);
    }

    useEffect(() =>{
        NewAuth(user!.twoFacAut!);
    },[])

    // Sets new useState for auth - switches the number from 0 to 1 or 1 to 0
    function NewAuth(number:any){
        console.log(number);
        if(number == 0){
            setTwoAuth(1);
        } else if (number == 1){
            setTwoAuth(0);
        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(user);

        let oldPassword = testOldPassword();
        let newPassword = testNewPasswords();
        
        //Update password in database
        if(await oldPassword === true && newPassword === true){
            try {
                let response = await API.updateUserPassword(user!.userId, user!.userId, newPass1);
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
        console.log(props.email);
        console.log(oldPass);
        try {
            let response = await API.login(props.email, oldPass);
            if (response.status === 200) {
                console.log("test");
                return true;
            }
        } catch (error) {
            if (error.response.status === 401 || error.response.status === 504) {
                console.log("asd");
                return false;
            }
            // If TwoFactorAuthentication
            if (error.response.status === 418) {
                console.log("ga");
                return false;
            }
        }
    }

    // update 2fa for database
    const update2fa = async (event: any) => {
        event.preventDefault();
        let number=event.target.value;
        
        //UPDATE 2fa
        try {
            let response = await API.updateUser2fa(user!.userId, user!.userId, number);
            console.log(number);
            if (response.status === 200) {
                console.log("Updated users 2fa");
                NewAuth(number);
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
            <button className={[commonStyles.button, SettingsStyles.button].join(" ")} value="changePassword" onClick={Update2faModal}>Two factor authentication</button>

            <Modal display={showModal} setDisplay={setshowModal}>
                <h1>New password</h1>
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

            <Modal className={SettingsStyles.modal} display={showModal2} setDisplay={setshowModal2}>
                <h1>Two Factor Authentication - is {(() => {
                    switch(twoAuth) {
                    case 1:
                        return <span className={SettingsStyles.notActivated}>not activated</span>;         
                    case 0:
                        return <span className={SettingsStyles.Activated}>activated</span>;                    
                    default:
                        return null;
                    }
                })()} for your account</h1>
                

                <p>Two Factor Authentication, or 2FA, adds an extra layer of protection to ensure the security of your accounts beyond just a username and password.</p>
                
                <div className={SettingsStyles.twoFactorAuthimg}><img src={pictures} alt="2fa picture"/></div>
                
                <div>{(() => {
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
        </div>
    )
}

export default SettingComponent;