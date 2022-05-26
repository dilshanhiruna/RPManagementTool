import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Backdrop,
  Stack,
  IconButton,
} from "@mui/material";
import "./TopicRequests.css";
import ChatMenu from "../StudentGroup/ChatMenu";

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
  { id: "role", label: "Your Role", minWidth: 100, align: "center" },
  { id: "chat", label: "Chat", minWidth: 100, align: "center" },
];

export default function ViewMyStudentGroups({ user }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [confirmAction, setConfirmAction] = useState();

  //set group id and action for topic request accept and reject
  const [groupId, setGroupId] = useState();
  const [_id, set_id] = useState();
  const [action, setAction] = useState();

  //function to create obj from response
  const createObjResponse = (res, data) => {
    let student1, student2, student3, student4;

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
    let obj = {
      _id: data._id,
      groupID: data.groupID,
      reTopic: data.researchTopic,
      student1,
      student2,
      student3,
      student4,
      role: res.data.type,
    };
    return obj;
  };
  //function to get topic requests of the relevant supervisor
  const getTopicReqs = async () => {
    try {
      let objArray = [];

      await axios
        .get(`${API}/studentgroups/supervisor/accepted/${user._id}`)
        .then((res) => {
          if (res.data.data.length == 0) {
            console.log("No topic reqs");
          } else {
            res.data.data.map((data) => {
              let obj = createObjResponse(res, data);
              objArray.push(obj);
            });
          }
        });
      await axios
        .get(`${API}/studentgroups/cosupervisor/accepted/${user._id}`)
        .then((res) => {
          if (res.data.data.length == 0) {
            console.log("No topic reqs");
          } else {
            res.data.data.map((data) => {
              let obj = createObjResponse(res, data);
              objArray.push(obj);
            });
          }
        });
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
  const openChat = () => {
    setOpenConfirmModal(false);
    console.log(_id);
  };
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleToggle = () => {
    setOpenBackdrop(!openBackdrop);
  };

  //get confirmation to accept or reject action
  const getConfirmation = (groupId, _id, action) => {
    handleToggle();
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
        {rows.length != 0 ? (
          <div className="student__dashboard">
            <h3>Groups you have registered as supervisor or co-supervisor: </h3>
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
                      ></TableCell>
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
                              if (column.id == "chat") {
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
                                          "Reject"
                                        );
                                      }}
                                    >
                                      Chat
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

            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={openBackdrop}
            >
              <div
                className="supervisor__chat"
                style={{
                  width: "400px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h1>Chat with {groupId}</h1>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={handleCloseBackdrop}
                  >
                    <CloseRoundedIcon />
                  </IconButton>
                </div>
                <ChatMenu studentGroup={{ _id: groupId }} user={user} />
              </div>
            </Backdrop>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        {rows.length == 0 ? (
          <div className="student__dashboard">
            <div>You are not assigned to any group yet</div>{" "}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
