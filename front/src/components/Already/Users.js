import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import BookForm from "./BookForm"
import UserInfo from "./UserInfo"

function Users(props) {
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
        return (
            <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                    <Link to={`users/${user.id}`}>Show</Link>
                </td>
            </tr>
        )
    })

    return (
        <div>
            <UserInfo
                userId={props.userInfo.id}
                userName={props.userInfo.name}
                userIntroduction={props.userInfo.introduction}
            />
            <BookForm />
            <table>
                <thead>
                    <tr>
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
