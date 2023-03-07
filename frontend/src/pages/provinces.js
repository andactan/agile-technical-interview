import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import ProvinceService from "../services/province-service";
import { toTitle } from "../utils";

export default function Provinces() {
  const [provinces, setProvinces] = React.useState([]);
  const { countryId } = useParams();
  const fields = ["name"];

  React.useEffect(() => {
    ProvinceService.getAll({ params: { country__id: countryId } })
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [countryId]);

  console.log(provinces);

  return (
    <TableContainer component={Paper} sx={{ maxWidth: "80vw" }}>
      <Table>
        <TableHead>
          <TableRow>
            {fields.map((field) => {
              return <TableCell>{toTitle(field)}</TableCell>;
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {provinces.map((province) => {
            return (
              <TableRow key={province.id}>
                {fields.map((field) => {
                  return <TableCell>{province[field]}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
