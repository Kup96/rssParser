import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {updatePost, closeUpdatingPost} from "../../actions/postActions";
import style from '../EditPost/editPost.module.sass'

const EditPost = (props) => {
    const {id} = props;
    const [title, setTitle] = useState()
    const [link, setLink] = useState()
    const [image, setImage] = useState()
    const dispatch = useDispatch()


    return (
        <div className={style.updateContainer}>
            <button className={style.closeButton} onClick={() => dispatch(closeUpdatingPost())}>X</button>
            <div className={style.addPostMain}>
                <p>Редактирование поста</p>
                <input  onChange = {e => setTitle(e.target.value)} placeholder="Введите новое название"/>
                <input  onChange = {e => setImage(e.target.value)} placeholder="Ссылка на новое изображение"/>
                <input onChange = {e => setLink(e.target.value)} placeholder="Введите новую ссылку"/>
                <button className = {style.updateButton} onClick={() => dispatch(updatePost(id, title, link, image))}>Редактировать</button>
            </div>
        </div>
    );
};

export default EditPost;
