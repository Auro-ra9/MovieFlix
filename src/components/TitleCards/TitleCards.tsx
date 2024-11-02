import { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import axios from 'axios';
import { IMAGE_URL } from '../../constants/Constants';
import { Link } from 'react-router-dom';


interface TitleCardProps{
  title:string;
  URL:string
}

type MovieType={
  image:string;
  name:string;
  id:number
}

const TitleCards = ({title,URL}:TitleCardProps) => {
  const [movies,setMovies]=useState<MovieType[]>([{image:'',name:'',id:0}])
  const cardsRef = useRef<HTMLDivElement | null>(null);
  
  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel as unknown as EventListener);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel as unknown as EventListener);
      }
    };
  }, []);


  // get the movies details
  useEffect(()=>{
    async function getMovieDetails(){
      let response=await axios.get(URL);
      console.log(title);
      console.log(response);
      let filterMovies=response.data.results.map((ele:any)=>{
        return {
          image:IMAGE_URL+ele.backdrop_path,
          name:ele.original_title || ele.title || ele.original_name,
          id:ele.id
        }
      })

      setMovies(filterMovies);
    }
    getMovieDetails();
  },[])

  return (
    <div className='title-cards'>
      <h2>{title?title: "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {movies.map((card,index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={card.image} alt='card-image' />
            <p>{card.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;


