import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {  Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faServer,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch,useSelector } from "react-redux";
import { uiAction } from "@/store/store_login";
import Cookies from 'js-cookie';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import axios from "axios";
import SlideMovie from "@/component/Movie/slideMovie";
import HoverRating from "@/component/rating";

function DetailPage() {
  const accessToken = Cookies.get('token');
  const dispatch = useDispatch();
  const isCheck = useSelector(state=>state.ui.isCheckLogin)
  const router = useRouter();
  const [movie, setMovie] = useState({});
  const [gender, setGender] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [video, setVideo] = useState([]);
  const [active_key, setActive_key] = useState(0);
  const id = router.query.watchmovieId;

  const getAPI = async () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=videos,credits,similar`,
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
        setSimilar(response.data.credits.cast);
        setVideo(response.data.videos);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const PostRating = (e)=>{
    const options = {
      method: 'POST',
      url: `https://api.themoviedb.org/3/movie/${id}/rating`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTkwMTA5MmZkYzg0ZWJiNmUwYmMyZmVmNjZkODljOCIsInN1YiI6IjY0ZTE4MTMyZGE5ZWYyMDEwMjMyZGFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RvcKF0YAMLumRPlx3u01NaN_NeG-uBmstl41QXEVwvM'
      },
      data: `{"value":${e}}`
    };
    
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  useEffect(() => {
    if(accessToken){
      dispatch(uiAction.toggleLogin())
  }
    setTimeout(() => {
      getAPI();
    }, 2000);
  }, [id]);
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
        <section className="col-12" style={{ height: "500px" }}>
          <iframe
            className="w-100 h-100"
            src={`https://www.youtube.com/embed/${video.results[active_key].length===0?'':video.results[active_key].key}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </section>
        <section className="mt-3">
          <span className="col-12 bg-secondary p-2 rounded-2">
            <span className="hl-server "></span>
            <FontAwesomeIcon icon={faServer} /> Server #1
          </span>
          <ul className="pagination pagination-lg flex-wrap justify-content-start mt-3 ps-3">
            {video.results.reverse().map((result, index) => (
              <li key={index}
                className="page-item col-1 btn-primary btn m-1"
                onClick={() => {
                  setActive_key(index);
                }}
              >
                <a>
                  <span className="">{index + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="p-2">Credits</h2>
          <div className="col-12 p-2 mt-2 d-flex justify-content-around gap-1 card-body">
            {similar
              .filter((_, index) => index < 5)
              .map((item, index) => (
                <SlideMovie item={item} key={index} />
              ))}
          </div>
          <hr/>
            {isCheck&&<HoverRating onGetRating={PostRating}/>}

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
                <img src="/calendar.png" className="pr-2"/>  PHIM CHIẾU 1 TẬP MỖI TRƯA THỨ 5 HÀNG
                TUẦN
              </p>
            </div>
            <div className="des-content-movie bg-slate-300 bg-secondary ">
              <div className="section-title">
                <span className="text-xl m-3 fs-4 fw-bold text-light">
                  Nội dung phim
                </span>
                <hr className="m-3" />
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
