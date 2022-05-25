import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import './TopicRequests.css';

const API = process.env.REACT_APP_API;

//table columns
const columns = [
  { id: 'groupID', label: 'Group ID', minWidth: 100 },
  { id: 'reTopic', label: 'Research Topic', minWidth: 100 },
  {
    id: 'student1',
    label: 'Students 1',
    minWidth: 100,
  },
  {
    id: 'student2',
    label: 'Student 2',
    minWidth: 100,
  },
  {
    id: 'student3',
    label: 'Student 3',
    minWidth: 100,
  },
  {
    id: 'student4',
    label: 'Student 4',
    minWidth: 100,
  },
  { id: 'accept', label: '', minWidth: 100, align: 'center' },
  { id: 'reject', label: '', minWidth: 100, align: 'center' },
];

export default function TopicRequests({ user }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [studentGroups, setStudentGroups] = useState([]);
  const [rows, setRows] = useState([]);

  //function to get topic requests
  const getTopicReqs = async () => {
    try {
      await axios.get(`${API}/topicRequests/${user._id}`).then((res) => {
        if (res.data.data.length == 0) {
          console.log('No topic reqs');
        } else {
          // res.data.data.forEach((data) => {});
          let objArray = [];
          let student1, student2, student3, student4;

          res.data.data.map((data) => {
            if (data.student1) {
              student1 = data.student1.uid;
            }
            if (data.student2) {
              student2 = data.student2.uid;
            }
            if (data.student3) {
              student3 = data.student3.uid;
            }
            if (data.student4) {
              student4 = data.student4.uid;
            }
            const obj = {
              groupID: data.groupID,
              reTopic: data.researchTopic,
              student1,
              student2,
              student3,
              student4,
            };
            objArray.push(obj);
          });
          setRows(objArray);
        }
      });
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

  return (
    <>
      <div>
        {rows.length != 0 ? (
          <div className="student__dashboard">
            <h1>New Requests</h1>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                              if (column.id == 'accept') {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    className="hash-table-border"
                                  >
                                    <Button color="success">Accept</Button>
                                  </TableCell>
                                );
                              }
                              if (column.id == 'reject') {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    className="hash-table-border"
                                  >
                                    <Button color="error">Reject</Button>
                                  </TableCell>
                                );
                              }
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  className="hash-table-border"
                                >
                                  {column.format && typeof value === 'number'
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
          </div>
        ) : (
          ''
        )}
      </div>
      <div>
        {rows.length == 0 ? (
          <div className="student__dashboard">
            <div>No New Requests avaialable</div>{' '}
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
