import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import BookForm from "./BookForm"
import UserInfo from "./UserInfo"

function Book() {
    const [book, setBook] = useState({})
    const [user, setUser] = useState({})

    const { id } = useParams()

    useEffect(() => {
        async function getBookInfo() {
            await axios
                .get(`http://localhost:3000/books/${id}`, {
                    withCredentials: true,
                })
                .then((resp) => {
                    console.log(resp)
                    setBook(resp.data.book)
                    setUser(resp.data.user)
                })
                .catch((resp) => {
                    console.log("get book error", resp)
                })
        }
        getBookInfo()
    }, [])

    return (
        <div>
            <UserInfo
                userId={user.id}
                userName={user.name}
                userIntroduction={user.introduction}
            />
            <BookForm />
            <table>
                <tbody>
                    <tr>
                        <td>{user.name}</td>
                        <td>{book.title}</td>
                        <td>{book.body}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Book
