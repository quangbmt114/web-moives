import Cookies from 'js-cookie';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import {useState,useEffect} from 'react'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';
import styles from '../../../component/ContentHome/ContentHome.module.css'
function FavoriteMovies() {
  const accessToken = Cookies.get('token');
    const [data,setData]= useState([])
    //get api
    const axios = require('axios');
    const handleGetMovie = (e)=>{
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/account/20326391/favorite/movies?language=en-US&page=1&sort_by=created_at.asc',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTkwMTA5MmZkYzg0ZWJiNmUwYmMyZmVmNjZkODljOCIsInN1YiI6IjY0ZTE4MTMyZGE5ZWYyMDEwMjMyZGFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RvcKF0YAMLumRPlx3u01NaN_NeG-uBmstl41QXEVwvM'
            }
          };
          
          axios
            .request(options)
            .then(function (response) {
             setData(response.data.results)
            })
            .catch(function (error) {
              console.error(error);
            });
        
        
    }
    const handleRemoveBookmark=(prevent)=>{
        if(prevent.type==='REMOVE'){
            const options = {
                method: 'POST',
                url: 'https://api.themoviedb.org/3/account/20326391/favorite',
                headers: {
                  accept: 'application/json',
                  'content-type': 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTkwMTA5MmZkYzg0ZWJiNmUwYmMyZmVmNjZkODljOCIsInN1YiI6IjY0ZTE4MTMyZGE5ZWYyMDEwMjMyZGFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RvcKF0YAMLumRPlx3u01NaN_NeG-uBmstl41QXEVwvM'
                },
                data: {media_type: 'movie', media_id: prevent.id, favorite: prevent.favorite}
              };
              
              axios
                .request(options)
                .then(function (response) {
                    handleGetMovie()
                })
                .catch(function (error) {
                  console.error(error);
                });
        }
      }
  useEffect(() => {
      if(accessToken){
        handleGetMovie()
      }
  }, []);
  if(data.length===0){
    return(<div className='d-flex col-12 justify-center align-items-center  mt-5 pt-5' style={{height:'60vh'}}>
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row" >
<CircularProgress color="success" />
</Stack>
  </div>)
  }
    return ( <div className="mt-5 pt-5">
        <h1 className='fs-3 fw-bold'> Favorite Movies</h1>
        <div className="d-flex flex-wrap gap-3 justify-content-start col-12 p-3">
      {data.map((item) => {
        return (
            <div className="card  col-lg-3 col-md-5 " key={item.id}>
                <div className={styles['icon-remember']} onClick={()=>handleRemoveBookmark({type:'REMOVE',favorite:false,id:item.id})}>
                <BookmarkRemoveIcon sx={{ fontSize:30,color:'red'}} className='cursor-pointer hover:bg-blue-200 rounded' ></BookmarkRemoveIcon>
                </div>
              <Link href={`/movie/${item.id}`}>
            <div className={styles.slide}>
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                className="card-img"
                alt="..."
              />
              <div className={styles.slideContent}>
                <h6>{item.title}</h6>
                <p>{item.original_title}</p>
              </div>
            </div>
            </Link>
          </div>
         
        );
      })}
    </div>
    </div> );
}

export default FavoriteMovies;