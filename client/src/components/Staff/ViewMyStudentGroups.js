import { useEffect, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import axios, { Axios } from "axios";
import ChatIcon from "@mui/icons-material/Chat";
import {
  Button,
  DialogContent,
  Backdrop,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  LinearProgress,
} from "@mui/material";
import "./SupervisorDashboard.css";
import ChatMenu from "../StudentGroup/ChatMenu";
import { columns, createObjResponse } from "./utils/ViewMyStudentGroupsUtil";

import {
  BootstrapDialog,
  BootstrapDialogTitle,
} from "./utils/StudentDetailsPopUp";

const API = process.env.REACT_APP_API;

export default function ViewMyStudentGroups({ user }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [pageIsLoadig, setPageIsLoading] = useState(true);
  const [openGroupMemberModal, setOpenGroupMemberModal] = useState(false);
  const [Students, setStudents] = useState([]);
  const [groupId, setGroupId] = useState();
  const [_id, set_id] = useState();

  //calling server endpoint through use effect hook
  useEffect(() => {
    getMyGroups();
  }, []);

  //function to get student groups of supervior and cosupervisor
  const getMyGroups = async () => {
    try {
      let objArray = [];

      //get groups you supervise
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
      //get groups you co-supervise
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

  //function to open relevant student group chat
  const openStudentChat = (groupId, _id, action) => {
    handleToggle();
    setGroupId(groupId);
    set_id(_id);
    // setAction(action);
  };
  //suppoert functions for chat modal
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleToggle = () => {
    setOpenBackdrop(!openBackdrop);
  };

  //functions to handle table pagination
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
            <h1 className="centerItems">Your Groups </h1>
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
                                  >
                                    <Button
                                      onClick={() => {
                                        handleClickOpenGroupMemberModal(
                                          row["groupID"],
                                          row["students"]
                                        );
                                      }}
                                    >
                                      view
                                    </Button>

                                    <IconButton
                                      color="success"
                                      onClick={() => {
                                        openStudentChat(
                                          row["groupID"],
                                          row["_id"],
                                          "Reject"
                                        );
                                      }}
                                    >
                                      <ChatIcon />
                                    </IconButton>
                                  </TableCell>
                                );
                              }
                              return (
                                <TableCell key={column.id} align={column.align}>
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
