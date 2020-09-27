import React, { useState } from "react"
import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"

function SignUp(props) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password_confirmation, setPasswordConfirmation] = useState("")

    const history = useHistory()

    const { register, errors, handleSubmit, reset } = useForm()

    function handleSignUp(e) {
        // e.preventDefault()
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
                console.log("sign up error", resp.error)
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
            <form onSubmit={handleSubmit(handleSignUp)}>
                <div>
                    <label>Name</label>
                    <br />
                    <input
                        label='name'
                        name='name'
                        type='text'
                        value={name}
                        ref={register({
                            required: "Name can't be blank",
                            minLength: {
                                value: 2,
                                message:
                                    "Name is too short (minimum is 2 characters)",
                            },
                        })}
                        onChange={handleNameChange}
                    />
                    <br />
                    {errors.name && (
                        <p className='error-message'>{errors.name.message}</p>
                    )}
                </div>
                <div>
                    <label>Email</label>
                    <br />
                    <input
                        label='email'
                        name='email'
                        type='email'
                        value={email}
                        ref={register({
                            required: "Email can't be blank",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "This email is invalid",
                            },
                        })}
                        onChange={handleEmailChange}
                    />
                    <br />
                    {errors.email && (
                        <p className='error-message'>{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <label>Password (6 characters minimum)</label>
                    <br />
                    <input
                        label='password'
                        name='password'
                        type='password'
                        value={password}
                        ref={register({
                            required: "Password can't be blank",
                            minLength: {
                                value: 6,
                                message:
                                    "Password is too short (minimum is 6 characters)",
                            },
                        })}
                        onChange={handlePasswordChange}
                    />
                    <br />
                    {errors.password && (
                        <p className='error-message'>
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div>
                    <label>password Confirmation</label>
                    <br />
                    <input
                        label='password_confirmation'
                        name='password_confirmation'
                        type='password'
                        value={password_confirmation}
                        ref={register({
                            validate: (value) =>
                                // wacthを使うとvalidationに引っかかった後setPasswordが動かなくなる
                                value === password ||
                                "Password confirmation doesn't match Password",
                        })}
                        onChange={handlePasswordConfirmationChange}
                    />
                    <br />
                    {errors.password_confirmation && (
                        <p className='error-message'>
                            {errors.password_confirmation.message}
                        </p>
                    )}
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
