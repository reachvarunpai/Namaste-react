import React from "react";

const withPromotedLabel = (Component) => {
  return (props) => {
    const info = props.resData.info;

    const isPromoted =
      info.badgesV2?.entityBadges?.textExtendedBadges?.length > 0;

    return (
      <div className="relative">
        {isPromoted && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
            PROMOTED
          </div>
        )}
        <Component {...props} />
      </div>
    );
  };
};

export default withPromotedLabel;
