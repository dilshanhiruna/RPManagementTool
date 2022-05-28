import React, { useEffect, useState } from "react";
import Axios from "axios";
import SubmissionCard from "../Common/SubmissionCard";

export default function ViewSubmission() {
  const [submissions, setsubmissions] = useState([]);
  const API = process.env.REACT_APP_API_SUBMISSIONS;

  //get all theaters from the database
  const getAllSubmissions = () => {
    Axios.get(`${API}/AssignmentSubmissions/`).then((res) => {
      setsubmissions(res.data.data);
      console.log(res.data.data);
      submissions.map((submission) => {});
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
              key={submission._id.toString()}
              submissionName={submission.submissionName}
              sType={submission.sType}
              sDescription={submission.sDescription}
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
