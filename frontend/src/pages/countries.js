import React from "react";
import CountryService from "../services/country-service";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toTitle } from "../utils";

export default function Countries() {
  const fields = [
    "name",
    "continent",
    "population",
    "median_age",
    "land_area",
    "fertility_rate",
  ];
  const [countries, setCountries] = React.useState([]);

  React.useEffect(() => {
    CountryService.getAll()
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(countries);
  return (
    <TableContainer sx={{ maxWidth: "80vw" }} component={Paper}>
      <Table aria-label="countries-table" component="div">
        <TableHead component="div">
          <TableRow component="div">
            {fields.map((field) => {
              return (
                <TableCell key={field} component="div">
                  {toTitle(field)}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody component="div">
          {countries.map((country) => {
            return (
              <TableRow
                key={country.id}
                component={Link}
                to={`/countries/${country.id}`}
                sx={{ textDecoration: "none" }}
              >
                {fields.map((field) => {
                  return (
                    <TableCell key={`${country.id}-${field}`} component="div">
                      {country[field]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
