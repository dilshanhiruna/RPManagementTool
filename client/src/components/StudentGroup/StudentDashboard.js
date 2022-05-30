import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import "./StudentDashboard.css";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import TextSnippetRoundedIcon from "@mui/icons-material/TextSnippetRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { Chip, Container, Divider, Skeleton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Submissions from "./Submissions";
import ChatMenu from "./ChatMenu";

// paper card for student dashboard
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// paper card for student card
const ItemStudent = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function StudentDashboard({ user }) {
  const API = process.env.REACT_APP_API;
  const [studentGroup, setStudentGroup] = useState([]);
  const [Students, setStudents] = useState([]);
  const [Student, setStudent] = useState([]);
  const [SelectedStudent, setSelectedStudent] = useState("");

  const [activeStep, setactiveStep] = useState(0);
  const [openGroupMemberModal, setOpenGroupMemberModal] = useState(false);

  const [RemoveMember, setRemoveMember] = useState(false);
  const [SelectedMemeberRemove, setSelectedMemeberRemove] = useState("");

  const [Loading, setLoading] = useState(true);

  const [addingMemberLoading, setaddingMemberLoading] = useState(false);

  // get student group details
  const fetchStudentGroup = async () => {
    try {
      axios.get(`${API}/studentgroups/${user.studentGroupID}`).then((res) => {
        setStudentGroup(res.data.data);

        //set all students into a array
        let studentGroup = res.data.data;

        setStudents([
          studentGroup.student1,
          studentGroup.student2 ? studentGroup.student2 : "",
          studentGroup.student3 ? studentGroup.student3 : "",
          studentGroup.student4 ? studentGroup.student4 : "",
        ]);

        if (
          studentGroup.researchTopic !== "" &&
          isNaN(studentGroup.researchTopic)
        ) {
          setactiveStep(1);
        }
        if (studentGroup.supervisorStatus === "accepted") {
          setactiveStep(2);
        }
        if (studentGroup.cosupervisorStatus === "accepted") {
          setactiveStep(3);
        }
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // fetch student group details
    fetchStudentGroup();
  }, []);

  // get students by wildcards
  const fetchStudentsByKeyword = async (keyword) => {
    if (keyword.length < 3) {
      return;
    }
    try {
      const response = await axios.get(`${API}/users/students/${keyword}`);
      setStudent(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // add student to group
  const addStudent = () => {
    if (!SelectedStudent) {
      return;
    }
    setaddingMemberLoading(true);
    axios
      .put(`${API}/studentgroups/${user.studentGroupID}`, { SelectedStudent })
      .then((res) => {
        //reset states
        setaddingMemberLoading(false);
        fetchStudentGroup();
        setSelectedStudent("");
        setStudent([]);
      });
  };

  // remove student from group
  const removeStudent = () => {
    if (SelectedMemeberRemove === "") {
      return;
    }
    //get object number in array by the student id
    let studentNo = Students.findIndex(
      (student) => student._id === SelectedMemeberRemove
    );

    axios
      .delete(
        `${API}/studentgroups/${
          user.studentGroupID
        }/${SelectedMemeberRemove}/student${studentNo + 1}`
      )
      .then((res) => {
        //fetches student group details again
        fetchStudentGroup();
      });
    console.log(studentNo);
  };

  const steps = [
    "Create Group",
    "Topic Registration",
    "Supervisor",
    "Co-Supervisor",
  ];

  const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#784af4",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  }));
  function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }
  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
  };

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    }),
  }));
  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <GroupsRoundedIcon />,
      2: <TextSnippetRoundedIcon />,
      3: <PersonRoundedIcon />,
      4: <PersonRoundedIcon />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }
  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
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

  const handleClickOpenGroupMemberModal = () => {
    setOpenGroupMemberModal(true);
  };
  const handleCloseOpenGroupMemberModal = () => {
    setOpenGroupMemberModal(false);
  };

  // show group memebr remove dialog
  const handleClickOpenRemoveMember = () => {
    setRemoveMember(true);
  };

  const handleCloseRemoveMember = () => {
    setRemoveMember(false);
  };

  // for displaying avartars
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xfff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return !Loading ? (
    <div className="student__dashboard">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item
              sx={{
                height: "120vh",
              }}
            >
              <Autocomplete
                disabled={
                  Students.filter((stu) => {
                    return stu !== "";
                  }).length >= 4
                }
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(option) => option.name}
                onInputChange={(event, value) => {
                  fetchStudentsByKeyword(value);
                }}
                onChange={(event, value) => {
                  if (value) {
                    setSelectedStudent(value._id);
                  }
                }}
                //disable who are already in a group
                getOptionDisabled={(option) => option.studentGrouped === true}
                options={Student}
                renderInput={(params) => (
                  <TextField {...params} label="Student" />
                )}
                isOptionEqualToValue={(option, value) => {
                  return option.name === value.name;
                }}
              />
              <Button
                disabled={
                  addingMemberLoading ||
                  Students.filter((stu) => {
                    return stu !== "";
                  }).length >= 4
                }
                variant="contained"
                sx={{
                  marginTop: "5px",
                  marginBottom: "30px",
                  width: "100%",
                }}
                onClick={() => {
                  addStudent();
                }}
              >
                {addingMemberLoading ? "Adding..." : "   Add Member"}
              </Button>

              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  marginLeft: "20px",
                }}
              >
                <div>
                  <AvatarGroup max={4}>
                    {Students.filter((std) => {
                      return std !== "";
                    }).map((row, key) => (
                      <Avatar
                        key={key}
                        {...stringAvatar(row.name)}
                        // sx={{ width: 56, height: 56 }}
                      />
                    ))}
                  </AvatarGroup>
                </div>
                <div>
                  <Chip
                    label=" Show Members"
                    style={{ margin: "7px" }}
                    onClick={handleClickOpenGroupMemberModal}
                  />
                </div>
              </div>

              <div>
                <Divider sx={{ marginTop: "25px" }} />
                <h1>Group Chat</h1>
                <ChatMenu studentGroup={studentGroup} user={user} />
              </div>

              <BootstrapDialog
                onClose={handleCloseOpenGroupMemberModal}
                aria-labelledby="customized-dialog-title"
                open={openGroupMemberModal}
              >
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={handleCloseOpenGroupMemberModal}
                >
                  Your Group Members
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>SID</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Action</TableCell>
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
                              <Button
                                //hide the button if your are no the  leader
                                hidden={studentGroup.student1._id !== user._id}
                                disabled={row._id === user._id}
                                size="small"
                                // sx={{
                                //   backgroundColor: "#fff",
                                //   textTransform: "none",
                                // }}
                                color="error"
                                onClick={() => {
                                  handleClickOpenRemoveMember();
                                  setSelectedMemeberRemove(row._id);
                                }}
                              >
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Dialog
                    open={RemoveMember}
                    onClose={handleCloseRemoveMember}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Remove Group Member"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure you want to remove this member from your
                        group?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseRemoveMember}>
                        Disagree
                      </Button>
                      <Button
                        onClick={() => {
                          removeStudent();
                          handleCloseRemoveMember();
                        }}
                        autoFocus
                        color="error"
                      >
                        Agree
                      </Button>
                    </DialogActions>
                  </Dialog>
                </DialogContent>
              </BootstrapDialog>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item
              sx={{
                height: "120vh",
              }}
            >
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector />}
                sx={{ marginTop: "25px", marginBottom: "25px" }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Divider />
              <div style={{ margin: "20px", marginLeft: "50px" }}>
                <Submissions studentGroup={studentGroup} />
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  ) : (
    <>
      <div className="student__dashboard">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item
                sx={{
                  height: "120vh",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  height={50}
                  sx={{
                    marginBottom: "10px",
                  }}
                />

                <Skeleton variant="rectangular" height={40} />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    marginLeft: "20px",
                  }}
                >
                  <div>
                    <Skeleton
                      height={60}
                      sx={{
                        marginRight: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <AvatarGroup max={4}>
                        <Avatar />
                        <Avatar />
                        <Avatar />
                        <Avatar />
                        <Avatar />
                      </AvatarGroup>
                    </Skeleton>
                  </div>
                  <div>
                    <Skeleton
                      height={60}
                      sx={{
                        marginTop: "10px",
                      }}
                    >
                      <Chip label=" Show Members" style={{ margin: "7px" }} />
                    </Skeleton>
                  </div>
                </div>
                <div>
                  <div style={{ textAlign: "left", margin: "25px" }}>
                    <Skeleton variant="text" height={70} alignItems="center" />
                  </div>
                  <Skeleton variant="rectangular" height={590} />
                  <br />
                  <Skeleton variant="rectangular" height={50} />
                </div>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item
                sx={{
                  height: "120vh",
                }}
              >
                <Skeleton height={100} />
                <Divider />
                <div style={{ margin: "20px", marginLeft: "70px" }}>
                  <Skeleton variant="text" width={300} height={30} />
                  <Skeleton variant="text" width={270} height={30} />
                  <Skeleton variant="text" width={310} height={30} />
                  <Skeleton variant="text" width={320} height={30} />
                  <Skeleton variant="text" width={300} height={30} />
                </div>
                <Divider />
                <div style={{ marginLeft: "70px" }}>
                  <Skeleton variant="text" width={300} height={70} />
                  <div>
                    <Skeleton
                      variant="rectangle"
                      width={"99%"}
                      height={160}
                      sx={{
                        marginBottom: "10px",
                      }}
                    />
                    <Skeleton
                      variant="rectangle"
                      width={"99%"}
                      height={160}
                      sx={{
                        marginBottom: "10px",
                      }}
                    />
                    <Skeleton
                      variant="rectangle"
                      width={"99%"}
                      height={160}
                      sx={{
                        marginBottom: "10px",
                      }}
                    />
                  </div>
                </div>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
