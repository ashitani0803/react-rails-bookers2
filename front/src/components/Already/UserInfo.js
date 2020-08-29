import React from "react"
import { Link } from "react-router-dom"

function UserInfo(props) {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>{props.userName}</th>
                        <th>{props.userInroduction}</th>
                    </tr>
                </tbody>
            </table>
            <div>
                <Link to={`/users/${props.userId}/edit`}>Edit</Link>
            </div>
        </div>
    )
}

export default UserInfo
