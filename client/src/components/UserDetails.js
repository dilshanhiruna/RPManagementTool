import React, { Component } from 'react';
import axios from 'axios';

export default class UserDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user:{}
    };
  }

  componentDidMount() {
  const id = this.props.match.params.id;

    axios.get(`/user/${id}`).then((res) => {
      if(res.data.success) {
        this.setState({
          user: res.data.user
        });

        console.log(this.state.user);
      }
    });
  }

  render() {
    const {uid, name, staffType, role, interestedResearchField, studentGrouped, studentGroupID, email} = this.state.user;

    return (
      <div style={{marginTop:'30px'}}>
        <h3>{name}</h3>
        <hr/>

        <dl className="row">
          <dt className="col-sm-3">UID</dt>
          <dd className="col-sm-9">{uid}</dd>

          <dt className="col-sm-3">Type</dt>
          <dd className="col-sm-9">{staffType}</dd>

          <dt className="col-sm-3">Role</dt>
          <dd className="col-sm-9">{role}</dd>

          <dt className="col-sm-3">Interested Research Field</dt>
          <dd className="col-sm-9">{interestedResearchField}</dd>

          <dt className="col-sm-3">Student Grouped</dt>
          <dd className="col-sm-9">{studentGrouped}</dd>

          <dt className="col-sm-3">Student Group ID</dt>
          <dd className="col-sm-9">{studentGroupID}</dd>

          <dt className="col-sm-3">Email</dt>
          <dd className="col-sm-9">{email}</dd>
        </dl>
          
      </div>
    )
  }
}
