import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./search.scss";

function Search({ text }) {
  const [wordEntered, setWordEntered] = useState("");
  const [search, onSearch] = useState("");
  //   const [filterData, setFilterData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (wordEntered.trim() !== "") {
      onSearch(wordEntered);
    } else {
      alert("Lütfen aramak istediğiniz adresi giriniz");
    }
  };

  useEffect(() => {
    setWordEntered(text);
  }, [text]);

  //   useEffect(() => {
  //     const newFilter = xxxx?.map(xxxx => xxx?.xxx);
  //     setFilterData(newFilter);
  //   }, [newFilter]);

  const handleSearchChange = (e) => {
    setWordEntered(e.target.value);
  };
  const handleInputClick = () => {
    if (wordEntered === text) {
      setWordEntered("");
    }
  };
  const handleInputBlur = () => {
    if (wordEntered === "") {
      setWordEntered(text);
    }
  };

  useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.key === "Enter") {
        handleSubmit(e);
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [handleSubmit]);

  const clearInputMobile = () => {
    setWordEntered("");
    //     setFilterData([]);
  };

  //   const handleAddressClick = () => {
  //     setFilterData([]);
  //   };

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Mahalle,Sokak veya Cadde Ara"
            id="search"
            value={wordEntered}
            onChange={handleSearchChange}
            onClick={handleInputClick}
            onBlur={handleInputBlur}
            autoComplete="off"
          />
          {wordEntered ? (
            <button
              type="button"
              id="clearBtn"
              className="icon1"
              onClick={clearInputMobile}
            >
              <i className="icon-Close-2" />
            </button>
          ) : (
            <button type="button" className="icon2">
              <i className="icon-search search" />
            </button>
          )}
        </div>
      </form>
      {/* {filterData && (
        <div className="dataItemContainer">
          {filterData?.slice(0, 10)?.map(value => (
            <div
              className="dataItem"
              key={value}
              role="button"
              tabIndex={0}
              onClick={() => handleAddressClick(value)}
            >
              <div className="dataResult">
                <p>{value}</p>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}
Search.propTypes = {
  text: PropTypes.string,
};

export default Search;
