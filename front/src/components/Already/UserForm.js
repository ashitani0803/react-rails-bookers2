import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useHistory } from "react-router-dom"
import TextField from "@material-ui/core/TextField"
import TextareaAutosize from "@material-ui/core/TextareaAutosize"

function UserForm(props) {
    const [name, setName] = useState(props.currentUser.name)
    const [introduction, setIntroduction] = useState(
        props.currentUser.introsuction
    )

    const { id } = useParams()

    const history = useHistory()

    function handleUpdateUser(e) {
        console.log(id)
        e.preventDefault()
        axios
            .patch(
                `http://localhost:3000/users/${id}`,
                {
                    user: {
                        name: name,
                        introduction: introduction,
                    },
                },
                { withCredentials: true }
            )
            .then((resp) => {
                console.log(resp)
                props.setCurrentUser(resp.data.user)
                history.push(`/users/${resp.data.user.id}`)
            })
            .catch((resp) => {
                console.log("update user error", resp)
            })
    }

    function handleNameChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleIntroductionChange(e) {
        e.preventDefault()
        setIntroduction(e.target.value)
    }

    return (
        <div>
            <h2>User info</h2>
            <form onSubmit={handleUpdateUser}>
                <div>
                    <label>Name</label>
                    <TextField
                        label='Outlined'
                        variant='outlined'
                        name='name'
                        type='text'
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <label>Introduction</label>
                    <TextareaAutosize
                        label='Outlined'
                        variant='outlined'
                        name='introduction'
                        type='text'
                        value={introduction}
                        onChange={handleIntroductionChange}
                    />
                </div>
                <div>
                    <button>Update User</button>
                </div>
            </form>
        </div>
    )
}

export default UserForm
