import { Component } from "react";
import MovieCard from "./MovieCard";
// import animeList from "./dummy-data";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      isLoading: true
    };
  }

  componentDidMount() {
    setTimeout(() => this.fetchMovieList(), 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.movieList.length !== this.state.movieList.length) {
      this.setState({
        isLoading: false
      });
    }
  }

  async fetchMovieList() {
    const response = await fetch("https://api.jikan.moe/v3/top/anime");
    const result = await response.json();
    this.setState({
      movieList: result.top || []
    });
  }

  render() {
    return (
      <div className="container my-5">
        {/* <h1 className="text-center">{this.state.isLoading ? "sedang loading" : "Sudah tidak loading"}</h1> */}
        <h1 className="text-center">Anime List</h1>
        <div className="container my-5">
          <div id="daftar-anime" className="row">
            {this.state.isLoading ? (
              <h1>Loading...</h1>
            ) : (
              this.state.movieList.map((movie) => (
                <MovieCard key={movie.mal_id} movie={movie} />
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
