import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useHistory } from "react-router-dom"
import TextField from "@material-ui/core/TextField"
import TextareaAutosize from "@material-ui/core/TextareaAutosize"

function BookEdit(props) {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const { id } = useParams()

    const history = useHistory()

    useEffect(() => {
        async function getBookInfo() {
            await axios
                .get(`http://localhost:3000/books/${id}`, {
                    withCredentials: true,
                })
                .then((resp) => {
                    console.log(resp)
                    setTitle(resp.data.book.title)
                    setBody(resp.data.book.body)
                    if (resp.data.user.id !== props.currentUser.id) {
                        history.push(`/books`)
                    }
                })
                .catch((resp) => {
                    console.log("get book error", resp)
                })
        }
        getBookInfo()
    }, [])

    function handleUpdateBook(e) {
        e.preventDefault()
        axios
            .patch(
                `http://localhost:3000/books/${id}`,
                {
                    book: {
                        title: title,
                        body: body,
                    },
                },
                { withCredentials: true }
            )
            .then((resp) => {
                console.log(resp)
                history.push(`/books/${id}`)
            })
            .catch((resp) => {
                console.log("update book error".resp)
            })
    }

    function handleTitleChange(e) {
        e.preventDefault()
        setTitle(e.target.value)
    }

    function handleBodyChange(e) {
        e.preventDefault()
        setBody(e.target.value)
    }

    return (
        <div>
            <h2>Editing Book</h2>
            <form onSubmit={handleUpdateBook}>
                <div>
                    <label>Title</label>
                    <TextField
                        label='Outlined'
                        variant='outlined'
                        name='title'
                        type='text'
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    <label>Body</label>
                    <TextareaAutosize
                        label='Outlined'
                        variant='outlined'
                        name='body'
                        type='text'
                        value={body}
                        onChange={handleBodyChange}
                    />
                </div>
                <div>
                    <button>Update Book</button>
                </div>
            </form>
        </div>
    )
}

export default BookEdit
