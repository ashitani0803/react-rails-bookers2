import React from "react"
import { Link } from "react-router-dom"

function UserInfo(props) {
    const apiUrl = "http://localhost:3000"

    return (
        <div>
            {props.userImage === null ? (
                <img
                    src={`${apiUrl}/uploads/user/image/0/no-image.png`}
                    id='user-image'
                />
            ) : (
                <img src={`${apiUrl}/${props.userImage}`} id='user-image' />
            )}
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
