import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {addPost} from "../../actions/postActions";
import style from './addPost.module.sass'

const AddPost = () => {
    const [title, setTitle] = useState()
    const [link, setLink] = useState()
    const [image, setImage] = useState()
    const dispatch = useDispatch()


    const addNewPost = (e, title, link, image) => {
        e.preventDefault()
        dispatch(addPost(title, link, image));
        setLink('');
        setTitle('');
        setImage('')
    }
    return (
        <div className={style.addPostMain}>
            <p>Добавление новости</p>
            <input value = {title} onChange = {e => setTitle(e.target.value)} placeholder="Введите новое название"/>
            <input value = {image} onChange = {e => setImage(e.target.value)} placeholder="Ссылка на изображение"/>
            <input value = {link} onChange = {e => setLink(e.target.value)} placeholder="Введите новую ссылку"/>
            <button onClick={(e) => addNewPost(e, title, link, image)}>Добавить</button>
        </div>
    );
};

export default AddPost;
