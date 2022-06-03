import React, { Component } from 'react'
import axios from 'axios'

export default class EditUser extends Component {

  constructor(props){
    super(props);
    this.state={
      uid:"",
      name:"",
      staffType:"",
      role:"",
      interestedResearchField:"",
      studentGrouped:"",
      studentGroupID:"",
      email:""
    }
  }

  handleInputChange = (e) => {
    const {name,value} = e.target;

    this.setState({
      ...this.state,
      [name]:value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;

    const {uid, name, staffType, role, interestedResearchField, studentGrouped, studentGroupID, email} = this.state;

    const data = {
      uid:uid,
      name:name,
      staffType:staffType,
      role:role,
      interestedResearchField:interestedResearchField,
      studentGrouped:studentGrouped,
      studentGroupID:studentGroupID,
      email:email
    }

    console.log(data)

    axios.put(`/user/update/${id}`, data).then((res) => {
      if(res.data.success) {
        alert("Successfully updated the user")
        this.setState(
          {
            uid:"",
            name:"",
            staffType:"",
            role:"",
            interestedResearchField:"",
            studentGrouped:"",
            studentGroupID:"",
            email:""
          }
        )
      }
    })
  }

  componentDidMount() {
    const id = this.props.match.params.id;
  
      axios.get(`/user/${id}`).then((res) => {
        if(res.data.success) {
          this.setState({
            uid:res.data.user.uid,
            name:res.data.user.name,
            staffType:res.data.user.staffType,
            role:res.data.user.role,
            interestedResearchField:res.data.user.interestedResearchField,
            studentGrouped:res.data.user.studentGrouped,
            studentGroupID:res.data.user.studentGroupID,
            email:res.data.user.email
          });
  
          console.log(this.state.user);
        }
      });
    }

  render() {
    return (
      <div className="col-md-8 mt-4 ma-auto">
        <h1 className="h3 mb-3 font-weight-normal">Update User Details</h1>
        <form className="needs-validation" noValidate>
        <div className="form-group" style={{marginBottom:'20px'}}>
            <label style={{marginBottom:'6px'}}>UID</label>
            <input type="text"
            className="form-control"
            name="uid"
            placeholder="Enter UID"
            value={this.state.uid}
            onChange={this.handleInputChange}/>
          </div>
          <div className="form-group" style={{marginBottom:'20px'}}>
            <label style={{marginBottom:'6px'}}>Name</label>
            <input type="text"
            className="form-control"
            name="name"
            placeholder="Enter name"
            value={this.state.name}
            onChange={this.handleInputChange}/>
          </div>

          <div className="form-group" style={{marginBottom:'20px'}}>
            <label style={{marginBottom:'6px'}}>Type</label>
            <input type="text"
            className="form-control"
            name="staffType"
            placeholder="Enter type"
            value={this.state.staffType}
            onChange={this.handleInputChange}/>
          </div>

          <div className="form-group" style={{marginBottom:'20px'}}>
            <label style={{marginBottom:'6px'}}>Role</label>
            <input type="text"
            className="form-control"
            name="role"
            placeholder="Enter role"
            value={this.state.role}
            onChange={this.handleInputChange}/>
          </div>
        </form>

        <div className="form-group" style={{marginBottom:'20px'}}>
            <label style={{marginBottom:'6px'}}>Interested Research Field</label>
            <input type="text"
            className="form-control"
            name="interestedResearchField"
            placeholder="Enter interested research field"
            value={this.state.interestedResearchField}
            onChange={this.handleInputChange}/>
          </div>

          <div className="form-group" style={{marginBottom:'20px'}}>
            <label style={{marginBottom:'6px'}}>Student Grouped</label>
            <input type="text"
            className="form-control"
            name="studentGrouped"
            placeholder="Enter student grouped"
            value={this.state.studentGrouped}
            onChange={this.handleInputChange}/>
          </div>

          <div className="form-group" style={{marginBottom:'20px'}}>
            <label style={{marginBottom:'6px'}}>Student Group ID</label>
            <input type="text"
            className="form-control"
            name="studentGroupID"
            placeholder="Enter student group ID"
            value={this.state.studentGroupID}
            onChange={this.handleInputChange}/>
          </div>

          <div className="form-group" style={{marginBottom:'20px'}}>
            <label style={{marginBottom:'6px'}}>Email</label>
            <input type="text"
            className="form-control"
            name="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleInputChange}/>
          </div>

          <button className="btn btn-success" type="submit" style={{marginTop:'20px'}} onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
            &nbsp; Update User 
          </button>
          
      </div>
    )
  }
}
