import React, { Component } from 'react';
import axios from 'axios';
//import styles from "./Student/styles.module.css";
//import React, { useState } from "react";
import Button from "@mui/material/Button";
//import "./Header.css";
//import Header from "./Supervisor/Header.css";
import { useHistory } from "react-router-dom";

export default class Home extends Component {
constructor(props) {
    super(props);

    this.state = {
        users:[]
    };

}

componentDidMount() {
    this.retrieveUsers();
}

retrieveUsers() {
    axios.get("/users").then(res => {
        if(res.data.success) {
            this.setState({
                users:res.data.existingUsers
            });

            console.log(this.state.users);
        }
    });
}

onDelete = (id) => {
    axios.delete(`/user/delete/${id}`).then((res) => {
        alert("User deleted successfully");
        this.retrieveUsers();
    })
}

filterData(users, searchKey) {
    const result = users.filter((user) =>
        user.uid.toLowerCase().includes(searchKey) ||
        user.name.toLowerCase().includes(searchKey) ||
        user.staffType.toLowerCase().includes(searchKey) ||
        user.role.toLowerCase().includes(searchKey) ||
        user.interestedResearchField.toLowerCase().includes(searchKey) ||
        user.studentGrouped.toLowerCase().includes(searchKey) ||
        user.studentGroupID.toLowerCase().includes(searchKey) ||
        user.email.toLowerCase().includes(searchKey) 
    )

    this.setState({users:result})
}

handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/users").then(res => {
        if(res.data.success) {
            this.filterData(res.data.existingUsers, searchKey)
        }
    });
}


handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
};

  render() {
    return (
      <div className="container">

        {/* <div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Research Project Management System - Admin</h1>
				<button className={styles.white_btn} onClick={this.handleLogout}>
					Logout
				</button>
			</nav>
		</div><br></br><br></br> */}


<header>
        <div className="header__component">
          <div className="header__left">
            <img
              src={require("../assets/images/logo.png")}
              alt=""
              width="50"
              style={{ marginRight: "10px" }}
            />
            <div>
              <p>Research Project Management</p>
              <p>Admin</p>
            </div>
            <div className="header__buttonGroup">
              <Button
                variant="outlined"
                className="header__button"
                // onClick={() => {
                //   history.push("/staff/studentSubmissions");
                // }}
              >
                Submissions
              </Button>
			  <Button
                variant="outlined"
                className="header__button"
                onClick={this.handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
          <div className="header__right">
          </div>
        </div>
      </header><br></br><br></br>

          <div className="row">
              <div className="col-lg-9 mt-2 mb-2">
                  <h3>All Users</h3>
                </div>
                  <div className="col-lg-3 mt-2 mb-2">
                      <input
                      className="form-control"
                      type="search"
                      placeholder="Search user"
                      name="searchQuery"
                      onChange={this.handleSearchArea}>
                      </input>
                    </div>
            </div>

          <table className="table">
              <thead>
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">UID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Type</th>
                      <th scope="col">Role</th>
                      <th scope="col">Interested Research Field</th>
                      <th scope="col">Student Grouped</th>
                      <th scope="col">Student Group ID</th>
                      <th scope="col">Email</th>
                      <th scope="col">Actions</th>
                  </tr>
              </thead>

              <tbody>
                  {this.state.users.map((users, index) =>(
                      <tr key={index}>
                          <th scope="row">{index+1}</th>
                          <td>{users.uid}</td>
                          <td>
                              <a href={`/user/${users._id}`} style={{textDecoration:'none'}}>
                            {users.name}
                              </a>
                          </td>
                          <td>{users.staffType}</td>
                          <td>{users.role}</td>
                          <td>{users.interestedResearchField}</td>
                          <td>{users.studentGrouped}</td>
                          <td>{users.studentGroupID}</td>
                          <td>{users.email}</td>
                          <td>
                              <a className="btn btn-warning" href={`/edit/${users._id}`}>
                                  <i className="fas fa-edit"></i>&nbsp;Edit
                              </a>
                              &nbsp;
                              <a className="btn btn-danger" href="#" onClick={() => this.onDelete(users._id)}>
                                  <i className="far fa-trash-alt"></i>&nbsp;Delete
                              </a>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
        
        {/* <button className="btn btn-success"><a href="/add" style={{textDecoration:'none', color:'white'}}>Add New User</a></button> */}

      </div>
    )
  }
}
