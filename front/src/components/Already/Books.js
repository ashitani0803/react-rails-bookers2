import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import BookForm from "./BookForm"

function Books() {
    const [books, setBooks] = useState([])

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
            <tr key={index}>
                <td>{book.title}</td>
                <td>{book.body}</td>
            </tr>
        )
    })

    return (
        <div>
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
