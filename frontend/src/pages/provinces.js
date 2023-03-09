import React from "react";
import { useParams } from "react-router-dom";
import Container from "./container";
import ProvinceService from "../services/province-service";

export default function Provinces() {
  const { countryId } = useParams();
  const fields = ["name", "population", "median_age"];
  const searchPlaceholder = "Search by province";
  return (
    <Container
      service={ProvinceService}
      fields={fields}
      searchPlaceholder={searchPlaceholder}
      filterBy={{ country__id: countryId }}
      saveKwargs={{ country: countryId }}
      disableFilters={["continent", "fertilityRate"]}
    />
  );
}
