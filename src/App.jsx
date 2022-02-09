import "./App.scss";
import { Nav } from "./containers/nav/Nav";
import { BeersList } from "./containers/beersList/BeersList";
// import beers from "./data/beers";
import usePunk from "./usePunk";

const App = () => {
  const { data, status } = usePunk("https://api.punkapi.com/v2/beers");

  //Queries look like this: https://api.punkapi.com/v2/beers?abv_gt=6 <- questionmark, term, param

  console.log(data);

  return (
    <div className="App">
      <Nav />
      {status === "fetched" ? (
        <BeersList beersArr={data} />
      ) : (
        "Waiting for beers..."
      )}
    </div>
  );
};

export default App;
