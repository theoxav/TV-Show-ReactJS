import axios from "axios";
import { BASE_URL } from "../config";

export class TVShowAPI {
  static async fetchPopulars() {
    try {
      const response = await axios.get(
        `${BASE_URL}/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );

      return response.data.results;
    } catch (error) {
      throw new Error("Error when fetch populars:", error);
    }
  }

  static async fetchRecommendations(tvShowId) {
    try {
      const response = await axios.get(
        `${BASE_URL}/tv/${tvShowId}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );

      return response.data.results;
    } catch (error) {
      throw new Error("Error when fetch recommendations:", error);
    }
  }

  static async fetchByTitle(title) {
    try {
      const response = await axios.get(
        `${BASE_URL}/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${title}`
      );

      return response.data.results;
    } catch (error) {
      throw new Error("Error search:", error);
    }
  }
}
