import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/TVShowAPI";
import { Logo } from "./components/Logo/Logo";
import { TVShowDetail } from "./components/tv-show-detail/TVShowDetail";
import { BACKDROP_BASE_URL } from "./config";
import s from "./style.module.css";
import logo from "./assets/images/logo.png"

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();

  async function fetchPopulars() {
    const populars = await TVShowAPI.fetchPopulars();
    if (populars.length > 0) {
      setCurrentTVShow(populars[1]);
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "red",
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
            <input style={{ width: "100%" }} type="text" />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommendations}>Recommendations</div>
    </div>
  );
}

export default App;
