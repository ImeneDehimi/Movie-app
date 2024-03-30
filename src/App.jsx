// import { useState } from "react"

import { useEffect, useState } from "react";
import Movie from "./Movie";
import "boxicons";

// function App() {
//   const [synonyme, setSynonyme]= useState([])
//   const[valeur, setValeur] = useState("")
//  const handleSubmit = () =>{
//   event.preventDefault();
//   fetch(`https://api.datamuse.com/words?rel_jjb=${valeur}`)
//   .then((res) => res.json())
//   .then(setSynonyme)
//  }
//   const search = (event) =>{
//     setValeur(event.target.value)
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit} >
//         <input type="text" placeholder="search" onChange={search}/>
//         <button type="submit" >submit</button>
//       </form>
//       <ul>
//       {synonyme.map((word,index)=>(
//         <li key={index}>{word.word}</li>
//       ))}
//       </ul>
//     </>
//   )
// }

// export default App
import Modal from "react-modal";
import PlusMovie from "./PlusMovie";
import { Link } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: '#010441',
    borderRadius: '20px',
  },
};

const App = () => {
  const URL = " http://www.omdbapi.com/?i=tt3896198&apikey=52c386b4";

  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetching("Batman");
  }, []);

  const fetching = async (search) => {
    let response = await fetch(`${URL}&s=${search}`);
    let data = await response.json();
    setMovies(data.Search);
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [img, setImg] = useState("");
  const [newMovie, setNewMovie] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name && year){
    setNewMovie([...newMovie, { name, year, img }]);
  }
    closeModal();
  };

  return (
    <div className="app">
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="modal">
        <h2>Add a new movie</h2>
        <div className="add-movie">
          <form onSubmit={handleSubmit} className="modal-form">
            <input
              type="text"
              placeholder="Enter movie name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Year"
              onChange={(e) => setYear(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter image url"
              onChange={(e) => setImg(e.target.value)}
            />
            <button>Submit</button>
          </form>
        </div>
        </div>
      </Modal>
      
      <nav>
        <h1>Movie</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetching(search);
          }}
        >
          <input
            type="text"
            placeholder="Enter movie name"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <box-icon
          onClick={openModal}
          id="icon"
          name="message-square-add"
          type="solid"
          color="#ffffff"
        ></box-icon>
      </nav>
      {movies?.length > 0 ? (
        <div className="movies">
          <div className="container">
          {newMovie.map((movie, index) => (
              <PlusMovie key={index} movie={movie} />
            ))}
            {movies.map((movie) => (
              <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
              <Movie movie={movie} />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
