// eslint-disable-next-line react/prop-types
const PlusMovie = ({movie:{name, year, img}}) => {
    return (
        <div className="movie" >
        <div>
          <p>{year}</p>
        </div>
  
        <div>
          <img src={img} alt={name} />
        </div>
  
        <div>
          <h3>{name}</h3>
        </div>
      </div>
    );
};

export default PlusMovie;



