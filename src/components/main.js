import React, { Component } from "react";
import axios from "axios";
import MovieModal from "./modal";
import Navbar from "./navbar";
import SearchBox from "./searchBox";
import About from "./about"
import Movie from "./movie";
import Pagination from "./pagination";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      movieTitle: "",
      movieDescription: "",
      query: "",
      errorMsg: "",
      searchSuggestions: [],
      movieResults: [],
      hideMovie: false,
      youtubeLink: false,
      currentPage: 1,
      pageResults: 0,
      currentUrl: ""
    };
    this.handleClickMovie.bind = this.handleClickMovie.bind(this);
    this.handleGetMovie = this.handleGetMovie.bind(this);
    this.handleSearchMovie = this.handleSearchMovie.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuggestionsClick = this.handleSuggestionsClick.bind(this);
    this.paginate = this.paginate.bind(this);
    this.handleInput = this.handleInput.bind(this)
  }

async handleInput (event){
  const { name, value } = event.target;
  await this.setState({ [name]: value });
  this.handleSearchMovie(value)
}

  componentDidMount() {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_SECRET}&language=en-US&page=${this.state.currentPage}`;
    axios
      .get(url)
      .then(res => {
        const movies = res.data;
        this.setState({
          currentUrl: url,
          movies: movies.results,
          pageResults: movies.total_pages,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });  
  }

  //Movies drop-down in navbar
  handleGetMovie(event) {
    this.setState({ isLoading: true });
    let url;
    if (event.target.value === "trending") {
      url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_SECRET}&language=en-US`;
      this.setState({ currentUrl: url, currentPage: 1 });
    } else {
      url = `https://api.themoviedb.org/3/movie/${event.target.value}?api_key=${process.env.REACT_APP_SECRET}&language=en-US`;
      this.setState({ currentUrl: url, currentPage: 1 });
    }
    axios.get(`${url}`).then(res => {
      const movies = res.data;
      this.setState({
        movies: movies.results,
        pageResults: movies.total_pages,
        isLoading: false
      });
    });
  }

  //Handle user input and search suggestions
  handleSearchMovie(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_SECRET}&language=en-US&query=${query}`;
    this.setState({ currentUrl: url });
    if (!query) {
      return null;
    } else if (query) {
      axios
        .get(url)
        .then(res => {
          const moviesTitles = res.data.results.map(item => {
            return item.title;
          });
          const movies = res.data;
          //Show or clear suggestion results
          if (query.length === 1) {
            this.setState(() => ({
              movieResults: movies,
              searchSuggestions: []
            }));
          } else if (query) {
            this.setState(() => ({
              movieResults: movies,
              searchSuggestions: moviesTitles
            }));
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  //Handles sumbitting user input
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_SECRET}&language=en-US&query=${this.state.query}`;
    this.setState({ currentUrl: url, currentPage: 1 });
    axios.get(url).then(res => {
      const movies = res.data;
      this.setState(() => ({
        movies: movies.results,
        pageResults: movies.total_pages,
        searchSuggestions: [],
        isLoading: false
      }));
    });
  }

  //Get details about movie after clicking image
  handleClickMovie(movie) {
    this.setState(() => ({
      backDrop: "",
      releaseDate: "",
      ratingColor: "",
      movieRating: "",
      movieTitle: "",
      movieDescription: "",
      youtubeLink: ""
    }));
    const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.REACT_APP_SECRET}&append_to_response=videos`;
    axios.get(url).then(res => {
      const clickedMovie = res.data;
      let rating = (clickedMovie.vote_average / 10) * 100;
      let ratingFixed = Math.trunc(rating);
      //let noRating;
      let ratingColor;
      if (ratingFixed >= 70) {
        ratingColor = "bg-success";
      } else if (ratingFixed >= 50) {
        ratingColor = "bg-warning";
      } else if (ratingFixed <= 49) {
        ratingColor = "bg-danger";
      }
      this.setState(() => ({
        // backDrop: clickedMovie.backdrop_path,
        releaseDate: clickedMovie.release_date,
        ratingColor: ratingColor,
        movieRating: ratingFixed,
        movieTitle: clickedMovie.title,
        movieDescription: clickedMovie.overview,
        youtubeLink: clickedMovie.videos.results.map(data => data.key)
      }));
    });
  }

  //Handles clicking on search suggestions
  handleSuggestionsClick(movieTitle) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_SECRET}&language=en-US&query=${movieTitle}`;
    this.setState({ isLoading: true, currentUrl: url, currentPage: 1 });
    axios.get(url).then(res => {
      const movies = res.data;
      this.setState(() => ({
        value: movieTitle, 
        movies: movies.results,
        pageResults: movies.total_pages,
        searchSuggestions: [],
        isLoading: false
      }));
    });
  }

  async paginate(page) {
    this.setState({ isLoading: true });
    await this.setState({
      currentPage: page
    });
    axios
      .get(
        `${this.state.currentUrl} + &page=${this.state.currentPage}&include_adult=false`
      )
      .then(res => {
        const movies = res.data;
        this.setState({
          movies: movies.results,
          pageResults: movies.total_pages,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const movies = this.state.movies.map((movie, id) => (
      <Movie
        key={id}
        clickMovie={() => {
          this.handleClickMovie(movie);
        }}
        movie={movie}
        movieImage={movie.poster_path}
        movieTitle={movie.original_title}
        hideMovie={this.state.hideMovie}
      />
    ));
    return (
      <div>
        <Navbar handleGetMovie={this.handleGetMovie} />
        <div className="container">
        <About />
          <SearchBox
            searchMovie={this.handleInput}
            handleSubmit={this.handleSubmit}
            query={this.state.query}
            searchSuggestions={this.state.searchSuggestions.map((item, id) => {
              return (
                <li
                  key={id}
                  onClick={() => {
                    this.handleSuggestionsClick(item);
                  }}
                  className="list-group-item list-group-item-action rounded-0"
                >
                  {item}
                </li>
              );
            })}
          />
          <p>{this.state.errorMsg}</p>
          {this.state.isLoading === true ? (
            <div className="container mt-5 text-center text-light">
              <p>Please Wait...</p>
            </div>
          ) : (
              <div className="container mt-2 text-center">{movies}</div>
          )}
          <div className="row">
            <div className="col">
              {this.state.pageResults >= 1 ? (
                <Pagination
                  paginate={this.paginate}
                  pageNumbers={this.state.pageResults}
                  currentPage={this.state.currentPage}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <MovieModal
            movieTitle={this.state.movieTitle}
            movieDescription={this.state.movieDescription}
            youtubeLink={this.state.youtubeLink}
            rating={this.state.movieRating}
            ratingColor={this.state.ratingColor}
            releaseDate={this.state.releaseDate}
            // backDrop={this.state.backDrop}
          />
        </div>
      </div>
    );
  }
}

export default App;
