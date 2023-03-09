import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";

import React from "react";

export default function HeaderGroup(props) {
  return (
    <Paper sx={{ padding: "20px", marginBottom: "10px" }}>
      <Grid container spacing={1}>
        <Grid item xs>
          <FormControl fullWidth>
            <InputLabel id="continent-label">Continent</InputLabel>
            <Select
              labelId="continent-label"
              id="continent-select"
              label="Continent"
              value={props.continent}
              onChange={(event) => props.setContinent(event.target.value)}
            >
              <MenuItem value={"All"}>All</MenuItem>
              {props.continents.map((continent) => (
                <MenuItem key={continent} value={continent}>
                  {continent}
                </MenuItem>
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
              value={props.population}
              onChange={(event) => props.setPopulation(event.target.value)}
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
              value={props.medianAge}
              onChange={(event) => props.setMedianAge(event.target.value)}
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
              value={props.fertilityRate}
              onChange={(event) => props.setFertilityRate(event.target.value)}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"fertility_rate__lte-1.5"}>{"< 1.5"}</MenuItem>
              <MenuItem value={"fertility_rate__gte-1.5"}>{"> 1.5"}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <TextField
              label="Search by country"
              value={props.searchText}
              onChange={(event) => props.setSearchText(event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            sx={{ height: "100%" }}
            variant="contained"
            onClick={props.handleSearchClick}
          >
            <SearchIcon />
          </Button>
        </Grid>
        <Grid item xs={"auto"}>
          <Button
            sx={{ height: "100%" }}
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={props.handleExportButtonClick}
          >
            Export to CSV
          </Button>
        </Grid>

        <Grid item xs={"auto"}>
          <Button
            sx={{ height: "100%" }}
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={props.handleDeleteButtonClick}
          >
            Delete
          </Button>
        </Grid>

        <Grid item xs={"auto"}>
          <Button
            sx={{ height: "100%" }}
            variant="contained"
            startIcon={<AddIcon />}
            onClick={props.handleAddButtonClick}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
