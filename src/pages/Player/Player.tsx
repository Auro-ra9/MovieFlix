import "./Player.css";
import YouTube, { YouTubeProps } from "react-youtube";
import back_arrow from "../../assets/back_arrow_icon.png"
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_KEY, baseURL } from "../../constants/Constants";

type apiDataTye = {
  name: string;
  type: string;
  key: string;
  published_at: string;
};

const Player = () => {
  const { id } = useParams();
  const navigate= useNavigate()

  const [apiData, setApiData] = useState<apiDataTye[]>([
    {
      name: "",
      type: "",
      key: "",
      published_at: "",
    },
  ]);

  //fetching movie videos using axios
  useEffect(() => {
    async function getData() {
      let response = await axios.get(`${baseURL}/movie/${id}/videos?api_key=${API_KEY}&&language=en-US`);

      // if(response.data.results==='' || response.data.results.length<=0){
      //   toast.error("Cannot find the trailer");
      //   navigate('/');
      // }

      let necessaryDetails = response.data.results.map((e: any) => {
        return {
          name: e.name,
          key: e.key,
          published_at: e.published_at,
          type: e.type,
        };
      });

      setApiData(necessaryDetails);
    }
    getData();
  },[]);
  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div className="player">
      <img src={back_arrow} alt="Back" onClick={()=>{navigate(-2)}} />
      {apiData && apiData.length > 0 && (
        <YouTube videoId={apiData[0].key} opts={opts} />
      )}
      <div className="player-info">
        <p>{apiData[0]?.published_at.slice(0,10)}</p>
        <p>{apiData[0]?.name}</p>
        <p>{apiData[0]?.type}</p>
      </div>
    </div>
  );
};

export default Player;
