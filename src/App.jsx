import "./App.scss";
import { Nav } from "./containers/nav/Nav";
import { BeersList } from "./containers/beersList/BeersList";
import Moe from "./assets/fireballs-moe.gif";
import usePunk from "./usePunk";
import { useState, useEffect } from "react";

const App = () => {
  const [checkBoxState, setCheckBoxState] = useState([true, false, false]);
  const [sliderState, setSLiderState] = useState(0);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const { data, status } = usePunk();
  const [filteredBeers, setFilteredBeers] = useState([]);
  const [showMenu, setShowMenu] = useState(true);

  const checkFilters = () => {
    if (checkBoxState[0]) {
      setFilteredBeers(filterByAbv(data));
    } else if (checkBoxState[1]) {
      setFilteredBeers(filterByClassic(data, "2010"));
    } else if (checkBoxState[2]) {
      setFilteredBeers(filterByHighPh(data));
    } else setFilteredBeers(data);
  };

  useEffect(() => {
    checkFilters(data);
  }, [status, checkBoxState, sliderState]);

  const handleSearchInput = (event) => {
    let searchTerm = event.target.value.toLowerCase();
    const termFilter = data.filter((beer) => {
      return beer.name.toLowerCase().includes(searchTerm);
    });
    setFilteredBeers(termFilter);
  };

  const filterByHighPh = (arr) => {
    return arr.filter((beer) => {
      return beer.ph <= 4;
    });
  };
  const filterByAbv = (arr) => {
    return arr.filter((beer) => {
      return beer.abv > sliderState;
    });
  };
  const filterByClassic = (arr, yearStr) => {
    return arr.filter((beer) => {
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
  };

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSelect = (event) => {
    const val = parseInt(event.target.value);
    setPerPage(val);
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
          beersArr={filteredBeers.slice(page, page + perPage)}
          arrLength={filteredBeers.length}
          toggle={handleMenuToggle}
          showPage={handlePage}
          pageNum={page}
          perPage={perPage}
          handleSelect={handleSelect}
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
