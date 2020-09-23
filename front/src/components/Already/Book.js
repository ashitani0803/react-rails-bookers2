import React, { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import axios from "axios"
import BookForm from "./BookForm"
import UserInfo from "./UserInfo"

function Book(props) {
    const [book, setBook] = useState({})
    const [user, setUser] = useState({})

    const { id } = useParams()

    const history = useHistory()

    const apiUrl = "http://localhost:3000"

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

    function handleDestoryBook(e) {
        e.preventDefault()
        if (window.confirm("本当に消しますか？")) {
            axios
                .delete(`http://localhost:3000/books/${id}`, {
                    withCredentials: true,
                })
                .then((resp) => {
                    console.log(resp)
                    history.push("/books")
                })
                .catch((resp) => {
                    console.log("destroy book error", resp)
                })
        }
    }

    function renderBookLink() {
        if (user.id === props.currentUser.id) {
            return (
                <tr>
                    <td>
                        <Link to={`/users/${user.id}`}>
                            {user.image == undefined ||
                            user.image.url == null ? (
                                <img
                                    src={`${apiUrl}/uploads/user/image/0/no-image.png`}
                                    id='user-image'
                                ></img>
                            ) : (
                                <img
                                    src={`${apiUrl}/${user.image.url}`}
                                    id='user-image'
                                ></img>
                            )}
                            <br />
                            {user.name}
                        </Link>
                    </td>
                    <td>{book.title}</td>
                    <td>{book.body}</td>
                    <td>
                        <Link to={`/books/${id}/edit`}>Edit</Link>
                    </td>
                    <td>
                        <button onClick={handleDestoryBook}>Destroy</button>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>
                        <Link to={`/users/${user.id}`}>
                            {user.image == undefined ||
                            user.image.url == null ? (
                                <img
                                    src={`${apiUrl}/uploads/user/image/0/no-image.png`}
                                    id='user-image'
                                ></img>
                            ) : (
                                <img
                                    src={`${apiUrl}/${user.image.url}`}
                                    id='user-image'
                                ></img>
                            )}
                            <br />
                            {user.name}
                        </Link>
                    </td>
                    <td>{book.title}</td>
                    <td>{book.body}</td>
                    <td></td>
                    <td></td>
                </tr>
            )
        }
    }

    return (
        <div>
            {user.image === undefined ? (
                <UserInfo
                    userId={user.id}
                    userName={user.name}
                    userIntroduction={user.introduction}
                    userImage={"uploads/user/image/0/no-image.png"}
                />
            ) : (
                <UserInfo
                    userId={user.id}
                    userName={user.name}
                    userIntroduction={user.introduction}
                    userImage={user.image.url}
                />
            )}

            <BookForm />
            <h2>Book detail</h2>
            <table>
                <tbody>{renderBookLink()}</tbody>
            </table>
        </div>
    )
}

export default Book
