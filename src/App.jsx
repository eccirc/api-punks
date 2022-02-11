import "./App.scss";
import { Nav } from "./containers/nav/Nav";
import { BeersList } from "./containers/beersList/BeersList";
// import beers from "./data/beers";
import usePunk from "./usePunk";
import { useState, useEffect } from "react";

const App = () => {
  const [filter, setFilter] = useState("&");
  const [checkBoxState, setCheckBoxState] = useState(new Array(3).fill(false));
  const { data, status } = usePunk(filter);
  const [filteredBeers, setFilteredBeers] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (checkBoxState[0]) {
      setFilteredBeers(filterByAbv(6));
    } else if (checkBoxState[1]) {
      setFilteredBeers(filterByClassic("2010"));
    } else if (checkBoxState[2]) {
      setFilteredBeers(filterByHighPh());
    } else setFilteredBeers(data);
  }, [status, checkBoxState]);

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
  const filterByAbv = (num) => {
    return data.filter((beer) => {
      return beer.abv > num;
    });
  };
  const filterByClassic = (yearStr) => {
    return data.filter((beer) => {
      const year = beer.first_brewed.split("/")[1];
      return year < yearStr;
    });
  };

  const handleCheckBox = (pos) => {
    const updatedCheckedState = checkBoxState.map((item, index) =>
      index === pos ? !item : item
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
