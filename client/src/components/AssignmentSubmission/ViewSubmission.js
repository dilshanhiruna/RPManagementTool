import React, { useEffect, useState } from "react";
import Axios from "axios";
import SubmissionCard from "../Common/SubmissionCard";
import { useParams } from "react-router-dom";

export default function ViewSubmission() {
  const [submissions, setsubmissions] = useState([]);
  const API = process.env.REACT_APP_API;
  // id = useParams();

  //get all theaters from the database
  const getAllSubmissions = () => {
    Axios.get(`${API}/AssignmentSubmissions/`).then((res) => {
      setsubmissions(res.data.data);
    });
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
              sVisisbility={submission.sVisibility}
              btn1="Update"
              btn2="Delete"
            />
          );
        })}
      </div>
    </div>
  );
}
