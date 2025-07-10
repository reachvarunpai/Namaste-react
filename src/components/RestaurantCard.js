import React from "react";
import { CDN_URL } from "../utils/constant";

const RestaurantCard = ({ resData }) => {
  const { name, cloudinaryImageId, cuisines, avgRating, costForTwo, sla } =
    resData.info;

  return (
    <div className="res-card">
      <img
        className="res-logo"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>⭐ {avgRating}</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla.deliveryTime} mins</h4>
    </div>
  );
};

export default RestaurantCard;
