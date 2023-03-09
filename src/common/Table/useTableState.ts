import { useState } from "react";

const useTableState = () => {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [sortDepthKey, setSortDepthKey] = useState<string | undefined>(
    undefined,
  );

  return {
    data,
    setData,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    sortDepthKey,
    setSortDepthKey,
  };
};

export default useTableState;
