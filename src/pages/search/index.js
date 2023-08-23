import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Link from "next/link";
import styles from "../../component/ContentHome/ContentHome.module.css"
import SelectCategory from "@/component/ComponentSearch/Category";
import SelectYear from "@/component/ComponentSearch/Year";

function HomeSearch() {
  const [listMovies, setListMovies] = React.useState([]);
  const [listSearch, setListSearch] = React.useState([]);
  const [category, setCategory] = React.useState("");
  const [year, setYear] = React.useState("");
  const getListMovie = () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/genre/movie/list?language=en`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTkwMTA5MmZkYzg0ZWJiNmUwYmMyZmVmNjZkODljOCIsInN1YiI6IjY0ZTE4MTMyZGE5ZWYyMDEwMjMyZGFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RvcKF0YAMLumRPlx3u01NaN_NeG-uBmstl41QXEVwvM",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        
        setListMovies(response.data.genres);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const getListSearch = () => {
    if(category===""&&year===""){
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/trending/movie/week?language=en-US',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTkwMTA5MmZkYzg0ZWJiNmUwYmMyZmVmNjZkODljOCIsInN1YiI6IjY0ZTE4MTMyZGE5ZWYyMDEwMjMyZGFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RvcKF0YAMLumRPlx3u01NaN_NeG-uBmstl41QXEVwvM'
            }
          };
          axios
            .request(options)
            .then(function (response) {
              console.log(response.data.results);
              setListSearch(response.data.results);
            })
            .catch(function (error) {
              console.error(error);
            })
    }else{
        const options = {
            method: "GET",
            url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&primary_release_year=${year}&sort_by=popularity.desc&with_genres=${category}&query=wonder`,
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTkwMTA5MmZkYzg0ZWJiNmUwYmMyZmVmNjZkODljOCIsInN1YiI6IjY0ZTE4MTMyZGE5ZWYyMDEwMjMyZGFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RvcKF0YAMLumRPlx3u01NaN_NeG-uBmstl41QXEVwvM",
            },
          };
      
          axios
            .request(options)
            .then(function (response) {
              console.log(response.data.results);
              setListSearch(response.data.results);
            })
            .catch(function (error) {
              console.error(error);
            });
    }
    
  };
  React.useEffect(() => {
    getListMovie();
    getListSearch();
  }, []);
  const handleGetData = (e) => {
    setCategory(e);

  };
  const handleGetYear = (e) => {
    setYear(e);
    console.log("year", e);
  };

  return (
    <div className="mt-5 pt-5 col-auto">
      <Stack spacing={2} direction="row">
        <SelectCategory dataCategory={listMovies} onReload={handleGetData} />
        <SelectYear onReload={handleGetYear} />
        <TextField id="outlined-basic" label="name movie" variant="outlined" />
        <Button variant="outlined" onClick={getListSearch}>
          SEARCH
        </Button>
      </Stack>
      <div>
        <div className="mt-5">
          <div className="d-flex flex-wrap gap-3 justify-content-around col-12 p-3">
            {listSearch.map((item) => {
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
        </div>
      </div>
    </div>
  );
}

export default HomeSearch;
