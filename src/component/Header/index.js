import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import PopupAccount from "../Popup_Account";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import BasicModal from "../Popup_Account/Modal";
import { useEffect, useState } from "react";
import React from "react";
import Tippy from "@tippyjs/react/headless";
import { Wrapper } from "./Propper";
import styles from "./Propper/Popper.module.css";
import SearchAccount from "./SearchAccount";
import GenesMovies from "./GenesMovies";

const axios = require("axios");
function Header({ isCheck }) {
  const router = useRouter();
  const [listMovies,setListMovies]=useState([])
  const [search, setSearch] = useState("");
  const [searchMovie, setSearchMovie] = useState([]);
  const [open, setOpen] = useState(false);
  const handleReload = () => {
    setOpen(true);
  };
  const dataYear = [{name:2016},{name:2017},{name:2018},{name:2019},{name:2020},{name:2021},{name:2022},{name:2023}]
  const handleRemoveCookie = () => {
    Cookies.remove("token");
    handleReload();
    
  };
  const handleReloadSearch = ()=>{
      router.push('/search')
  }
  const getAPI = () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTkwMTA5MmZkYzg0ZWJiNmUwYmMyZmVmNjZkODljOCIsInN1YiI6IjY0ZTE4MTMyZGE5ZWYyMDEwMjMyZGFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RvcKF0YAMLumRPlx3u01NaN_NeG-uBmstl41QXEVwvM",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setSearchMovie(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
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
  useEffect(() => {
    getAPI();
    getListMovie()
  }, [search]);
  return (
    <Navbar
      fixed="top"
      expand="lg"
      className="bg-body-tertiary"
      bg="light"
      data-bs-theme="light"
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex fw-bold text-amber-500	">
          <img src="/movie-32px.png" className="pr-2"/> {"  "}
           Phim Mới
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <GenesMovies dataMovies={listMovies} data={'category'}/>
            <Link href="/now-playing" className="p-1 text-[#1976d2] font-medium ">Đang chiếu</Link>
            <Link href="/up-coming" className="p-1 text-[#1976d2] font-medium">Phim Sắp chiếu</Link>
            <Link href="/popular" className="p-1 text-[#1976d2] font-medium">Phim Phổ Biến</Link>
            <GenesMovies dataMovies={dataYear} data={'year'}/>
          </Nav>
          <Nav className="col-lg-5 col-md-12">
            <Form className="d-flex col-12 relative">
              <Tippy
                interactive
                visible={searchMovie.length > 0}
                render={(attrs) => (
                  <div className={styles.box} tabIndex="1" {...attrs}>
                    <Wrapper>
                      <h4
                        className={
                          styles["search-title"] +
                          " font-san text-neutral-400 p-2"
                        }
                      >
                        Movies
                      </h4>
                      {searchMovie
                        .filter((_, index) => index < 5)
                        .map((item, index) => (
                          <Link href={`/movie/${item.id}`}>
                            <SearchAccount items={item} key={index} />
                          </Link>
                        ))}
                    </Wrapper>
                  </div>
                )}
              >
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 w-100"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Tippy>

              <Button variant="outline-success" onClick={handleReloadSearch}>Search</Button>
            </Form>
          </Nav>
          <Nav className="col-lg-1 col-ms-6 m-ms-2">
            {!isCheck && (
              <Button variant="outline-primary" className="ms-2">
                <Link href="/login">Login</Link>
              </Button>
            )}

            {isCheck && <PopupAccount onRemove={handleRemoveCookie} />}
          </Nav>
          <BasicModal />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
