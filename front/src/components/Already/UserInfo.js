import React from "react"
import { useParams, Link } from "react-router-dom"

function UserInfo(props) {
    const apiUrl = "http://localhost:3000"

    const { id } = useParams()

    function renderUserEditLink(userId) {
        if (id === undefined || parseInt(id) === userId) {
            return <Link to={`/users/${userId}/edit`}>Edit</Link>
        } else {
            return null
        }
    }

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
                        <th>name</th>
                        <th>{props.userName}</th>
                    </tr>
                    <tr>
                        <th>introduction</th>
                        <th>{props.userIntroduction}</th>
                    </tr>
                </tbody>
            </table>
            <div>{renderUserEditLink(props.currentUserId)}</div>
        </div>
    )
}

export default UserInfo
