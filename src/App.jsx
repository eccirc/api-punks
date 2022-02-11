import "./App.scss";
import { Nav } from "./containers/nav/Nav";
import { BeersList } from "./containers/beersList/BeersList";
import Moe from "./assets/fireballs-moe.gif";
// import beers from "./data/beers";
import usePunk from "./usePunk";
import { useState, useEffect } from "react";

const App = () => {
  const [filter, setFilter] = useState("&");
  const [page, setPage] = useState(1);
  const [checkBoxState, setCheckBoxState] = useState([true, false, false]);
  const [sliderState, setSLiderState] = useState(page);
  const { data, status } = usePunk(filter, page);
  const [filteredBeers, setFilteredBeers] = useState([]);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    if (checkBoxState[0]) {
      setFilteredBeers(filterByAbv());
    } else if (checkBoxState[1]) {
      setFilteredBeers(filterByClassic("2010"));
    } else if (checkBoxState[2]) {
      setFilteredBeers(filterByHighPh());
    } else setFilteredBeers(data);
  }, [status, checkBoxState, sliderState]);

  const handleSearchInput = (event) => {
    let searchTerm = event.target.value.toLowerCase();
    const termFilter = data.filter((beer) => {
      return beer.name.toLowerCase().includes(searchTerm);
    });
    setFilteredBeers(termFilter);
  };

  const handleSearchInput2 = (event) => {
    let searchTerm = event.target.value.toLowerCase();
    if (searchTerm) setFilter(`&beer_name=${searchTerm}`);
  };

  const filterByHighPh = () => {
    return data.filter((beer) => {
      return beer.ph <= 4;
    });
  };
  const filterByAbv = () => {
    return data.filter((beer) => {
      return beer.abv > sliderState;
    });
  };
  const filterByClassic = (yearStr) => {
    return data.filter((beer) => {
      const year = beer.first_brewed.split("/")[1];
      return year < yearStr;
    });
  };
  const handleSlider = (event) => {
    let num = event.target.value;
    setSLiderState(num);
    console.log(num);
  };

  const handleCheckBox = (pos) => {
    const updatedCheckedState = checkBoxState.map((item, index) =>
      index === pos ? (item = true) : (item = false)
    );
    setCheckBoxState(updatedCheckedState);
    console.log(checkBoxState);
  };

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handlePage = (page) => {
    setPage(page);
    console.log(page);
  };

  return (
    <div className="App">
      <Nav
        handleCheckBox={handleCheckBox}
        checkBoxState={checkBoxState}
        handleSearch={handleSearchInput2}
        handleSlider={handleSlider}
        sliderVal={sliderState}
        toggleStyle={showMenu}
      />
      {status === "fetched" ? (
        <BeersList
          beersArr={filteredBeers}
          toggle={handleMenuToggle}
          showPage={handlePage}
        />
      ) : (
        <div>
          <h2>Waiting for beers...</h2>
          <img
            src={Moe}
            alt="Moe from the simposons pouring alcohol then setting it on fire"
          />
        </div>
      )}
    </div>
  );
};

export default App;
