import React from "react";
import { CDN_URL } from "../utils/constant";

const RestaurantCard = ({ resData }) => {
  const { name, cloudinaryImageId, cuisines, avgRating, costForTwo, sla } =
    resData.info;

  return (
    <div
      data-testid="resCard" // ✅ Added for testing purposes
      className="w-64 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
    >
      <img
        className="w-full h-40 object-cover rounded-md mb-3"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
      <p className="text-sm text-gray-600 truncate">{cuisines.join(", ")}</p>
      <div className="flex justify-between text-sm text-gray-700 mt-2">
        <span>⭐ {avgRating}</span>
        <span>{sla.deliveryTime} mins</span>
      </div>
      <div className="text-sm text-purple-700 mt-1 font-medium">
        {costForTwo}
      </div>
    </div>
  );
};

export default RestaurantCard;
