import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"
import TextField from "@material-ui/core/TextField"

function SignIn(props) {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory()

    function handleSignIn(e) {
        e.preventDefault()
        axios
            .post(
                "http://localhost:3000/users/sign_in/",
                {
                    user: {
                        name: name,
                        password: password,
                    },
                },
                { withCredentials: true }
            )
            .then((resp) => {
                if (resp.data.status === "signedIn") {
                    console.log(resp)
                    // componentが破棄される前にstateを更新しないといけない
                    setName("")
                    setPassword("")
                    props.handleSignedIn(resp.data.user)
                    console.log(history)
                    history.push(`/users/${resp.data.user.id}`)
                }
            })
    }

    function handleNameChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handlePasswordChange(e) {
        e.preventDefault()
        setPassword(e.target.value)
    }

    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleSignIn}>
                <div>
                    <label>Name</label>
                    <br />
                    <TextField
                        id='outlined-basic'
                        label='Outlined'
                        variant='outlined'
                        name='name'
                        type='text'
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <br />
                    <TextField
                        id='outlined-basic'
                        label='Outlined'
                        variant='outlined'
                        name='password'
                        type='password'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div>
                    <button type='submit'>Log in</button>
                </div>
                <Link to='/users/sign_up'>Sign up</Link>
            </form>
        </div>
    )
}

export default SignIn
