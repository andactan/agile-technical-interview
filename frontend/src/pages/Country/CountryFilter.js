import React from "react";
import useFilterStore from "../../store/useFilterStore";

export default function CountryFilter() {
  const [filters, setFilters] = useFilterStore((state) => [
    state.filters,
    state.setFilters,
  ]);
}
