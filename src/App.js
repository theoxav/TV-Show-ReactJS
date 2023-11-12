import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/TVShowAPI";
import { Logo } from "./components/Logo/Logo";
import { TVShowDetail } from "./components/tv-show/detail/TVShowDetail";
import { BACKDROP_BASE_URL } from "./config";
import s from "./style.module.css";
import logo from "./assets/images/logo.png";
import { TVShowList } from "./components/tv-show/list/tv-show-list/TVShowList";
import { SearchBar } from "./components/search-bar/SearchBar";

export function App() {
  /*** CurrentTVShow ***/
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationsList, setRecommendationsList] = useState([]);

  async function fetchPopulars() {
    const populars = await TVShowAPI.fetchPopulars();
    if (populars.length > 0) {
      setCurrentTVShow(populars[0]);
    }
  }

  async function searchTVShow(tvShowName) {
    const searchResponse = await TVShowAPI.fetchByTitle(tvShowName)
    if(searchResponse.length > 0) {
      setCurrentTVShow(searchResponse[0])
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  /*** Recommendations ***/
  async function fetchRecommendations(TVShowId) {
    const recommendations = await TVShowAPI.fetchRecommendations(TVShowId);
    if (recommendations.length > 0) {
      setRecommendationsList(recommendations.slice(0, 10));
    }
  }

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              image={logo}
              title="Watowatch"
              subtitle="Find a show you may like"
            />
          </div>
          <div className="col-sm-12 col-md-4">
            <SearchBar onSubmit={searchTVShow} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommendations}>
        {recommendationsList && recommendationsList.length > 0 && (
          <TVShowList onClickItem={(tvShow) => setCurrentTVShow(tvShow)} TVShowList={recommendationsList} />
        )}
      </div>
    </div>
  );
}

export default App;
