import "./App.scss";
import { Nav } from "./containers/nav/Nav";
import { BeersList } from "./containers/beersList/BeersList";
import Moe from "./assets/fireballs-moe.gif";
// import beers from "./data/beers";
import usePunk from "./usePunk";
import { useState, useEffect } from "react";

const App = () => {
  const [checkBoxState, setCheckBoxState] = useState([true, false, false]);
  const [sliderState, setSLiderState] = useState(0);
  const [page, setPage] = useState(0);
  const { data, status } = usePunk();
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
      index === pos ? (item = !item) : item
    );
    setCheckBoxState(updatedCheckedState);
  };

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <Nav
        handleCheckBox={handleCheckBox}
        checkBoxState={checkBoxState}
        handleSearch={handleSearchInput}
        handleSlider={handleSlider}
        sliderVal={sliderState}
        toggleStyle={showMenu}
      />
      {status === "fetched" ? (
        <BeersList
          beersArr={filteredBeers.slice(page, page + 18)}
          arrLength={filteredBeers.length}
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
