import React from "react";

function SearchBox(props) {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <form
            onSubmit={event => {
              props.handleSubmit(event);
            }}
          >
            <div className="input-group">
              <input
                className="form-control rounded-1"
                placeholder="Search movie by name"
                name="query"
                value={props.query}
                onChange={props.searchMovie}
                required
              />
              <div className="input-group-prepend">
                <button type="submit" className="btn btn-light rounded-right">
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
          </form>
          <ul className="list-group sticky">{props.searchSuggestions}</ul>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
