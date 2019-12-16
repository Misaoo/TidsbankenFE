import React, { useState } from 'react';
import API from '../../../api/API';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*
    The CalendarAdmin component is responsible for listing ineligble days and allowing for 
    the admin to remove them. The component is only rendered if the user is an admin.
*/

const CalendarAdmin = (props: any) => {

    const [error, setError] = useState<any>(false);

    const removeIneligbleDay = (id: number) => {
        API.removeIneligbleDay(id)
            .then((res: any) => {
                if (res.status === 200) {
                    props.setUpdateIneligible((u:number) => u + 1);
                }
            })
            .catch((error: any) => {
                console.log(error)
                setError(true);
            })
    }

    return <div className={props.className}>
        <h3>Remove Ineligible Days</h3>
        {error && <p>There was an error removing the ineligble day</p>}
        <div>
            {props.ineligibleDays.map((obj: any) => (
                <div key={obj.ineligibleId}>
                    <p>{format(new Date(obj.date), 'yyyy-MM-dd')}</p>
                    <button onClick={() => removeIneligbleDay(obj.ineligibleId)}><FontAwesomeIcon icon="times" /></button>
                </div>
            ))}
        </div>
    </div>
}

export default CalendarAdmin;