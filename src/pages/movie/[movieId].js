import { useRouter } from "next/router";
import Link from "next/link";
import classes from "./Detail.module.css";
import { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faServer,
  faPlay,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function DetailPage() {
  const router = useRouter();
  const [movie, setMovie] = useState({});
  const [gender, setGender] = useState([]);

  const getAPI = async () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${router.query.movieId}?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTkwMTA5MmZkYzg0ZWJiNmUwYmMyZmVmNjZkODljOCIsInN1YiI6IjY0ZTE4MTMyZGE5ZWYyMDEwMjMyZGFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RvcKF0YAMLumRPlx3u01NaN_NeG-uBmstl41QXEVwvM",
      },
    };
    await axios
      .request(options)
      .then(function (response) {
        setMovie(response.data);
        setGender(response.data.genres);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  useEffect(() => {

    setTimeout(() => {
      getAPI();
    }, 2000);
 
  }, []);
  if (gender.length === 0) {
    return (
      <div className="d-flex m-5 p-5">
        <Spinner animation="border" role="status"></Spinner>
        <span className="visually-primary">Loading...</span>
      </div>
    );
  } else {
    return (
      <div className="mt-5 p-3 container-fluid">
        {console.log(movie)}
        <div
          className={classes.bg}
          style={{
            backgroundImage: `URL(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          }}
        >
          <div className={"mb-3 " + classes["inner-bg"]}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  className="img-fluid rounded-start w-75"
                  alt="..."
                />
              </div>
              <div className={"col-md-8 "}>
                <div className="card-body">
                  <h3 className="card-title">{movie.title}</h3>
                  <br />
                  <h5 className="card-title">
                    Genres:
                    {gender.map((item, index) => (
                      <span key={index}> {item.name} |</span>
                    ))}
                    <span>run time: {movie.runtime}'</span>
                  </h5>

                  <h5 className="card-title"> run time: {movie.runtime}'</h5>
                  <div className="header_info">
                    <h3 className="my-2 text-white" dir="auto">
                      Overview
                    </h3>
                    <div className="overview text-white text-sm" dir="auto">
                      <p>{movie.overview}</p>
                    </div>
                  </div>
                  <div className="card-text">
                    <small className="text-muted">
                      {" "}
                      <div className="button-watch">
                        <button className="btn btn-success">
                          <Link className="episode-movie text-light" href={"/"}>
                            <FontAwesomeIcon icon={faAngleDown} /> Tập phim
                          </Link>
                        </button>
                        <Button className="btn-success ms-2">
                          <Link className="watch-movie text-light" href={"/"}>
                            <FontAwesomeIcon icon={faPlay} /> Xem phim
                          </Link>
                        </Button>
                      </div>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailPage;
