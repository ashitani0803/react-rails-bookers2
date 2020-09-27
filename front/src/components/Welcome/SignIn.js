import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"

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
                    // componentが破棄される前にstateを更新しないといけない
                    setName("")
                    setPassword("")
                    props.handleSignedIn(resp.data.user)
                    history.push(`/users/${resp.data.user.id}`)
                } else if (resp.data.error) {
                    console.log(resp.data.error)
                }
            })
            .catch((resp) => {
                console.log("sign in error", resp)
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
                    <input
                        id='outlined-basic'
                        label='Outlined'
                        name='name'
                        type='text'
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <br />
                    <input
                        id='outlined-basic'
                        label='Outlined'
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
