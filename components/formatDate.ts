import React from "react";

// Function to format the date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const formatType = (type: string): string => {
  if (type === "movie") {
    return "Movie";
  } else if (type === "tv") {
    return "TV Show";
  }
  return type;
};

export { formatDate, formatType };
