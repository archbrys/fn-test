import { useState } from "react";

const useTableState = () => {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  return {
    data,
    setData,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection
  };
};

export default useTableState;
