import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AlertTitle } from "@mui/material";
import { columns as sup_cosup } from "../Staff/utils/sup-cosupRequestUtil";
import { columns as vmsg } from "../Staff/utils/ViewMyStudentGroupsUtil";
import { columns as vss } from "../Staff/utils/viewStudentSubmissionsUtil";
import { columns as trfp } from "../Staff/Panel-Member/utils/TopicRequrestsForPanelUtil";
import { columns as vssp } from "../Staff/Panel-Member/utils/ViewStudentSubmissionsPanelUtil";

export default function NoData({ msg, type }) {
  console.log("..........................");
  console.log(type);
  console.log("..........................");
  //get columns based on type props
  let columns = [];
  switch (type) {
    case "sup_cosup":
      columns = sup_cosup;
      break;
    case "vmsg":
      columns = vmsg;
      break;
    case "vss":
      columns = vss;
      break;
    case "trfp":
      columns = trfp;
      break;
    case "vssp":
      columns = vssp;
      break;
    default:
      break;
  }
  return (
    <>
      <Paper sx={{ width: "100%", marginBottom: 15 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    // className="hash-table-border"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell colSpan={100}>
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">
                      <AlertTitle>
                        {" "}
                        <strong>OOPS!</strong>
                      </AlertTitle>
                      <strong>{msg}</strong>
                    </Alert>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
