import React, { useState, useEffect } from "react";
import styles2 from "../RequestModifier.module.css";
import axios from "axios";
import Comment from "./Comment/Comment";
import styles from '../../../../../../css/VacReq.module.css';
import commonStyles from '../../../../../../css/Common.module.css';


const CommentSection = (props: any) => {
    let [comments, setComments] = useState()
    let [commentText, setCommentText] = useState("")

    function handleChange(event: any) { setCommentText(event.target.value)}

    useEffect(() => {
        getComments()
        // eslint-disable-next-line react-hooks/exhaustive-deps,
    }, [])

    function handleSubmit(event: any) {
        event.preventDefault();
        axios(process.env.REACT_APP_API_URL + "/request/" + props.requestId + "/comment",
            {
                method: "POST",
                withCredentials: true,
                data: {
                    comment: commentText
                },
                headers: {
                    Authorization: localStorage.getItem('jwt')
                }
            }
        )
        .then(() => {
            getComments()
            setCommentText("")
        })
    }

    function getComments() {
        let tempComments: any = []
        axios(process.env.REACT_APP_API_URL + "/request/" + props.requestId + "/comment",
            {
                method: "GET",
                withCredentials: true,
                headers: {
                    Authorization: localStorage.getItem('jwt')
                }
            }
        )
        .then((res: any) => {
            res.data.reverse()
            res.data.map((comment: any) => {
                return tempComments.push(
                    <Comment
                        key={comment.commentId}
                        comment={comment}
                        updateComments={() => {getComments()}}
                    />
                )
            })
            setComments(tempComments)
   
        })
        .catch((error: any) => {
            if (error.response.status === 401 || error.response.status === 403) {
                window.location.href = "/logout";
            }
        })
    }

    return (
        <div>
            <h2>Comment history</h2>
            <div className={styles2.comments}>
                {comments}
            </div>
            <form onSubmit={e => handleSubmit(e)}>
                <input 
                    className={commonStyles.textarea} 
                    placeholder="Comment" 
                    onChange={handleChange} 
                    value={commentText}
                ></input>
                <button type="submit" className={commonStyles.button}>Comment</button>
            </form>
        </div>
    )
}
export default CommentSection;