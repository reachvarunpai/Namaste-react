import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await response.json();
      const restaurants =
        json?.data?.cards?.find(
          (c) => c?.card?.card?.id === "restaurant_grid_listing_v2"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setAllRestaurants(restaurants);
      setFilteredRestaurants(restaurants);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="filter" style={{ marginBottom: "20px" }}>
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => {
              const filtered = allRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(filtered);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const topRated = allRestaurants.filter(
              (res) => res.info.avgRating > 4.3
            );
            setFilteredRestaurants(topRated);
          }}
        >
          Top Rated Restaurants
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            setFilteredRestaurants(allRestaurants);
          }}
          style={{ marginLeft: "10px" }}
        >
          Show All
        </button>
      </div>

      <div className="res-container">
        {loading ? (
          <Shimmer />
        ) : filteredRestaurants.length === 0 ? (
          <h3>No restaurants found.</h3>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.info.id} resData={restaurant} />
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
