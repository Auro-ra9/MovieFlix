import './Home.css';
import Navbar from '../../components/Navabar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import { NOW_PLAYING_URL, POPULAR_URL, TOP_RATED_URL, UPCOMING_URL } from '../../constants/Constants';
// import { ACTION_URL, COMEDY_MOVIES_URL, DOCUMENTARIES_URL, HORROR_URL, ORIGINALS_URL, ROMANCE_MOVIE_URL, TRENDING_URL } from '../../constants/Constants';

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="here banner" className='banner-img' />
        <div className="hero-caption">
          <img src={hero_title} alt="here title" className='caption-img' />
          <p> Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.</p>
          <div className="hero-btns">
            <button className='btn'><img src={play_icon} alt="" />Play</button>
            <button className='btn dark-btn'><img src={info_icon} alt="" />More Info</button>
          </div>
          {/* <TitleCards title={'Trending Now'} URL={TRENDING_URL} /> */}
          <TitleCards title={'Now Playing'} URL={NOW_PLAYING_URL} />
        </div>
      </div>
      <div className="more-cards">
        {/* <TitleCards title={'Action'} URL={ACTION_URL} />
        <TitleCards title={'Netflix Originals'} URL={ORIGINALS_URL} />
        <TitleCards title={'Comedy'} URL={COMEDY_MOVIES_URL} />
        <TitleCards title={'Horror'} URL={HORROR_URL} />
        <TitleCards title={'Romantic'} URL={ROMANCE_MOVIE_URL} />
        <TitleCards title={'Documentaries'} URL={DOCUMENTARIES_URL} /> */}
        <TitleCards title={'Upcoming'} URL={UPCOMING_URL} />
        <TitleCards title={'Popular'} URL={POPULAR_URL} />
        <TitleCards title={'Top rated'} URL={TOP_RATED_URL} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
