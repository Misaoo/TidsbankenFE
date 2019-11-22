import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../components/auth/AuthContext';
import API from '../../api/API';
import vacationStyles from '../../css/profile/VacationComponent.module.css';

const VacationComponent = (props: any) => {
    const { user } = useContext(AuthContext);
    let [ approvedVacationdays, setApprovedVacationsdays ] = useState<any[]>([]);
    let [ deniedVacationdays, setDeniedVacationsdays ] = useState();
    let [ pendingVacationdays, setPendingVacationsdays ] = useState();

    useEffect(() =>{
        if(user){
            getFromServer(user!.userId!);   // Get image from server
        }
    }, [user])

    async function getFromServer(id:any){
        console.log(id);
        try {
            console.log(id);
                let response1 = await API.vacationsApproved(id);
                let response2 = await API.vacationsDenied(id);
                let response3 = await API.vacationsPending(id);
                
            if (response1.status === 200 || response2.status === 200 || response3.status === 200) {
                console.log(response1.data);
                addResponseDataToLi(response1, setApprovedVacationsdays);
                console.log(response1.data);  
                addResponseDataToLi(response2, setDeniedVacationsdays);
                addResponseDataToLi(response3, setPendingVacationsdays);  
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
        console.log(approvedVacationdays);
    }

    function addResponseDataToLi(response:any, where:any){
        var arr = [];       // Is used for temporary storing for setting state after loop is done
        let i = 0;          // Unique key for html elements
        for(let obj of response.data){
            for(let date of obj.dates){
                i++;
                let dateOnly = date.substring(0, date.indexOf('T'));
                const liElement = (<li key={i}>{dateOnly}</li>);
                arr.push(liElement);
            }  
        }
        where(arr);
    }

    return (
        <div className={vacationStyles.wrapper}>
            <div>
                <h1>Pending vacation requests</h1>
                <ul>{pendingVacationdays}</ul>
            </div>

            <div>
                <h1>Upcoming vacation days</h1>
                <ul>{approvedVacationdays}</ul>
            </div>
            
            <div>
                <h1>Denied vacation days</h1>
                <ul>{deniedVacationdays}</ul>
            </div>
        </div>
    )
}

export default VacationComponent;