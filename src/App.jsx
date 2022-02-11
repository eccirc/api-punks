import "./App.scss";
import { Nav } from "./containers/nav/Nav";
import { BeersList } from "./containers/beersList/BeersList";
// import beers from "./data/beers";
import usePunk from "./usePunk";
import { useState, useEffect } from "react";

const App = () => {
  const [filter, setFilter] = useState("&");
  const [checkBoxState, setCheckBoxState] = useState([true, false, false]);
  const [sliderState, setSLiderState] = useState(1);
  const { data, status } = usePunk(filter);
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
      index === pos ? (item = true) : (item = false)
    );
    setCheckBoxState(updatedCheckedState);
    console.log(checkBoxState);
  };

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
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
        <BeersList beersArr={filteredBeers} toggle={handleMenuToggle} />
      ) : (
        "Waiting for beers..."
      )}
    </div>
  );
};

export default App;
