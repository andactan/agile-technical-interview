import {
  Button,
  Checkbox,
  FormControl,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { Link } from "react-router-dom";
import CountryService from "../services/country-service";

export default function EditableTableRow(props) {
  const fields = props.fields;
  const [data, setData] = React.useState(props.data);
  const handleCheckboxClick = props.handleCheckboxClick;
  const isSelected = props.isSelected;

  const [editMode, setEditMode] = React.useState(false);
  const handleEditClick = () => {
    if (editMode) {
      props.service
        .patch({ id: data.id, params: data })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setEditMode((edit) => !edit);
  };

  const handleDataChange = (event, key) => {
    const isNumber = (arg) => {
      return Number(arg) === arg;
    };

    const isInt = (arg) => {
      return arg % 1 === 0;
    };

    const newData = { ...data };

    newData[key] = event.target.value;

    // if (event.target.value.length === 0) {
    //   newData[key] = props.data[key];
    //   setData({ ...newData });
    //   return;
    // }

    // if (isNumber(props.data[key])) {
    //   if (isInt(props.data[key])) {
    //     const intMatch = event.target.value.match(/^[0-9]*$/);
    //     if (intMatch === null || intMatch[0] === "") {
    //       newData[key] = 0;
    //     } else {
    //       newData[key] = parseInt(intMatch[0]);
    //     }
    //   } else {
    //     const floatMatch = event.target.value.match(/^[0-9]*(\.)?[0-9]*$/);
    //     console.log(floatMatch);
    //     if (floatMatch === null || floatMatch[0] === "") {
    //       newData[key] = 0;
    //     } else {
    //       newData[key] = parseFloat(floatMatch[0]);
    //     }
    //   }
    // } else {
    //   newData[key] = event.target.value;
    // }
    setData({ ...newData });
  };

  const [params, setParams] = React.useState({});
  return (
    <React.Fragment>
      <TableRow key={data.id} component="div">
        <TableCell padding="checkbox" component="div">
          <Checkbox
            color="primary"
            checked={isSelected}
            onChange={(event) => handleCheckboxClick(event, data.id)}
          />
        </TableCell>
        <TableCell
          key={`${data.id}-${"name"}`}
          component="div"
          align="left"
          sx={{ paddingLeft: "42px", width: "15%" }}
        >
          {editMode ? (
            <FormControl>
              <TextField
                inputProps={{
                  style: {
                    height: "5px",
                    width: "60px",
                  },
                }}
                value={data["name"]}
                onChange={(event) => handleDataChange(event, "name")}
              />
            </FormControl>
          ) : (
            <Link to={`/countries/${data.id}`}>{data["name"]}</Link>
          )}
        </TableCell>
        {fields
          .filter((e) => e !== "name")
          .map((field) => {
            return (
              <TableCell
                key={`${data.id}-${field}`}
                component="div"
                align="left"
                sx={{ paddingLeft: "42px", width: "15%" }}
              >
                {editMode ? (
                  <TextField
                    style={{ padding: "0px" }}
                    inputProps={{
                      style: {
                        height: "5px",
                        fontSize: "15px",
                      },
                    }}
                    value={data[field]}
                    onChange={(event) => handleDataChange(event, field)}
                  />
                ) : (
                  data[field]
                )}
              </TableCell>
            );
          })}
        <TableCell component="div" align="right">
          <Button variant="contained" onClick={handleEditClick}>
            {!editMode ? <EditIcon /> : "Save"}
          </Button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
