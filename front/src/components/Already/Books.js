import React from "react"
import { useParams } from "react-router-dom"
import BookForm from "./BookForm"

function Books() {
    const { id } = useParams()

    return (
        <div>
            <BookForm />
            <div>Books{id}</div>
        </div>
    )
}

export default Books
