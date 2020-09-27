import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"

function BookEdit(props) {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const { id } = useParams()

    const history = useHistory()

    const { register, errors, handleSubmit } = useForm()

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
        // e.preventDefault()
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
            <form onSubmit={handleSubmit(handleUpdateBook)}>
                <div>
                    <label>Title</label>
                    <input
                        label='Outlined'
                        variant='outlined'
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
                    <textarea
                        label='Outlined'
                        variant='outlined'
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
                    <button>Update Book</button>
                </div>
            </form>
        </div>
    )
}

export default BookEdit
