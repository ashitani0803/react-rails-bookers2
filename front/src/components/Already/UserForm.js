import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useHistory } from "react-router-dom"
import TextField from "@material-ui/core/TextField"
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import { responsiveFontSizes } from "@material-ui/core"

function UserForm(props) {
    const [name, setName] = useState("")
    const [introduction, setIntroduction] = useState("")
    const [image, setImage] = useState("")

    const { id } = useParams()

    const history = useHistory()

    // const createObjectURL =
    //     (window.URL || window.webkitURL).createObjectURL ||
    //     window.createObjectURL

    useEffect(() => {
        // このif文がないと uncontrolled input のエラーが出る
        if (props.currentUser.id !== undefined) {
            if (parseInt(id) !== props.currentUser.id) {
                history.push(`/users/${props.currentUser.id}`)
            }
            setName(props.currentUser.name)
            setIntroduction(props.currentUser.introduction)
            setImage(props.currentUser.image)
        }
        // ここにprops.currentUserを入れないとフォームに初期値が入らない
    }, [props.currentUser])

    function handleUpdateUser(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", name)
        formData.append("introduction", introduction)
        formData.append("image", image)
        axios
            .patch(`http://localhost:3000/users/${id}`, formData, {
                withCredentials: true,
            })
            .then((resp) => {
                console.log(resp)
                props.setCurrentUser(resp.data.user)
                history.push(`/users/${resp.data.user.id}`)
            })
            .catch((resp) => {
                console.log("update user error", resp)
            })
    }

    function handleNameChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleIntroductionChange(e) {
        e.preventDefault()
        setIntroduction(e.target.value)
    }

    function handleImageChange(e) {
        e.preventDefault()
        // let files = e.target.files
        // let imageUrl = files.length === 0 ? "" : createObjectURL(files[0])
        setImage(e.target.files[0])
    }

    return (
        <div>
            <h2>User info</h2>
            <form onSubmit={handleUpdateUser}>
                <div>
                    <label>Name</label>
                    <TextField
                        label='Outlined'
                        variant='outlined'
                        name='name'
                        type='text'
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <label>Image</label>
                    {/* {image != undefined && <img src={image} id='user-image' />} */}

                    <input
                        type='file'
                        name='image'
                        onChange={handleImageChange}
                    />
                </div>
                <div>
                    <label>Introduction</label>
                    <TextareaAutosize
                        label='Outlined'
                        variant='outlined'
                        name='introduction'
                        type='text'
                        value={introduction}
                        onChange={handleIntroductionChange}
                    />
                </div>
                <div>
                    <button>Update User</button>
                </div>
            </form>
        </div>
    )
}

export default UserForm
