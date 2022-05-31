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
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/Chat";

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
import "./SupervisorDashboard.css";
import ChatMenu from "../StudentGroup/ChatMenu";

const API = process.env.REACT_APP_API;

//table columns
const columns = [
  { id: "groupID", label: "Group ID", minWidth: 70, align: "center" },
  { id: "reTopic", label: "Research Topic", minWidth: 100, align: "center" },

  { id: "role", label: "Your Role", minWidth: 100, align: "center" },
  {
    id: "students",
    label: "Students",
    minWidth: 90,
    align: "center",
  },
  // { id: "chat", label: "Chat", minWidth: 100, align: "center" },
];

export default function ViewMyStudentGroups({ user }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [confirmAction, setConfirmAction] = useState();
  const [pageIsLoadig, setPageIsLoading] = useState(true);
  const [openGroupMemberModal, setOpenGroupMemberModal] = useState(false);
  const [Students, setStudents] = useState([]);

  //set group id and action for topic request accept and reject
  const [groupId, setGroupId] = useState();
  const [_id, set_id] = useState();
  const [action, setAction] = useState();

  //function to create obj from response
  const createObjResponse = (res, data) => {
    const studentsArray = [
      data.student1,
      data.student2 ? data.student2 : "",
      data.student3 ? data.student3 : "",
      data.student4 ? data.student4 : "",
    ];

    let obj = {
      _id: data._id,
      groupID: data.groupID,
      reTopic: data.researchTopic,
      role: res.data.type,
      students: studentsArray,
    };
    return obj;
  };

  // show group memebrs dialog
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
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
      setPageIsLoading(false);
      setRows(objArray);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleToggle = () => {
    setOpenBackdrop(!openBackdrop);
  };

  //function to open relevant student group chat
  const openStudentChat = (groupId, _id, action) => {
    handleToggle();
    setGroupId(groupId);
    set_id(_id);
    setAction(action);
    setOpenConfirmModal(true);
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

  //functions to handle view student members
  const handleClickOpenGroupMemberModal = (groupId, students) => {
    setOpenGroupMemberModal(true);
    setStudents(students);
    setGroupId(groupId);
  };
  const handleCloseOpenGroupMemberModal = () => {
    setOpenGroupMemberModal(false);
  };
  return (
    <>
      <div>
        <div className="student__dashboard">
          {pageIsLoadig ? <LinearProgress color="inherit" /> : ""}
        </div>
        {rows.length != 0 ? (
          <div className="student__dashboard">
            <h3>Groups you have registered as supervisor or co-supervisor: </h3>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
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

                              if (column.id == "students") {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    className="hash-table-border"
                                  >
                                    <Button
                                      onClick={() => {
                                        handleClickOpenGroupMemberModal(
                                          row["groupID"],
                                          row["students"]
                                        );
                                      }}
                                    >
                                      members
                                    </Button>
                                    {/* <Button color="success">Chat</Button> */}
                                    <br></br>
                                    <ChatIcon
                                      style={{ marginLeft: "5px" }}
                                      color="success"
                                      onClick={() => {
                                        openStudentChat(
                                          row["groupID"],
                                          row["_id"],
                                          "Reject"
                                        );
                                      }}
                                    />
                                  </TableCell>
                                );
                              }

                              // if (column.id == "chat") {
                              //   return (
                              //     <TableCell
                              //       key={column.id}
                              //       align={column.align}
                              //       className="hash-table-border"
                              //     ></TableCell>
                              //   );
                              // }
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
                <ChatMenu studentGroup={{ _id: _id }} user={user} />
              </div>
            </Backdrop>
          </div>
        ) : (
          ""
        )}

        <BootstrapDialog
          onClose={handleCloseOpenGroupMemberModal}
          aria-labelledby="customized-dialog-title"
          open={openGroupMemberModal}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleCloseOpenGroupMemberModal}
          >
            Group {groupId} : Members
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>SID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Students.filter((std) => {
                    return std !== "";
                  }).map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.uid}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>

                      <TableCell>
                        {Students.indexOf(row) == 0 ? (
                          <div style={{ color: "red" }}>Leader</div>
                        ) : (
                          <div style={{ color: "green" }}>Member</div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </BootstrapDialog>
      </div>
      <div>
        {pageIsLoadig == false && rows.length == 0 ? (
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
