import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {login, registration} from "../../actions/userActions";
import styles from "./Login.module.sass"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    return (
        <div className={styles.loginForm}>
            <p className={styles.textForm}>Авторизация</p>
            <input className={styles.inputText} onChange = {e => setEmail(e.target.value)} placeholder="Введите email..."/>
            <input className={styles.inputText} onChange = {e => setPassword(e.target.value)} placeholder="Введите пароль..."/>
            <button className={styles.loginButton} onClick={() => dispatch(login(email, password))}>Войти</button>
            <p className={styles.textForm}>Если нет аккаунта - зарегистрируйтесь</p>
            <button className={styles.loginButton} onClick={() => registration(email, password)}>Зарегистрироваться</button>
        </div>
    );
};

export default Login;
