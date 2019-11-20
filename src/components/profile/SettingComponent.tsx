import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../auth/AuthContext';
import SettingsStyles from '../../css/profile/SettingComponent.module.css';
import commonStyles from '../../css/Common.module.css';
import API from '../../api/API';
import Modal from '../common/modal/Modal';

const SettingComponent = (props: any) => {
    const { user } = useContext(AuthContext);
    let [showModal, setshowModal] = useState(false);
    let [showModal2, setshowModal2] = useState(false);

    let [oldPass, setOldPass] = useState();
    let [newPass1, setNewPass1] = useState();
    let [newPass2, setNewPass2] = useState();

    let [twoAuth, setTwoAuth] = useState();

    function UpdatePasswordModal(){
        setshowModal(true);
    }

    function Update2faModal(){
        setshowModal2(true);
    }

    useEffect(() =>{
        console.log(user);
    },[])

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(user);

        let oldPassword = testOldPassword();
        let newPassword = testNewPasswords();
        
        //UPDATE PASSWORD
        if(await oldPassword === true && newPassword === true){
            try {
                let response = await API.updateUserPassword(user!.userId, user!.userId, newPass1);
                if (response.status === 200) {
                    console.log("USER PERFECT");
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
    }

    function handleChangeOldPass(event:any){ setOldPass(event.target.value); }
    function handleChangeNewPass1(event:any){ setNewPass1(event.target.value); }
    function handleChangeNewPass2(event:any){ setNewPass2(event.target.value); }

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

    const update2fa = async (event: any) => {
        event.preventDefault();
        let number=event.target.value;
        
        
        //UPDATE 2fa
        try {
            let response = await API.updateUser2fa(user!.userId, user!.userId, number);
            if (response.status === 200) {
                console.log("Updated users 2fa");
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
            <button value="changePassword" onClick={UpdatePasswordModal}>Change Password</button>
            <button value="changePassword" onClick={Update2faModal}>Add 2fa</button>

            <Modal display={showModal} setDisplay={setshowModal}>
                <form onSubmit={handleSubmit}>
                    <label className={commonStyles.label} htmlFor="OldPassword">Old Password</label>
                    <input type="password" name="OldPassword" value={oldPass} placeholder="Enter your old password" onChange={handleChangeOldPass}/>

                    <label className={commonStyles.label} htmlFor="NewPassword">New Password</label>
                    <input type="password" name="NewPassword" value={newPass1} placeholder="Enter your new password" onChange={handleChangeNewPass1}/>

                    <label className={commonStyles.label} htmlFor="NewPassword">New Password</label>
                    <input type="password" name="NewPassword" value={newPass2} placeholder="Enter your new password" onChange={handleChangeNewPass2}/>

                    <button type="submit">Submit</button>
                </form>
            </Modal>

            <Modal display={showModal2} setDisplay={setshowModal2}>
                <h1>2fa</h1>
                <p>You can add two auth authentication to your acount or remove it.</p>
                <input type="checkbox" name="2fa" value={twoAuth}></input>    
                <button onClick={update2fa} value={1}>Add 2fa</button>
                <button onClick={update2fa} value={0} >Remove 2fa</button>
            </Modal> 
        </div>
    )
}

export default SettingComponent;