import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styles from "../RequestModifier.module.css";
import axios from "axios";
import Comment from "./Comment/Comment";

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
                withCredentials: true
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
        <div className={styles.commentsContainer}>
            <h3>Comments</h3>
            <div className={styles.comments}>{comments}</div>
            <form className={styles.commentSubmit} onSubmit={(e: any) => handleSubmit(e)}>
                <div className={styles.commentTextfield}>
                    <TextField
                        name="text"
                        rows="1"
                        fullWidth={true}
                        variant="outlined"
                        label="Comment here..."
                        value={commentText}
                        onChange={handleChange}
                    ></TextField>
                </div>
                <div className={styles.commentButton}>
                    <Button variant="contained" type="submit" color="primary">
                        Comment
                    </Button>
                </div>
            </form>
      </div>
    )
}
export default CommentSection;