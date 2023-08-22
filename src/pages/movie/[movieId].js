import { useRouter } from "next/router";
import Link from "next/link";
import classes from "./Detail.module.css";
import { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import {
  faPlay,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import SlideMovie from "@/component/Movie/slideMovie";

function DetailPage() {
  const router = useRouter();
  const [movie, setMovie] = useState({});
  const [gender, setGender] = useState([]);
  const [similar,setSimilar]=useState([])
  const { movieId } = router.query;

  const getAPI = async () => {
   
    if(+movieId>0){
      const options =  {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=videos,credits,similar`,
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
        setSimilar(response.data.credits.cast)
      })
      .catch(function (error) {
        console.error(error);
      });
    }
    
  };
  useEffect(() => {
      getAPI();
  }, [movieId]);
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
                          <Link className="episode-movie text-light" href={`/watchmovie/${movieId}`}>
                            <FontAwesomeIcon icon={faAngleDown} /> Trailer
                          </Link>
                        </button>
                        <Button className="btn-success ms-2">
                          <Link className="text-light" href={`/watchmovie/${movieId}`}>
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
        <section>
          <h2 className="p-2">Credits</h2>
          <div className="col-12 p-2 mt-2 d-flex justify-content-around gap-1 card-body">
            {similar
              .filter((_, index) => index < 5)
              .map((item, index) => (
                <SlideMovie item={item} key={index} />
              ))}
          </div>
          <hr />
          <div className="col-12 justify-content-between d-lg-flex">
            <div className="col-4 p-2">
              <span className="fs-5">
                {" "}
                <b>Thể loại: </b>
                {gender.map((item) => item.name + ", ")}
              </span>
              <br />
              <span className="fs-5">
                {" "}
                <b>Năm sản xuất: </b>
                {movie.release_date}
              </span>
              <br />
            </div>
            <div className="col-4 p-2">
              <span className="fs-5">
                {" "}
                <b>Quốc gia: </b>
                {movie.production_countries[0].name}
              </span>
              <br />
              <span className="fs-5">
                {" "}
                <b>Thời lương phim: </b>
                {movie.runtime} phút
              </span>
              <br />
            </div>
            <div className="col-4 p-2">
              <span className="fs-5">
                {" "}
                <b>Điểm đánh giá: </b>
                <Stack spacing={1}>
                      <Rating name="half-rating-read" defaultValue={+movie.vote_average/2} precision={0.5} readOnly />
                 </Stack>
              </span>
              <br />
            </div>
          </div>
          <div className="check-calendar card  col-12 mt-4">
            <div className="showtime_movies d-flex justify-content-center align-items-center bg-success bg-gradient">
              <p className="p-3 m-0 fw-bold d-flex">
                <img src="/calendar.png" className="me-2" /> PHIM CHIẾU 1 TẬP MỖI TRƯA THỨ 5 HÀNG
                TUẦN
              </p>
            </div>
            <div className="des-content-movie bg-slate-300 bg-secondary ">
              <div className="section-title">
                <span className="text-xl m-3 fs-4 fw-bold text-light">Nội dung phim</span>
                <hr className="m-3"/>
              </div>
              <p className=" m-3 text-light">{movie.overview}</p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default DetailPage;
