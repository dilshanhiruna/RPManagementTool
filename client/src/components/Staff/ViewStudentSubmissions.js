import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Button } from "@mui/material";
import { triggerBase64Download } from "common-base64-downloader-react";
import { color } from "@mui/system";

const columns = [
  { id: "groupID", label: "Group ID", minWidth: 100, align: "center" },
  {
    id: "submissionName",
    label: "Submission Name",
    minWidth: 100,
    align: "center",
  },
  {
    id: "deadline",
    label: "Deadline",
    minWidth: 100,
    align: "center",
  },
  {
    id: "submittedOn",
    label: "Submitted On",
    minWidth: 100,
    align: "center",
  },
  {
    id: "marking",
    label: "Marking Scheme",
    minWidth: 100,
    align: "center",
  },
  {
    id: "submission",
    label: "Submission",
    minWidth: 100,
    align: "center",
  },
  {
    id: "marks",
    label: "Provided Marks",
    minWidth: 100,
    align: "center",
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const API = process.env.REACT_APP_API;

export default function ViewStudentSubmissions({ user }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState([]);
  const [pageIsLoadig, setPageIsLoading] = useState(true);

  //calling server endpoint through use effect hook
  useEffect(() => {
    getStudentSubmissions();
  }, []);
  //function to get student submissions of supervior and cosupervisor
  const getStudentSubmissions = async () => {
    try {
      let objArray = [];

      await axios

        .get(`${API}/studentSubmission/staff/${user._id}`)
        .then((res) => {
          if (res.data.data.length == 0) {
            console.log("No topic reqs");
          } else {
            console.log(res.data.data);
            res.data.data.map((data) => {
              let obj = createObjResponse(res, data);
              objArray.push(obj);
            });
          }
        });

      setPageIsLoading(false);
      setRows(objArray);
    } catch (err) {
      console.log(err);
    }
  };

  //function to create obj from server response
  const createObjResponse = (res, data) => {
    let obj = {
      _id: data._id,
      groupID: data.studentGroupId.groupID,
      submissionName: data.submissionDetailsId.submissionName,
      deadline: data.submissionDetailsId.sDeadline,
      submittedOn: formatDate(data.submittedOn),
      marking: data.submissionDetailsId.sMarkingScheme,
      // marking: data.studentGroupId.groupID,
      submission: data.file,
      marks: data.obtainedMarks,
    };
    return obj;
  };

  //function to format js date
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <div className="student__dashboard">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 450 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id == "marking" ? (
                                <Button
                                  onClick={() =>
                                    triggerBase64Download(
                                      row["marking"],
                                      `${row["submissionName"]} markig`
                                    )
                                  }
                                >
                                  Download
                                </Button>
                              ) : column.id == "submission" ? (
                                <Button
                                  style={{
                                    textTransform: "none",
                                  }}
                                  onClick={() =>
                                    triggerBase64Download(
                                      row["submission"].base64,
                                      `${row["submission"].name}`
                                    )
                                  }
                                >
                                  {row["submission"].name}
                                </Button>
                              ) : (
                                <>
                                  {" "}
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </>
                              )}
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
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
}
