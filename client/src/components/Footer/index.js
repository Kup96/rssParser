import React from 'react';
import styles from '../Footer/Footer.module.sass'

const Footer = () => {
    return (
        <>
        <div className = {styles.Footer}>
            <h1 className={styles.textFooter}> Developed by Kirill Filatov</h1>
            <a href="https://t.me/Kup96"><img className={styles.image} src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7BRhdHNvRAyK_LDVR3AVmD5FEoeJq0so0dg&usqp=CAU" alt="icon"></img></a>
        </div>
        </>
    )
}

export default Footer;
