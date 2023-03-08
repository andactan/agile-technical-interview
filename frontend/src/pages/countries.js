import React from "react";
import CountryService from "../services/country-service";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toTitle } from "../utils";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const [continent, setContinent] = React.useState("All");
  const [population, setPopulation] = React.useState("All");
  const [medianAge, setMedianAge] = React.useState("All");
  const [fertilityRate, setFertilityRate] = React.useState("All");

  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState(0);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    const _orderBy = orderBy.map((order) => {
      return order.direction === "asc" ? order.label : `-${order.label}`;
    });

    let params = {
      order: _orderBy.join(","),
      page: page + 1,
      page_size: rowsPerPage,
    };

    if (continent !== "All" && continent !== "") {
      params = { ...params, continent: continent };
    }

    if (population !== "All" && population !== "") {
      const [filterKey, filterValue] = population.split("-");
      params[filterKey] = parseInt(filterValue, 10);
    }

    if (fertilityRate !== "All" && fertilityRate !== "") {
      const [filterKey, filterValue] = fertilityRate.split("-");
      params[filterKey] = parseFloat(filterValue);
    }

    if (medianAge !== "All" && medianAge !== "") {
      const [filterKey, filterValue] = medianAge.split("-");
      params[filterKey] = parseInt(filterValue, 10);
    }

    CountryService.getAll({ params: params })
      .then((response) => {
        setCountries(response.data.results);
        setCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [
    orderBy,
    continent,
    population,
    medianAge,
    fertilityRate,
    page,
    rowsPerPage,
  ]);

  const [continents, setContinents] = React.useState([]);
  React.useEffect(() => {
    CountryService.getAll()
      .then((response) => {
        const results = response.data.results;
        setContinents(results.map((result) => result.continent));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ maxWidth: "100vw" }}>
      <Paper sx={{ padding: "20px", marginBottom: "10px" }}>
        <Grid container spacing={1}>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel id="continent-label">Continent</InputLabel>
              <Select
                labelId="continent-label"
                id="continent-select"
                label="Continent"
                value={continent}
                onChange={(event) => setContinent(event.target.value)}
              >
                <MenuItem value={"All"}>All</MenuItem>
                {continents.map((continent) => (
                  <MenuItem value={continent}>{continent}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel id="population-label">Population</InputLabel>
              <Select
                labelId="population-label"
                id="population-select"
                label="Population"
                value={population}
                onChange={(event) => setPopulation(event.target.value)}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"population__lte-100000000"}>
                  {"< 100 million"}
                </MenuItem>
                <MenuItem value={"population__gte-100000000"}>
                  {"> 100 million"}
                </MenuItem>
                <MenuItem value={"population__gte-1000000000"}>
                  {"> 1 billion"}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel id="median-age-label">Median Age</InputLabel>
              <Select
                labelId="median-age-label"
                id="median-age-select"
                label="Median Age"
                value={medianAge}
                onChange={(event) => setMedianAge(event.target.value)}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"median_age__lte-45"}>{"< 45"}</MenuItem>
                <MenuItem value={"median_age__gte-45"}>{"> 45"}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel id="fertility-rate-label">Fertility Rate</InputLabel>
              <Select
                labelId="fertility-rate-label"
                id="fertility-rate-select"
                label="Fertility Rate"
                value={fertilityRate}
                onChange={(event) => setFertilityRate(event.target.value)}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"fertility_rate__lte-1.5"}>{"< 1.5"}</MenuItem>
                <MenuItem value={"fertility_rate__gte-1.5"}>{"> 1.5"}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField label="Search by country" />
            </FormControl>
          </Grid>
          <Grid item>
            <Button sx={{ height: "100%" }} variant="contained">
              <SearchIcon />
            </Button>
          </Grid>
          <Grid item xs={"auto"}>
            <Button
              sx={{ height: "100%" }}
              variant="contained"
              startIcon={<DownloadIcon />}
            >
              Export to CSV
            </Button>
          </Grid>

          <Grid item xs={"auto"}>
            <Button
              sx={{ height: "100%" }}
              variant="contained"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {/* filters end */}
      <TableContainer component={Paper}>
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
      <TablePagination
        rowsPerPageOptions={[1, 5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
}
