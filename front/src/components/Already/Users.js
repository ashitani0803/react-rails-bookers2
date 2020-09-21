import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import BookForm from "./BookForm"
import UserInfo from "./UserInfo"

function Users(props) {
    const apiUrl = "http://localhost:3000"

    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getUsersInfo() {
            await axios
                .get("http://localhost:3000/users", {
                    withCredentials: true,
                })
                .then((resp) => {
                    console.log(resp)
                    setUsers(resp.data.users)
                })
                .catch((resp) => {
                    console.log("get users error", resp)
                })
        }
        getUsersInfo()
    }, [])

    let usersIndex
    usersIndex = users.map((user, index) => {
        return user.image.url === null ? (
            <tr key={user.id}>
                <td>
                    <img
                        src={`${apiUrl}/uploads/user/image/0/no-image.png`}
                        id='user-image'
                    />
                </td>
                <td>{user.name}</td>
                <td>
                    <Link to={`users/${user.id}`}>Show</Link>
                </td>
            </tr>
        ) : (
            <tr key={user.id}>
                <td>
                    <img src={`${apiUrl}/${user.image.url}`} id='user-image' />
                </td>
                <td>{user.name}</td>
                <td>
                    <Link to={`/users/${user.id}`}>Show</Link>
                </td>
            </tr>
        )
    })

    return (
        <div>
            {props.userInfo.image === undefined ? (
                <UserInfo
                    userId={props.userInfo.id}
                    userName={props.userInfo.name}
                    userIntroduction={props.userInfo.introduction}
                    userImage={"uploads/user/image/0/no-image.png"}
                />
            ) : (
                <UserInfo
                    userId={props.userInfo.id}
                    userName={props.userInfo.name}
                    userIntroduction={props.userInfo.introduction}
                    userImage={props.userInfo.image.url}
                />
            )}
            <BookForm />
            <table>
                <thead>
                    <tr>
                        <th>image</th>
                        <th>name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{usersIndex}</tbody>
            </table>
        </div>
    )
}

export default Users
