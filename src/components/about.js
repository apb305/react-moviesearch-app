import React from "react";

export default function About() {
  return (
    <div className="container text-center text-light mt-2">
      <p>
        This is a small movie search project that I've created using React JS
        and Bootstrap. This website communicates with the{" "}
        <a href="https://www.themoviedb.org/documentation/api" target="noopener noreferrer">
          TMDb API
        </a>
        . See code on my{" "}
        <a
          href="https://github.com/apb305/react-moviesearch-app"
          target="noopener noreferrer"
        >
          GitHub.
        </a>
      </p>
      <p>Written By: Anthony Bernard Jr.</p>
    </div>
  );
}
