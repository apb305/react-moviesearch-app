import React from "react";

function MovieModal(props) {
  // const bgUrl = `https://image.tmdb.org/t/p/w780/${props.backDrop}`
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModalLong"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content rounded-0 bg-secondary text-white">
            <div className="modal-header">
              <p className="modal-title" id="exampleModalLongTitle">
                {!props.movieTitle ? "Loading..." : props.movieTitle}
              </p>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span className="text-light" aria-hidden="true">&times;</span>
              </button>
            </div>
            {/* End of Modal Header Section */}
           

           {/* Begin Modal Body section */}
           {!props.movieTitle ? <p className="text-center my-5">Loading...</p> :

              <div className="modal-body text-center" /* style={{backgroundImage: `url(${bgUrl})`}} */ >
              {/* Movie description section */}
              {props.movieDescription === "" ? <div>
              <p className="small font-weight-light ">
               Synopsis not available.
                </p> 
       </div>

          : 
         <div>
                <p className="">
                  {props.movieDescription}
                </p>
                </div>
          }
          {/* Movie description section END */}
        

        {/* Released date section */}
                {props.releaseDate === "" ? <div><p className="text-center">
                  Released:
                  {""} <small>N/A</small>
          </p></div> : <div><p className="text-center">
                  Released:
                  {""} <small>{props.releaseDate}</small>
          </p></div>} 
            {/* Released date section END */}
          
          
          {/* Rating section */}
          <p className="text-center">Rating:</p>
          {props.rating === 0 ? 
                  <div className="mx-auto text-center">
                    {" "}
                   <p>No rating available.</p>  
                  {" "}
                  </div> 
                  
                  :

                  <div className="progress mb-2 w-25 mx-auto text-center">
                    {" "}
                    <div
                      className={`progress-bar ${props.ratingColor} text-dark font-weight-bold`}
                      role="progressbar"
                      style={{ width: `${props.rating}%` }}
                      aria-valuenow="10"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {props.rating}%
                    </div>{" "}
              </div>}
              {/* Rating section END */}

          {/* Movie trailer section */}
          <div hidden={props.youtubeLink.length === 0 ? true : false}>
         <div className="text-center embed-responsive embed-responsive-16by9 modal-body">
         <iframe width="560" title={`${props.movieTitle} trailer video`} height="315" src={`https://www.youtube.com/embed/${props.youtubeLink}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
         </div>
         <div className="text-center mt-3">
            <p><small>Click the link below if the embedded video isn't available.</small></p>
              <a
                target={"noopener noreferrer"}
                href={`https://www.youtube.com/watch?v=${props.youtubeLink}`}
                className="text-light"
              >
               View Trailer
              </a>
         </div>
         </div>
{/* Movie trailer section End */}

            {/* END Modal */}
           </div>}
          </div>
          </div>
        </div>
      </div>
  );
}

export default MovieModal;
