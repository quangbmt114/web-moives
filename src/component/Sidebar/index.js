import { useState, useEffect } from "react";
function Sidebar() {
  const [movieTrending, setMovieTrending] = useState([]);
  const axios = require("axios");

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTkwMTA5MmZkYzg0ZWJiNmUwYmMyZmVmNjZkODljOCIsInN1YiI6IjY0ZTE4MTMyZGE5ZWYyMDEwMjMyZGFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RvcKF0YAMLumRPlx3u01NaN_NeG-uBmstl41QXEVwvM",
    },
  };
  const getAPI = async () => {
    const data = await axios
      .request(options)
      .then(function (response) {
        setMovieTrending(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  useEffect(() => {
    getAPI();
  }, []);
  if (movieTrending.length === 0) {
    return (
      <div
        className="spinner-grow text-primary d-flex justify-content-center align-content-center col-3"
        role="status"
      >
        <span className="visually-hidden ">Loading...</span>
      </div>
    );
  }
  if (movieTrending) {
    return (
      <div className="col-3 mt-5 pt-3">
        <h2>Top Trending</h2>
        {movieTrending
          .filter((_, index) => index < 6)
          .map((item) => (
            <div className="card mb-3" key={item.id}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                    className="img-fluid rounded-start h-100 w-100"
                    alt="hình"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.original_title}</h5>
                    <p className="card-text"></p>
                    <p className="card-text">
                      <small className="text-muted">
                        lượt xem: {item.popularity}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default Sidebar;
