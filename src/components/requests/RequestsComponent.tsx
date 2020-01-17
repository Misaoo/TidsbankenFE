import React, { useState, useEffect } from 'react';
import API from '../../api/API';
import styles from '../../css/VacReq.module.css';
import reqStyles from '../../css/Request.module.css';
import commonStyles from '../../css/Common.module.css';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';

/*
    The requests component represents a detailed view for a specific request. 
    It is used when a user clicks on a mark (See Mark.tsx) and in a view (See views/requests/Requests.tsx)
*/

const RequestsComponent = (props: any) => {

    const [req, setReq] = useState<any>();
    const [owner, setOwner] = useState<any>();
    const [success, setSuccess] = useState(false);
    const [comments, setComments] = useState<any>();
    const [commentsList, setCommentsList] = useState();
    const [commentText, setCommentText] = useState("");
    const [showComments, setShowComments] = useState(true);


    // Creates a list of divs that represents the comments on a request.
    // It makes sure to fetch the users info (mainly to get the name of the user) only once per user
    const createCommentList = (comments: any) => {
        let reversedComments = [...comments].reverse();
        let list: any = [];
        let commenters: Set<number> = new Set();

        reversedComments.map((comment: any) => {
            return commenters.add(comment.userId);
        })

        const fetches = Array.from(commenters).map(async (userId: number) => {
            return (await API.user(userId)).data;
        });

        Promise.all(fetches)
            .then((res: any) => {
                reversedComments.map((comment: any) => {
                    let user = res.filter((user: any) => user.userId === comment.userId)[0];
                    return list = [...list, <div className={styles.comment}><b>{user.name + " " + user.lastName + ": "}</b>{comment.comment}</div>];
                });
                setCommentsList(list);
            })
            .catch(() => {
                //catch error
            });
    }

    // On Mount / when props.id or success changes, fetch the vacation request and then the comments for that request
    useEffect(() => {
        API.getVacationRequest(props.id)
            .then((res: any) => {
                setReq(res.data);
                API.user(res.data.userId)
                    .then((res: any) => {
                        setOwner(res.data);
                    })
                    .catch(() => {
                        //catch error
                    })
                API.getVacationRequestComments(res.data.requestId)
                    .then((res: any) => {
                        setComments(res.data);
                        createCommentList(res.data);
                    })
                    .catch((error: any) => {
                        if (error.response.status === 403) {
                            setShowComments(false);
                        }
                    });
            })
            .catch(() => {
                //catch error
            })

    }, [props.id, success]);


    const getStatus = (status: number) => {
        let statuses = ['Pending', 'Denied', 'Approved'];
        return statuses[status];
    }

    // Creates the small divs representing the list of days that are pertaining to the request
    const createDays = () => {
        let arr: any = [];
        req.dates.map((date: any, index: number) => {
            return arr = [...arr, <div key={index} title={format(new Date(date), 'EEE do MMMM')}>{format(new Date(date), 'yyyy-MM-dd')}</div>]
        });
        return arr;
    }

    const handleChange = (event: any) => {
        setCommentText(event.target.value);
    }
    
    const handleFocus = (event: any) => {
        setSuccess(false);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
            API.postVacationRequestComment(props.id, commentText)
                .then((res: any) => {
                    setSuccess(true);
                    setCommentText("");
                })
                .catch(() => {
                    // catch error
                })
    }

    return (
        <div>
            <div className={styles.module}>
                {req && owner && <div className={styles.request}>
                    <p>Request ID:  <Link to={"/requests/" + req.requestId}>{req.requestId}</Link></p>
                    <p>Owner: {owner.name + " " + owner.lastName}</p>
                    <p>Request status: <span className={styles[getStatus(req.status).toLowerCase()] + " " + styles.status}>{getStatus(req.status)}</span></p>
                    <p>Request type: {req.type}</p>
                    <p>Vacation days:</p><div className={styles.dates}> {createDays()}</div>
                </div>}
                {req && owner && comments && showComments && <>
                    <div>
                        <h2>Comment history</h2>
                        <div className={styles.comments}>
                            {commentsList}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input 
                                onFocus={handleFocus} 
                                className={commonStyles.textarea} 
                                placeholder="Comment" 
                                onChange={handleChange} 
                                value={commentText}
                            ></input>
                            <button type="submit" className={commonStyles.button}>Comment</button>
                        </form>
                        {success &&
                            <>
                                <br/>
                                <p className={reqStyles.success}>
                                    <FontAwesomeIcon icon="check-circle" />Comment posted
                                </p>
                            </>
                        }
                    </div>
                </>}
            </div>
        </div>
    )
}

export default RequestsComponent;