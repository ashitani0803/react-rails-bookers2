import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import BookForm from "./BookForm"
import UserInfo from "./UserInfo"

function Books(props) {
    const [books, setBooks] = useState([])
    const [user, SetUser] = useState({})

    const { id } = useParams()

    useEffect(() => {
        async function getBooksInfo() {
            await axios
                .get(
                    "http://localhost:3000/books",
                    {
                        params: {
                            id: id,
                        },
                    },
                    {
                        withCredentials: true,
                    }
                )
                .then((resp) => {
                    console.log(resp)
                    setBooks(resp.data.books)
                    SetUser(resp.data.user)
                })
                .catch((resp) => {
                    console.log("get boks error", resp)
                })
        }
        getBooksInfo()
        // このidがないとHome-Books間の移動でuseEffectが呼び出されない
    }, [id])

    let booksIndex
    booksIndex = books.map((book, index) => {
        return (
            <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.body}</td>
            </tr>
        )
    })

    return (
        <div>
            {user === undefined ? (
                <UserInfo
                    userId={props.userInfo.id}
                    userName={props.userInfo.name}
                    userIntroduction={props.userInfo.introduction}
                />
            ) : (
                <UserInfo
                    userId={user.id}
                    userName={user.name}
                    userIntroduction={user.introduction}
                />
            )}
            <BookForm />
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                </thead>
                <tbody>{booksIndex}</tbody>
            </table>
        </div>
    )
}

export default Books
