import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import styles from "../../RequestModifier.module.css";

const Comment = (props: any) => {
    let [popup, setPopup] = useState()
    let [commentText, setCommentText] = useState(props.comment.comment)
    let [commenter, setCommenter] = useState("User " + props.comment.userId + ": ")
    let [isAdmin, setIsAdmin] = useState(false)

   function handleChange(event: any) { setCommentText(event.target.value)}

    useEffect(() => {
        getName()
        // eslint-disable-next-line react-hooks/exhaustive-deps,
    }, [])

    function handleSubmit(event: any) {
        event.preventDefault();

        if (!(commentText === props.comment.comment)) {
            axios(process.env.REACT_APP_API_URL + "/request/" + props.comment.requestId + "/comment/" + props.comment.commentId,
                {
                    method: "PATCH",
                    withCredentials: true,
                    data: {
                      comment: commentText
                   }
                }
            )
            .then(() => {
                props.updateComments()
            })
            .catch((error: any) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    window.location.href = "/logout"
                }
            });
        }
    }

    function togglePopup() {
        axios(process.env.REACT_APP_API_URL + "/authorize", {
            method: "POST",
            withCredentials: true
        })
        .then((res: any) => {
            if (res.data.userId === props.comment.userId && new Date(props.comment.createdAt) > new Date(Date.now() - 60 * 60 * 24 * 1000)) {
                setPopup(!popup)
            }
        })
        .catch((error: any) => {
            if (error.response.status === 401 || error.response.status === 403) {
                window.location.href = "/logout"
            }
        });
    }


    function deleteComment() {
        axios(process.env.REACT_APP_API_URL + "/request/" + props.comment.requestId + "/comment/" + props.comment.commentId,
            {
                method: "DELETE",
                withCredentials: true
            }
        )
        .then(() => {
            props.updateComments()
        });
    }

    function getName() {
        axios(process.env.REACT_APP_API_URL + "/user/" + props.comment.userId,
            {
            method: "GET",
            withCredentials: true
            }
        )
        .then(res => {
            setIsAdmin(res.data.isAdmin === 1)
            setCommenter(res.data.name + " " + res.data.lastName)
        });
    }

    let edited = ""
    return (
        <>
            {!(props.comment.createdAt === props.comment.updatedAt) && (
                edited = "(edited)"
            )}         
            
            <div className={styles.comment} onClick={() => togglePopup()}>
                <b>
                    {commenter} {isAdmin && <b>(admin)</b>} :{" "}
                </b>
                {props.comment.comment} <b>{edited}</b>
                {popup && (
                    <div>
                        <br/>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                type="text"
                                name="text"
                                label="Edit comment here..."
                                variant="outlined"
                                defaultValue={props.comment.comment}
                                onClick={(event: any) => event.stopPropagation()}
                                onChange={handleChange}
                                multiline
                            >
                            </TextField>

                            <Button type="submit" color="primary">
                                Edit
                            </Button>
                        </form>
                        <Button onClick={() => deleteComment()} color="secondary">
                            Delete comment
                        </Button>
                    </div>
                )}
            </div>
        </>
    )
}
export default Comment;