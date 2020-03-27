import React from "react";

export default function Pagination(props) {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col">
          <nav aria-label="Page navigation example">
            <ul className="pagination pagination-sm justify-content-center">
              <li
                onClick={() => props.paginate(props.currentPage - 1)}
                className="page-item"
              >
                <span
                  onClick={() => props.paginate(props.currentPage - 1)}
                  hidden={props.currentPage === 1}
                  className="page-link mr-2 page-item bg-secondary text-light rounded 1"
                >
                  Previous
                </span>
              </li>{" "}
              <p className="mt-1 text-light">
                {" "}
                Page {props.currentPage} of {props.pageNumbers}{" "}
              </p>
              <li>
                <span
                  onClick={() => props.paginate(props.currentPage + 1)}
                  hidden={props.currentPage === props.pageNumbers}
                  className="page-link ml-2 page-item bg-secondary text-light rounded 1"
                >
                  Next
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
