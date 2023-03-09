import { useState } from "react";
import { ITableData } from "../Table/interface";

const useTableState = () => {
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [sortDepthKey, setSortDepthKey] = useState<string | undefined>(
    undefined,
  );

  const sort = (data: ITableData[]) => {
    if (sortBy === undefined && sortDirection === undefined) return data;
    return data.sort(comparator(sortDepthKey));
  };

  const comparator = (key: any) => (a: ITableData, b: ITableData) => {
    if (key) {
      return getComparatorCondition(a[key], b[key], sortBy);
    }

    return getComparatorCondition(a, b, sortBy);
  };

  const getComparatorCondition = (a: ITableData, b: ITableData, by: string) => {
    const x = sortDirection === "desc" ? b[by] : a[by];
    const y = sortDirection === "desc" ? a[by] : b[by];
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }

    return 0;
  };

  return {
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    sortDepthKey,
    setSortDepthKey,
    sort,
  };
};

export default useTableState;
