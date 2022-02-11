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

  useEffect(() => {
    if (checkBoxState[0]) setFilteredBeers(filterByAbv(6));
    else if (checkBoxState[1]) setFilteredBeers(filterByClassic());
    else if (checkBoxState[2]) setFilteredBeers(filterByHighPh());
    else setFilteredBeers(data);
  }, [status, checkBoxState]);

  const handleSearchInput = (event) => {
    let searchTerm = event.target.value.toLowerCase();
    const termFilter = data.filter((beer) => {
      return beer.name.toLowerCase().includes(searchTerm);
    });
    setFilteredBeers(termFilter);
  };

  // const handleCheck1 = () => {
  //   setCheck1(!check1);
  //   !check1 ? setFilter("&abv_gt=6") : setFilter("&");
  //   setFilteredBeers(data);
  // };
  // const handleCheck2 = () => {
  //   setCheck2(!check2);
  //   !check2 ? setFilter("&brewed_before=10-2011") : setFilter("&");
  //   setFilteredBeers(data);
  // };
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
  const filterByClassic = () => {
    return data.filter((beer) => {
      const year = beer.first_brewed.split("/")[1];
      return year < "2010";
    });
  };

  // const setSearchState = () => {
  //   const termFilter = data.filter((beer) => {
  //     return beer.name.toLowerCase().includes(searchTerm);
  //   });
  //   return termFilter;
  // };
  const handleCheckBox = (pos) => {
    const updatedCheckedState = checkBoxState.map((item, index) =>
      index === pos ? !item : item
    );
    setCheckBoxState(updatedCheckedState);
    console.log(checkBoxState);
  };
  console.log(filteredBeers);

  return (
    <div className="App">
      <Nav handleCheckBox={handleCheckBox} handleSearch={handleSearchInput} />
      {status === "fetched" ? (
        <BeersList beersArr={filteredBeers} />
      ) : (
        "Waiting for beers..."
      )}
    </div>
  );
};

export default App;
