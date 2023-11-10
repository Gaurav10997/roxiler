import * as React from "react";
import "./styles.css";
import BasicSelect from "./BasicSelect";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Statics from "./Statics";
import BarChart from "./BarChart";
import PieChart from "./PieChart.jsx";

import Pagination from "@mui/material/Pagination";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalpage, setTotalPage] = useState(1);
  const [month, setMonth] = useState("MARCH");
  const [search, setSearch] = useState("");
  const handleMonth = (value) => {
    setMonth(value);
    console.log(value);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPageNo(1);
  };

  React.useEffect(() => {
    fetch(
      `http://localhost:4040/transactions?page=${pageNo}&limit=3&month=${month}&search=${search}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data.data.transactions);
        setTotalPage(data.data.totalPages);
      })
      .catch((err) => console.log(err));
  }, [pageNo, month, search]);

  React.useEffect(() => {
    fetch(`http://localhost:4040/categorystats?month=${month}`)
      .then((response) => response.json())
      .then((data) => setCategoryStats(data))
      .catch((err) => console.log(err));
  }, [month]);

  return (
    <>
      <div
        style={{
          display: "flex",
          margin: "30px auto",
          width: "80%",
          justifyContent: "space-around"
        }}
      >
        <input
          type="text"
          placeholder={"Search Here"}
          style={{ borderRadius: "10px", outline: "none", fontSize: "20px" }}
          onChange={handleSearch}
        />
        <BasicSelect handleMonth={handleMonth} />
      </div>
      <TableContainer
        sx={{ width: "75%", height: "75%", margin: "0 auto" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Sold</TableCell>
              <TableCell align="right">image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">
                  {row.sold === false ? "YES" : "NO"}
                </TableCell>
                <TableCell align="right">
                  <img width={50} height={50} src={row.image} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ width: "100%" }}>
        {!search && (
          <Pagination
            count={totalpage}
            onChange={(event, value) => setPageNo(value)}
            color="primary"
            sx={{ margin: "0 auto", width: "100%" }}
          />
        )}
      </div>
      <Statics month={month} />
      <div
        style={{
          display: "flex",
          margin: "30px auto",
          width: "80%",
          alignItems: "center",
          justifyContent: "space-around"
        }}
      >
        <BarChart month={month} />
        <PieChart month={month} categoryStats={categoryStats} />
      </div>
    </>
  );
}
