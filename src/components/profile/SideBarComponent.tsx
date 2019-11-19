import React, {useContext, useEffect, useState} from 'react';
import AuthContext from '../../components/auth/AuthContext';
import API from '../../api/API';
import sidebarStyles from '../../css/profile/SideBarComponent.module.css';
import commonStyles from '../../css/Common.module.css';

const SideBarComponent = (props: any) => {
    const { user } = useContext(AuthContext);
    const [ img, setImg ] = useState();
    const [ name, setName ] = useState();
    const [ lastName, setLastName ] = useState();
    const [ admin, setAdmin ] = useState();
    const [ email, setEmail ] = useState();
    
    useEffect(() =>{
        getFromServer();   // Get image from server
    })

    async function getFromServer(){
        try {
            let response = await API.user(5); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! CHANGE USER ID
            if (response.status === 200) {
                console.log(response.data);
                setImg(response.data.image);
                setName(response.data.name);
                setLastName(response.data.lastName);
                setAdmin(response.data.isAdmin);   
                setEmail(response.data.email);                
            }
        } catch (error) {
            if (error.response.status === 401 || error.response.status === 504) {
                console.log(error);
            }
            // If TwoFactorAuthentication
            if (error.response.status === 418) {
            }
        }
    }

    return (
        <div className={sidebarStyles.SideBarWrapper}>
            <h1>{name} {lastName}</h1>
            <h3>{(admin == '1') ? "Admin":"user"}</h3>
            <div className={sidebarStyles.imageWrapper}><img src={img} alt="profilepicture"/></div>
            <div className={sidebarStyles.text}>
                {/* <label className={commonStyles.label}>Telephone <input type="tel"></input>{tel}</label> */}
                <label className={commonStyles.label} htmlFor="email">email</label>
                <input className={commonStyles.input} name="email" type="tel" value={email}/>
            </div>
        </div>
    )
}

export default SideBarComponent;