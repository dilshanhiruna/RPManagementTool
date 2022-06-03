import React, { useEffect, useState } from "react";
import Axios from "axios";
import SubmissionCard from "../Common/SubmissionCard";

import { useParams } from "react-router-dom";

export default function ViewSubmission() {
  let [submissions, setsubmissions] = useState([]);
  let [activate, setactivate] = useState([]);
  const API = process.env.REACT_APP_API;
  // id = useParams();

  //get all theaters from the database
  const getAllSubmissions = () => {
    Axios.get(`${API}/AssignmentSubmissions/`).then((res) => {
      setsubmissions(res.data.data);
      console.log(res.data.data);
    });
  };

  //change the visibility
  const changeVisibility = (event, id) => {
    console.log(event.target.checked);
    activate = event.target.checked;
    console.log(activate);
    const data = {
      sVisibility: activate,
    };
    Axios.put(`${API}/AssignmentSubmissions/visibility/${id}`, data).then(
      (res) => {
        getAllSubmissions();
      }
    );
  };
  useEffect(() => {
    getAllSubmissions();
  }, []);

  return (
    <div>
      <div>
        {submissions.map((submission) => {
          return (
            <SubmissionCard
              id={submission._id}
              submissionName={submission.submissionName}
              sType={submission.sType}
              sDescription={submission.sDescription}
              sDeadline={submission.sDeadline}
              sTemplate={submission.sTemplate}
              sMarkingScheme={submission.sMarkingScheme}
              sVisibility={submission.sVisibility}
              changeVisibility={changeVisibility}
              getAllSubmissions={getAllSubmissions}
              btn1="Update"
              btn2="Delete"
            />
          );
        })}
      </div>
    </div>
  );
}
