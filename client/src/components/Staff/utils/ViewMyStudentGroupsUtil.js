import { styled, Dialog, DialogTitle, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
//table columns
export const columns = [
  { id: "groupID", label: "Group ID", minWidth: 70, align: "center" },
  { id: "reTopic", label: "Research Topic", minWidth: 100, align: "center" },

  { id: "role", label: "Your Role", minWidth: 100, align: "center" },
  {
    id: "students",
    label: "Members",
    minWidth: 140,
    align: "center",
  },
];

//function to create obj from server response
export const createObjResponse = (res, data) => {
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
export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// create BootstrapDialogTitle component to display group name on chat
export const BootstrapDialogTitle = (props) => {
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
