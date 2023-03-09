import React from "react";
import {
  Button,
  Collapse,
  FormControl,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import { toTitle } from "../utils";
import SaveIcon from "@mui/icons-material/Save";
import EditableTableRow from "./editable-table-row";
import HeaderGroup from "./header-group";

function Create(props) {
  const fields = props.fields;
  const protoData = Object.fromEntries(fields.map((field) => [field, ""]));
  const [data, setData] = React.useState(protoData);

  const handleOnChange = (event, key) => {
    const newData = { ...data, ...props.saveKwargs };
    newData[key] = event.target.value;

    setData({ ...newData });
  };

  const handleSaveClick = () => {
    props.service
      .post({ params: data })
      .then((response) => {
        console.log(response);
        props.setReload((reload) => !reload);
      })
      .catch((error) => {
        console.log(error);
      });

    setData({ ...protoData });
  };

  return (
    <Grid container spacing={1}>
      {fields.map((field) => {
        return (
          <Grid key={field} item>
            <FormControl fullWidth>
              <TextField
                key={field}
                label={toTitle(field)}
                value={data[field]}
                onChange={(event) => handleOnChange(event, field)}
              ></TextField>
            </FormControl>
          </Grid>
        );
      })}
      <Grid item>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{ height: "100%" }}
          onClick={handleSaveClick}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
}

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
        <TableCell padding="checkbox" component="div" />
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
        <TableCell component="div" />
      </TableRow>
    </TableHead>
  );
}

export default function Container(props) {
  const fields = props.fields;
  const [dataPoints, setDataPoints] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState([]);

  const handleSortLabelClick = (event, property) => {
    const idx = orderBy.findIndex((e) => e.label === property);
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

  // filters
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

  // selected elements
  const [selectedRows, setSelectedRows] = React.useState([]);
  const handleCheckboxClick = (event, rowId) => {
    const idx = selectedRows.indexOf(rowId);
    let newSelectedRows = [];

    if (idx === -1) {
      newSelectedRows = [...selectedRows, rowId];
    } else if (idx === 0) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
    } else if (idx === selectedRows.length - 1) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
    } else if (idx > 0) {
      newSelectedRows = newSelectedRows.concat(
        selectedRows.slice(0, idx),
        selectedRows.slice(idx + 1)
      );
    }

    setSelectedRows(newSelectedRows);
  };

  const [reload, setReload] = React.useState(false);
  const handleDeleteButtonClick = () => {
    const promises = selectedRows.map((row) => {
      return props.service
        .delete(row)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    });

    Promise.all(promises)
      .then((responses) => {
        console.log(responses);
      })
      .catch((errors) => {
        console.log(errors);
      })
      .finally(() => {
        setReload((old) => !old);
      });
  };

  const [continents, setContinents] = React.useState([]);
  React.useEffect(() => {
    props.service
      .getAll()
      .then((response) => {
        const results = response.data.results;
        const continents = new Set(results.map((result) => result.continent));
        setContinents([...continents]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  const [searchText, setSearchText] = React.useState("");
  const [name, setName] = React.useState("");
  const handleSearchClick = () => {
    setName(searchText);
  };

  const handleExportButtonClick = () => {
    const params = createQueryParams();
    props.service.exportToCSV({ params: params });
  };

  // collapsible
  const [collapseIn, setCollapseIn] = React.useState(false);
  const handleAddButtonClick = () => {
    setCollapseIn((collapse) => !collapse);
  };

  const headerGroupProps = {
    continents: continents,
    continent: continent,
    setContinent: setContinent,
    population: population,
    setPopulation: setPopulation,
    medianAge: medianAge,
    setMedianAge: setMedianAge,
    fertilityRate: fertilityRate,
    setFertilityRate: setFertilityRate,
    searchText: searchText,
    setSearchText: setSearchText,
    handleSearchClick: handleSearchClick,
    handleExportButtonClick: handleExportButtonClick,
    handleDeleteButtonClick: handleDeleteButtonClick,
    handleAddButtonClick: handleAddButtonClick,
    searchPlaceholder: props.searchPlaceholder,
  };

  if (props.disableFilters) {
    for (let e of props.disableFilters) {
      delete headerGroupProps[e];
    }
  }

  const createQueryParams = React.useCallback(() => {
    let params = {};
    if (name !== "") {
      params = { ...params, name: name };
    }

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

    if (props.filterBy) {
      params = { ...params, ...props.filterBy };
    }

    return params;
  }, [name, continent, population, fertilityRate, medianAge]);

  React.useEffect(() => {
    const _orderBy = orderBy.map((order) => {
      return order.direction === "asc" ? order.label : `-${order.label}`;
    });

    let params = {
      order: _orderBy.join(","),
      page: page + 1,
      page_size: rowsPerPage,
      ...createQueryParams(),
    };

    if (props.filterBy) {
      params = { ...params, ...props.filterBy };
    }

    props.service
      .getAll({ params: params })
      .then((response) => {
        setDataPoints(response.data.results);
        setCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [
    orderBy,
    page,
    rowsPerPage,
    reload,
    props.filterBy,
    props.service,
    createQueryParams,
  ]);

  return (
    <div style={{ maxWidth: "100vw" }}>
      {/* filters start */}
      <HeaderGroup {...headerGroupProps} />
      {/* filters end */}
      <Collapse in={collapseIn}>
        <Paper
          sx={{
            marginTop: "5px",
            marginBottom: "10px",
            paddingBottom: "10px",
            paddingLeft: "20px",
          }}
        >
          <Typography sx={{ marginBottom: "5px" }}>Add a new row</Typography>
          <Create
            fields={fields}
            service={props.service}
            saveKwargs={props.saveKwargs}
            setReload={setReload}
          />
        </Paper>
      </Collapse>
      <TableContainer component={Paper}>
        <Table aria-label="data-table" component="div">
          <SortableTableHead
            fields={fields}
            orderBy={orderBy}
            onSortLabelClick={handleSortLabelClick}
          />
          <TableBody component="div">
            {dataPoints.map((dp) => {
              return (
                <EditableTableRow
                  service={props.service}
                  key={dp.id}
                  data={dp}
                  fields={fields}
                  handleCheckboxClick={handleCheckboxClick}
                  isSelected={selectedRows.indexOf(dp.id) !== -1}
                />
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
