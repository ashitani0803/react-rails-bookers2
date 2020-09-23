import React, { useState, useEffect } from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./components/Welcome/Home"
import About from "./components/Welcome/About"
import SignUp from "./components/Welcome/SignUp"
import SignIn from "./components/Welcome/SignIn"
import Users from "./components/Already/Users"
import Books from "./components/Already/Books"
import Book from "./components/Already/Book"
import UserForm from "./components/Already/UserForm"
import BookEdit from "./components/Already/BookEdit"
import axios from "axios"

function App(props) {
    const [signedInStatus, setSignedInStatus] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    function handleSignedIn(user) {
        setSignedInStatus(true)
        setCurrentUser(user)
    }

    function handleSignOut(e) {
        e.preventDefault()
        axios
            .delete("http://localhost:3000/users/sign_out", {
                withCredentials: true,
            })
            .then((resp) => {
                setSignedInStatus(false)
                setCurrentUser({})
            })
            .catch((resp) => {
                console.log("sign out error", resp)
            })
    }

    useEffect(() => {
        async function getSignedInData() {
            await axios
                .get("http://localhost:3000/users/signed_in", {
                    withCredentials: true,
                })
                .then((resp) => {
                    if (resp.data.status === "signedIn") {
                        console.log(resp)
                        handleSignedIn(resp.data.user)
                    }
                })
                .catch((resp) => {
                    console.log("not logged in", resp)
                })
        }
        getSignedInData()
    }, [])

    return (
        <div>
            <Router>
                <Header
                    signedInStatus={signedInStatus}
                    handleSignOut={handleSignOut}
                    currentUser={currentUser}
                />
                {signedInStatus ? (
                    <Switch>
                        <Route
                            exact
                            path='/users/:id'
                            render={() => <Books userInfo={currentUser} />}
                        ></Route>
                        <Route
                            exact
                            path='/users'
                            render={() => <Users userInfo={currentUser} />}
                        ></Route>
                        <Route
                            exact
                            path='/books'
                            render={() => <Books userInfo={currentUser} />}
                        ></Route>
                        <Route
                            exact
                            path='/books/:id'
                            render={() => <Book currentUser={currentUser} />}
                        ></Route>
                        <Route
                            exact
                            path='/users/:id/edit'
                            render={() => (
                                <UserForm
                                    currentUser={currentUser}
                                    setCurrentUser={setCurrentUser}
                                />
                            )}
                        ></Route>
                        <Route
                            exact
                            path='/books/:id/edit'
                            render={() => (
                                <BookEdit currentUser={currentUser} />
                            )}
                        ></Route>
                    </Switch>
                ) : (
                    <Switch>
                        <Route exact path='/' component={Home}></Route>
                        <Route
                            exact
                            path='/home/about'
                            component={About}
                        ></Route>
                        <Route
                            exact
                            path='/users/sign_up'
                            render={() => (
                                <SignUp handleSignedIn={handleSignedIn} />
                            )}
                        ></Route>
                        <Route
                            exact
                            path='/users/sign_in'
                            render={() => (
                                <SignIn handleSignedIn={handleSignedIn} />
                            )}
                        ></Route>
                    </Switch>
                )}
                <Footer />
            </Router>
        </div>
    )
}

export default App
