import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import BookForm from "./BookForm"
import UserInfo from "./UserInfo"

function Books(props) {
    const [books, setBooks] = useState([])
    const [user, SetUser] = useState({})

    // idがないとundefiendが送られてしまう
    const { id } = useParams()

    useEffect(() => {
        async function getBooksInfo() {
            if (id === undefined) {
                await axios
                    .get("http://localhost:3000/books", {
                        withCredentials: true,
                    })
                    .then((resp) => {
                        console.log(resp)
                        setBooks(resp.data.books)
                        SetUser(resp.data.user)
                    })
                    .catch((resp) => {
                        console.log("get boks error", resp)
                    })
            } else {
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
        }
        getBooksInfo()
        // このidがないとHome-Books間の移動でuseEffectが呼び出されない
    }, [id])

    let booksIndex
    booksIndex = books.map((book, index) => {
        return (
            <tr key={book.id}>
                <td>
                    <Link to={`/books/${book.id}`}>{book.title}</Link>
                </td>
                <td>{book.body}</td>
            </tr>
        )
    })

    return (
        <div>
            {/* setUserが完了するまではuserは空なのでこの条件式が必要 */}
            {user.id === undefined ? null : (
                <UserInfo
                    // currentUserIdはログインユーザー以外のユーザーのeditリンクを非表示にする際に必要
                    currentUserId={props.userInfo.id}
                    userId={user.id}
                    userName={user.name}
                    userIntroduction={user.introduction}
                    // ここが原因！！！　nullを渡している
                    userImage={user.image.url}
                />
            )}
            <BookForm />
            <h2>Books</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
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
