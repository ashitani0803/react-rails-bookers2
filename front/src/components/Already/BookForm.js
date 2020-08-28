import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import TextField from "@material-ui/core/TextField"
import TextareaAutosize from "@material-ui/core/TextareaAutosize"

function BookForm(props) {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const history = useHistory()

    function handleCreateBook(e) {
        e.preventDefault()
        axios
            .post(
                "http://localhost:3000/books",
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
                setTitle("")
                setBody("")
                history.push(`/books/${resp.data.book.id}`)
            })
            .catch((resp) => {
                console.log("create book error", resp)
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
            <h2>New Book</h2>
            <form onSubmit={handleCreateBook}>
                <div>
                    <label>Title</label>
                    <br />
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
                    <br />
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
                    <button>Create Book</button>
                </div>
            </form>
        </div>
    )
}

export default BookForm
