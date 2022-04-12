import React from "react";
import styles from './Header.module.sass'
import { logoutAction } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const ownersEmail = useSelector(state => state.user.currentUser.email)
    const verify = useSelector(state => state.user.currentUser.isActivated)
    const dispatch = useDispatch()

    return(
        <>
            <div className={styles.mainHeader}>
                <h1 className={styles.nameHeader}>RSS parser</h1>
                {isAuth ? <div><p className={styles.welcomeText}>Привет, {ownersEmail}</p> 
                {!verify ? <p className={styles.verifyInfo}>Аккаунт не подтвержден</p> : null}
                <button className = {styles.logoutButton} onClick={() => dispatch(logoutAction())}>Выйти</button></div> : 
                <p className={styles.neededText}>You need to login for use RssParser</p>} 
            </div>
        </>
    )
}

export default Header;



//<Link to='/Admin'>Admin page</Link>