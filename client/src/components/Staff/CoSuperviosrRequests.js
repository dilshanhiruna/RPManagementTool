import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import "./TopicRequests.css";

const API = process.env.REACT_APP_API;

//table columns
const columns = [
  { id: "groupID", label: "Group ID", minWidth: 70, align: "center" },
  { id: "reTopic", label: "Research Topic", minWidth: 100, align: "center" },
  {
    id: "student1",
    label: "Student 1",
    minWidth: 90,
    align: "center",
  },
  {
    id: "student2",
    label: "Student 2",
    minWidth: 90,
    align: "center",
  },
  {
    id: "student3",
    label: "Student 3",
    minWidth: 90,
    align: "center",
  },
  {
    id: "student4",
    label: "Student 4",
    minWidth: 90,
    align: "center",
  },
  { id: "accept", label: "", minWidth: 100, align: "center" },
  { id: "reject", label: "", minWidth: 100, align: "center" },
];

export default function CoSuperviosrRequests({ user }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState();
  const [pageIsLoadig, setPageIsLoading] = useState(true);

  //set group id and action for topic request accept and reject
  const [groupId, setGroupId] = useState();
  const [_id, set_id] = useState();
  const [action, setAction] = useState();

  //function to get topic requests of the relevant supervisor
  const getTopicReqs = async () => {
    try {
      let objArray = [];

      await axios.get(`${API}/cosupervisorRequests/${user._id}`).then((res) => {
        if (res.data.data.length == 0) {
          console.log("No topic reqs");
        } else {
          // res.data.data.forEach((data) => {});
          let student1, student2, student3, student4;

          res.data.data.map((data) => {
            if (data.student1) {
              student1 = data.student1.uid;
            } else {
              student1 = "Not Avaialable";
            }
            if (data.student2) {
              student2 = data.student2.uid;
            } else {
              student1 = "Not Avaialable";
            }
            if (data.student3) {
              student3 = data.student3.uid;
            } else {
              student1 = "Not Avaialable";
            }
            if (data.student4) {
              student4 = data.student4.uid;
            } else {
              student4 = "Not Avaialable";
            }
            const obj = {
              _id: data._id,
              groupID: data.groupID,
              reTopic: data.researchTopic,
              student1,
              student2,
              student3,
              student4,
            };
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

  //function to get student of a given ID
  // const getStudent = (id) => {
  //   try {
  //     let uid;
  //     const response = axios.get(`${API}/users/${id}`).then((res) => {
  //       uid = res.data.data.uid;
  //     });

  //     return uid;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  //function to accept/reject topic reqest
  const acceptOrReject = () => {
    console.log(_id);
    let accRej = "";
    if (action == "Accept") {
      accRej = "accepted";
    } else if (action == "Reject") {
      accRej = "rejected";
    }
    axios
      .post(`${API}/cosupervisorRequests/acceptOrReject/${_id}`, {
        action: accRej,
      })
      .then(() => {
        window.location.reload();
      });
  };

  //get confirmation to accept or reject action
  const getConfirmation = (groupId, _id, action) => {
    setGroupId(groupId);
    set_id(_id);
    setAction(action);
    setOpenConfirmModal(true);

    if (confirmAction) {
      console.log("true");
    } else {
      console.log("false");
    }
  };

  useEffect(() => {
    getTopicReqs();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleModalClose = () => {
    setOpenConfirmModal(false);
  };
  return (
    <>
      <div>
        <div className="student__dashboard">
          {pageIsLoadig ? <LinearProgress color="inherit" /> : ""}
        </div>
        {rows.length != 0 ? (
          <div className="student__dashboard">
            <h3>
              Following groups have requested you to be their co-supervisor:
            </h3>{" "}
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        colSpan={2}
                        className="hash-table-border"
                      >
                        Group Detaials
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={4}
                        className="hash-table-border"
                      >
                        Students
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={2}
                        className="hash-table-border"
                      >
                        Action
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                          className="hash-table-border"
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
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
                              if (column.id == "accept") {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    className="hash-table-border"
                                  >
                                    <Button
                                      color="success"
                                      onClick={() => {
                                        getConfirmation(
                                          row["groupID"],
                                          row["_id"],
                                          "Accept"
                                        );
                                      }}
                                    >
                                      Accept
                                    </Button>
                                  </TableCell>
                                );
                              }
                              if (column.id == "reject") {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    className="hash-table-border"
                                  >
                                    <Button
                                      color="error"
                                      onClick={() => {
                                        getConfirmation(
                                          row["groupID"],
                                          row["_id"],
                                          "Reject"
                                        );
                                      }}
                                    >
                                      Reject
                                    </Button>
                                  </TableCell>
                                );
                              }
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  className="hash-table-border"
                                >
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
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
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            {/* confirm modal */}
            <Dialog
              open={openConfirmModal}
              // onClose={handleCloseRemoveMember}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {`${action} Topic`}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {`Are you sure you want to ${action} the topic of group "${groupId}" ?`}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    handleModalClose();
                  }}
                >
                  Disagree
                </Button>
                <Button
                  onClick={() => {
                    acceptOrReject();
                  }}
                  autoFocus
                  color="error"
                >
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        {pageIsLoadig == false && rows.length == 0 ? (
          <div className="student__dashboard">
            <div>No New Requests avaialable</div>{" "}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
