import React, {useEffect} from 'react';
import Login from "./components/LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {check} from "./actions/userActions";
import NewsList from './components/newsList';
import Footer from './components/Footer';
import Header from './components/Header';



function App2() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()


    useEffect(() => {
        if (localStorage.getItem('token')) {
          dispatch(check())
        }
      }, [])

    return (
            <div className='app'>
                <Header />
                <div className="wrap">
                    {!isAuth ? <Login /> : 
                    <div>
                      <NewsList />
                    
                    </div>}
                </div>

                <Footer />
            </div>
    );
}

export default App2;
