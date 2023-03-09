import React from "react";
import CountryService from "../services/country-service";
import Container from "./container";

export default function Countries() {
  const fields = [
    "name",
    "continent",
    "population",
    "median_age",
    "land_area",
    "fertility_rate",
  ];
  const searchPlaceholder = "Search by country";
  return (
    <Container
      service={CountryService}
      fields={fields}
      searchPlaceholder={searchPlaceholder}
    />
  );
}
