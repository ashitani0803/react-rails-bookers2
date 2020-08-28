import React, { useState } from "react"
import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import TextField from "@material-ui/core/TextField"

function SignUp(props) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password_confirmation, setPasswordConfirmation] = useState("")

    const history = useHistory()

    function handleSignUp(e) {
        e.preventDefault()
        axios
            .post(
                "http://localhost:3000/users/sign_up/",
                {
                    user: {
                        name: name,
                        email: email,
                        password: password,
                        password_confirmation: password_confirmation,
                    },
                },
                { withCredentials: true }
            )
            .then((resp) => {
                if (resp.data.status === "created") {
                    console.log(resp)
                    setName("")
                    setEmail("")
                    setPassword("")
                    setPasswordConfirmation("")
                    props.handleSignedIn(resp.data.user)
                    history.push(`/users/${resp.data.user.id}`)
                }
            })
            .catch((resp) => {
                console.log("sign up error", resp)
            })
    }

    function handleNameChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }
    function handleEmailChange(e) {
        e.preventDefault()
        setEmail(e.target.value)
    }
    function handlePasswordChange(e) {
        e.preventDefault()
        setPassword(e.target.value)
    }
    function handlePasswordConfirmationChange(e) {
        e.preventDefault()
        setPasswordConfirmation(e.target.value)
    }

    return (
        <div>
            <h2>SignUp</h2>
            <form onSubmit={handleSignUp}>
                <div>
                    <label>Name</label>
                    <br />
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
                    <label>Email</label>
                    <br />
                    <TextField
                        label='Outlined'
                        variant='outlined'
                        name='email'
                        type='email'
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <label>Password (6 characters minimum)</label>
                    <br />
                    <TextField
                        label='Outlined'
                        variant='outlined'
                        name='password'
                        type='password'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div>
                    <label>password Confirmation</label>
                    <br />
                    <TextField
                        label='Outlined'
                        variant='outlined'
                        name='password_confirmation'
                        type='password'
                        value={password_confirmation}
                        onChange={handlePasswordConfirmationChange}
                    />
                </div>
                <div>
                    <button type='submit'>Sign up</button>
                </div>
                <Link to='/users/sign_in'>Log in</Link>
            </form>
        </div>
    )
}

export default SignUp
