import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import withPromotedLabel from "./withPromotedLabel";

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const onlineStatus = useOnlineStatus();

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

  const PromotedRestaurantCard = withPromotedLabel(RestaurantCard);

  if (!onlineStatus) {
    return (
      <h1 className="text-center text-red-600 text-xl mt-10">
        🔴 Looks like you're offline! Please check your Internet Connection.
      </h1>
    );
  }

  return (
    <div className="p-4">
      {/* Filter/Search Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search restaurants..."
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Search
          </button>
        </div>

        <div className="flex gap-2">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            onClick={() => {
              const topRated = allRestaurants.filter(
                (res) => res.info.avgRating > 4.3
              );
              setFilteredRestaurants(topRated);
            }}
          >
            Top Rated
          </button>

          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
            onClick={() => {
              setFilteredRestaurants(allRestaurants);
            }}
          >
            Show All
          </button>
        </div>
      </div>

      {/* Restaurant Cards */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <Shimmer />
        ) : filteredRestaurants.length === 0 ? (
          <h3 className="text-center text-gray-500 col-span-full">
            No restaurants found.
          </h3>
        ) : (
          filteredRestaurants.map((restaurant) => {
            const isPromoted =
              restaurant.info.badgesV2?.entityBadges?.textExtendedBadges
                ?.length > 0;

            return (
              <Link
                key={restaurant.info.id}
                to={"/restaurants/" + restaurant.info.id}
              >
                {isPromoted ? (
                  <PromotedRestaurantCard resData={restaurant} />
                ) : (
                  <RestaurantCard resData={restaurant} />
                )}
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Body;
