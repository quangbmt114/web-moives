
import { useEffect, useState } from "react";
import styles from "./ContentHome.module.css";
import Link from "next/link";
function Movies() {
  const axios = require("axios");
  const [data, setData] = useState([]);

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTkwMTA5MmZkYzg0ZWJiNmUwYmMyZmVmNjZkODljOCIsInN1YiI6IjY0ZTE4MTMyZGE5ZWYyMDEwMjMyZGFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RvcKF0YAMLumRPlx3u01NaN_NeG-uBmstl41QXEVwvM",
    },
  };
  const getData = () => {
    axios
      .request(options)
      .then(function (response) {
        setData(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="d-flex flex-wrap gap-3 justify-content-around col-12 p-3">
      {data.map((item) => {
        return (
            <div className="card  col-lg-2 col-md-3 col-sm-5 " key={item.id}>
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
  );
}

export default Movies;
