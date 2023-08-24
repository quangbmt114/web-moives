import Pagination from '@/component/Pagination';
import {useState,useEffect} from 'react'
import { useRouter } from 'next/router';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';
import styles from '../../../component/ContentHome/ContentHome.module.css'
function YearMovies() {
    const [pagination,setPagination]=useState(1)
    const router=useRouter()
    const [data,setData]= useState([])
    const { yearId } = router.query;
    //get api
    const axios = require('axios');
    const handleGetMovie = (e)=>{
        setPagination(e)
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${e}&primary_release_year=${yearId}&sort_by=popularity.desc`,
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

  useEffect(() => {
    handleGetMovie()
  }, [yearId]);
  if(data.length===0){
    return(<div className='d-flex col-12 justify-center align-items-center  mt-5 pt-5' style={{height:'60vh'}}>
      <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row" >
  <CircularProgress color="success" />
  </Stack>
    </div>)
  }else{
    return ( <div className="mt-5">
        <div className="d-flex flex-wrap gap-3 justify-content-around col-12 p-3">
      {data.map((item) => {
        return (
            <div className="card  col-2 " key={item.id}>
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
        <Pagination onReload={handleGetMovie}/>
    </div> );
  }
}

export default YearMovies;