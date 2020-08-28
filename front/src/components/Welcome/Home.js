import React from "react"
import { Link } from "react-router-dom"

function Home() {
    return (
        <div>
            <p>
                <Link to='/users/sign_in'>Log in</Link>
            </p>
            <p>
                <Link to='/users/sign_up'>SignUp</Link>
            </p>
        </div>
    )
}

export default Home
