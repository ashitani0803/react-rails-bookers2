import React from "react"
import { Link, useHistory } from "react-router-dom"

function Header(props) {
    const history = useHistory()

    function clickSignOut(e) {
        props.handleSignOut(e)
        // 親のAppコンポーネントではuseHistoryが使えない(historyがundefinedになる)
        history.push("/")
    }

    return (
        <header>
            <div>
                <nav>
                    <span>Bookers</span>
                </nav>
                <nav>
                    {props.signedInStatus ? (
                        <ul>
                            <li>
                                <Link to={`/users/${props.currentUser.id}`}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to='/users'>Users</Link>
                            </li>
                            <li>
                                <Link to='/books'>Books</Link>
                            </li>
                            <li>
                                <button
                                    id='logout-button'
                                    onClick={clickSignOut}
                                >
                                    logout
                                </button>
                            </li>
                        </ul>
                    ) : (
                        <ul>
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to='/home/about'>About</Link>
                            </li>
                            <li>
                                <Link to='/users/sign_up'>sign up</Link>
                            </li>
                            <li>
                                <Link to='/users/sign_in'>login</Link>
                            </li>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header
