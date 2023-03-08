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
  TableSortLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toTitle } from "../utils";

function SortableTableHead(props) {
  const fields = props.fields;
  const orderBy = props.orderBy;
  const onSortLabelClick = props.onSortLabelClick;

  const handleSortLabelClick = (prop) => (event) => {
    onSortLabelClick(event, prop);
  };

  return (
    <TableHead component="div">
      <TableRow component="div">
        {fields.map((field) => {
          const found = orderBy.find((e) => e.label === field);
          return (
            <TableCell
              key={field}
              component="div"
              sortDirection={found ? found.direction : false}
              align="left"
              padding="normal"
            >
              <TableSortLabel
                active={found !== undefined}
                direction={found ? found.direction : "asc"}
                onClick={handleSortLabelClick(field)}
              ></TableSortLabel>
              {toTitle(field)}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

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
  const [orderBy, setOrderBy] = React.useState([]);

  console.log("orderBy ---> ", orderBy);

  const handleSortLabelClick = (event, property) => {
    console.log(property);
    const idx = orderBy.findIndex((e) => e.label === property);
    console.log("found", idx);
    // not present
    if (idx === -1) {
      const newOrderByEntry = { label: property, direction: "asc" };
      setOrderBy([...orderBy, newOrderByEntry]);
    } else {
      const order = orderBy[idx].direction === "asc" ? "desc" : "asc";
      orderBy[idx].direction = order;
      setOrderBy([...orderBy]);
    }
  };

  React.useEffect(() => {
    CountryService.getAll()
      .then((response) => {
        setCountries(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(countries);
  return (
    <TableContainer sx={{ maxWidth: "80vw" }} component={Paper}>
      <Table aria-label="countries-table" component="div">
        <SortableTableHead
          fields={fields}
          orderBy={orderBy}
          onSortLabelClick={handleSortLabelClick}
        />
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
                    <TableCell
                      key={`${country.id}-${field}`}
                      component="div"
                      align="left"
                      sx={{ paddingLeft: "42px" }}
                    >
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
