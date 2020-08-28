import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import BookForm from "./BookForm"

function Book(props) {
    const [book, setBook] = useState({})

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
                })
                .catch((resp) => {
                    console.log("get book error", resp)
                })
        }
        getBookInfo()
    }, [])

    return (
        <div>
            <BookForm />
            <table>
                <tbody>
                    <tr>
                        <td>{props.currentUser.name}</td>
                        <td>{book.title}</td>
                        <td>{book.body}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Book
