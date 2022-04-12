import React, { useEffect, useState } from 'react';
import dateFormat from 'dateformat';
import style from './newsList.module.sass'
import { useDispatch, useSelector } from 'react-redux';
import {deletePost, getPosts, updatingPost} from '../../actions/postActions'
import AddPost from '../AddPost';
import EditPost from '../EditPost'

function NewsList() {
    const [pageId, setPages] = useState(1);
    const [isFetching, setisFetching] = useState(false);
    const [title, setTitle] = useState('')
    const [sort, setSort] = useState('DESC');
    const [idForEdit, setIdForEdit] = useState('')
    const news = useSelector(state => state.post.news)
    const showEdit = useSelector(state => state.post.showEdit)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getPosts(pageId, sort, title))
        setTimeout(() => {
          setisFetching(true)
        }, 2000);
    },[news]);
    
    const editingPost = (id) => {
      setIdForEdit(id)
      dispatch(updatingPost())
    }
    
    const mapNews = ({ id, title, link, rssDate, image }) => {

        return (
            <li className = {style.titleInfo} key={id}>
              {title}
              <img src={image} alt="image of news" className = {style.imageNews} ></img>
              <p className = {style.linkInfo}><a href={link}>Link for read more</a></p>
              <p className = {style.dateInfo}>{dateFormat(rssDate, 'dd.mm.yyyy')}</p>
              <button onClick={() => {dispatch(deletePost({id}))}}>Delete</button>
              <button onClick={() => editingPost(id)}>Edit</button>
            </li>
            
            
        );
    };
    return (
        <>  
          <div className={style.mainNews}>
            <div className = {style.newsList}>
              {!isFetching ? <div>Загрузка...</div> : <ul className = {style.allNews}>{news.map(mapNews)}</ul>}
              <div className={style.editingPost}>{showEdit ? <EditPost id={idForEdit}/> : null}</div>
                <div className = {style.searchNews}>
                <input className = {style.searchField} onChange = {e => setPages(1) & setTitle(e.target.value)} placeholder='  Поиск по названию...'></input>
                <select value={sort}
                            onChange={(e) => setPages(1) & setSort(e.target.value)}
                            className={style.select}>
                        <option value="DESC">По убыванию</option>
                        <option value="ASC">По возрастанию</option>
                    </select>
                    <AddPost />
                </div>
            </div>
            <div className = {style.pageContainer}>
              <div className={style.page}>{pageId}</div>
              <div className={style.buttonContainer}>
                <button className = {style.buttonPage} onClick = {() => news.length < 3 ? null : setPages(pageId + 1) }> + </button>
                <button className = {style.buttonPage} onClick = {() => pageId > 1 ? setPages(pageId - 1) : null}> - </button>
              </div>
            </div>
            
          </div>
        </>
  );
}


export default NewsList;