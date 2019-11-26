import React, { useEffect, useState } from 'react';
import API from '../../../api/API';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CalendarAdmin = (props: any) => {

    const [success, setSuccess] = useState<any>(false);
    const [error, setError] = useState<any>(false);

    const removeIneligbleDay = (id: number) => {
        API.removeIneligbleDay(id)
            .then((res: any) => {
                if (res.status === 200) {
                    setSuccess(true);
                    props.setUpdateIneligible((u:number) => u + 1);
                }
            })
            .catch((error: any) => {
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