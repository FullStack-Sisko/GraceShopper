import React from "react";

const PageNotFound = (props) => {
  return (
    <div>
      <h1>
        Whoops! The page at ( {props.location.pathname} ) does not exist...
      </h1>
      <p>Click the navigation links to direct yourself elsewhere.</p>
    </div>
  );
};

export default PageNotFound;
