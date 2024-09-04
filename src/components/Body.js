import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import CategoryMenu from "./CategoryMenu";
import { ShimmerCards } from "./Shimmer";
import useOnline from "../utils/useOnline";
import Loader from "./Loader";
import NotFound from "./NotFound";
import LocationSelector from "./LocationSelector";

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [categoryMenu, setCategoryMenu] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    if (location.lat && location.lng) {
      getRestaurants(location.lat, location.lng);
    }
  }, [location]);

  const getRestaurants = async (lat, lng) => {
    const response = await fetch(
      `https://gofoodsserver.onrender.com/api/restaurants/?lat=${lat}&lng=${lng}`
    );
    const json = await response.json();

    const checkJsonData = async (jsonData) => {
      for (let i = 0; i < jsonData?.data?.cards.length; i++) {
        let checkData =
          json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;

        if (checkData !== undefined) {
          return checkData;
        }
      }
    };

    const resData = await checkJsonData(json);
    setCategoryMenu(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.info
    );
    setAllRestaurants(resData);
    setFilteredRestaurants(resData);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    if (searchValue === "") {
      setFilteredRestaurants(allRestaurants);
    } else {
      const filteredData = allRestaurants.filter((rest) =>
        rest.info.name.toLowerCase().includes(searchValue)
      );
      setFilteredRestaurants(filteredData);
    }
  };

  const isOnline = useOnline();

  if (!isOnline) {
    return (
      <h2>
        There is a problem with your internet connection. Please try again
      </h2>
    );
  }

  return (
    <>
      <LocationSelector onLocationChange={setLocation} />
      {allRestaurants?.length === 0 ? (
        <ShimmerCards />
      ) : filteredRestaurants.length === 0 ? (
        <>
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={handleSearchChange}
            />
            <button className="search-button">🔍</button>
          </div>
          <NotFound />
        </>
      ) : (
        <>
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={handleSearchChange}
            />
            <button className="search-button">🔍</button>
          </div>
          {categoryMenu && <CategoryMenu categoryMenu={categoryMenu} />}
          <h1 className="main-content-text">
            Restaurants with online food delivery in your area
          </h1>
          <div className="restaurant-lists">
            {filteredRestaurants.map((restaurant) => (
              <Link
                to={"/restaurant/" + restaurant.info.id}
                key={restaurant.info.id}
              >
                <RestaurantCard {...restaurant.info} />
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Body;
