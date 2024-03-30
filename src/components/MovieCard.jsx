import { useParams } from "react-router-dom";
import "./MovieCard.css";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const MovieCard = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    fetching();
  }, []);

  const fetching = async () => {
    let response = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=52c386b4`
    );
    let data = await response.json();
    setMovie(data);
  };
  return (
    <div className="movie-card">
      <div className="card">
        <div className="movie-pic">
        <img
          src={
            movie?.Poster !== "N/A"
              ? movie?.Poster
              : "https://via.placeholder.com/400"
          }
          alt={movie?.Title}
        />
        <ReactPlayer
          url={"https://www.youtube.com/watch?v=0WWzgGyAH6Y"}
          controls
          playing
          muted
          width="100%"
          height="100%"
        />
        </div>
        <h3>Movie name : {movie?.Title}</h3>
        <p> Year:{movie?.Year}</p>
        <p>{movie?.Runtime}</p>
          <p>{movie?.Plot}</p>
      </div>
    </div>
  );
};

export default MovieCard;
