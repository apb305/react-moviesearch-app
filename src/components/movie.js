import React from "react";
import noImage from "../components/images/noImage.png";

function Movie(props) {
  return (
    <div
      hidden={props.hideMovie}
      className="d-inline-block mt-1"
      key={props.id}
    >
      <div
        className="btn"
        data-toggle="modal"
        data-target="#exampleModalLong"
        onClick={props.clickMovie}
      >
        <img
        className="rounded 1"
          style={
            props.movieImage === null
              ? {
                  border: "1px solid black",
                  color: "E5E5E5"
                }
              : {
                  border: "none"
                }
          }
          src={
            props.movieImage === null
              ? noImage
              : `https://image.tmdb.org/t/p/w780${props.movieImage}`
          }
          alt={props.movieImage === null ? "No Image Available" : "Movie"}
        />
        <p className="smallMovieTitle text-light text-center mt-1">
          {props.movieTitle}
        </p>
      </div>
    </div>
  );
}

export default Movie;
