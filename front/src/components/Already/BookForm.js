import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"

function BookForm(props) {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const history = useHistory()

    const { register, errors, handleSubmit } = useForm()

    function handleCreateBook(e) {
        // e.preventDefault()
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
            <form onSubmit={handleSubmit(handleCreateBook)}>
                <div>
                    <label>Title</label>
                    <br />
                    <input
                        label='title'
                        name='title'
                        type='text'
                        value={title}
                        ref={register({ required: "Title can't be blank" })}
                        onChange={handleTitleChange}
                    />
                    <br />
                    {errors.title && (
                        <p className='error-message'>{errors.title.message}</p>
                    )}
                </div>
                <div>
                    <label>Body</label>
                    <br />
                    <textarea
                        label='body'
                        name='body'
                        type='text'
                        value={body}
                        ref={register({
                            required: "Body can't be blank",
                            maxLength: {
                                value: 200,
                                message:
                                    "Body is too long (maximum is 200 characters)",
                            },
                        })}
                        onChange={handleBodyChange}
                    />
                    <br />
                    {errors.body && (
                        <p className='error-message'>{errors.body.message}</p>
                    )}
                </div>
                <div>
                    <button>Create Book</button>
                </div>
            </form>
        </div>
    )
}

export default BookForm
