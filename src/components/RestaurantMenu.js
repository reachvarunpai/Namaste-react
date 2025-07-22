// src/components/RestaurantMenu.js
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useState } from "react";
import { CDN_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [expandedSection, setExpandedSection] = useState(null);
  const [vegOnly, setVegOnly] = useState(false);

  const dispatch = useDispatch();

  if (!resInfo)
    return <h2 className="text-center text-xl mt-10">Loading...</h2>;

  const restaurant = resInfo?.cards?.find(
    (card) => card?.card?.card?.info
  )?.card?.card?.info;

  const menuSections =
    resInfo?.cards?.find((card) => card?.groupedCard)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const sectionsWithItems = menuSections.filter(
    (section) => section?.card?.card?.itemCards?.length > 0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-1">{restaurant?.name}</h1>
      <p className="text-gray-600 mb-6">
        {restaurant?.cuisines?.join(", ")} – {restaurant?.costForTwoMessage}
      </p>

      <div className="mb-6">
        <label className="flex items-center space-x-2 text-gray-800 font-medium">
          <input
            type="checkbox"
            checked={vegOnly}
            onChange={() => setVegOnly(!vegOnly)}
            className="accent-green-600 w-4 h-4"
          />
          <span>Show Veg Only</span>
        </label>
      </div>

      <h2 className="text-2xl font-semibold mb-4">📋 Menu</h2>

      {sectionsWithItems.length === 0 ? (
        <p className="text-gray-500">No menu available.</p>
      ) : (
        sectionsWithItems.map((section, index) => {
          const sectionTitle = section?.card?.card?.title;
          const items = section.card.card.itemCards
            .map((itemCard) => itemCard.card.info)
            .filter((item) => (vegOnly ? item.isVeg === 1 : true));

          if (items.length === 0) return null;
          const isExpanded = expandedSection === index;

          return (
            <div
              key={sectionTitle + index}
              className="border rounded-lg mb-5 shadow-sm"
            >
              <div
                onClick={() =>
                  setExpandedSection(isExpanded ? null : index)
                }
                className="bg-gray-100 px-4 py-3 cursor-pointer font-semibold text-gray-800 flex justify-between items-center"
              >
                <span>{sectionTitle}</span>
                <span>{isExpanded ? "▲" : "▼"}</span>
              </div>

              {isExpanded && (
                <ul className="px-4 py-3 space-y-6 bg-white">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      data-testid="foodItems" 
                      className="flex flex-col sm:flex-row justify-between gap-4 border-b pb-4"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          ₹{((item?.price ?? item?.defaultPrice ?? 0) / 100).toFixed(2)}
                          {item.isVeg === 1 ? (
                            <span className="ml-2 text-green-600">🟢 Veg</span>
                          ) : (
                            <span className="ml-2 text-red-600">🔴 Non-Veg</span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-xs text-gray-500 mt-2">{item.description}</p>
                        )}
                      </div>

                      <div className="flex flex-col items-center min-w-[120px]">
                        {item.imageId && (
                          <img
                            src={CDN_URL + item.imageId}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-md mb-2 border"
                          />
                        )}
                        <button
                          data-testid="addBtn"
                          className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 text-sm"
                          onClick={() => dispatch(addItem(item))}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default RestaurantMenu;
