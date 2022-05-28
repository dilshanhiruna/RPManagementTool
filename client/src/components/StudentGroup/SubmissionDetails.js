import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
export default function SubmissionDetails() {
  const location = useLocation();
  const [submissionDetails, setSubmissionDetails] = useState(
    location.submission
  );
  return (
    <>
      <div> submission details</div>
      <div> {submissionDetails.submissionName}</div>
      <div> {submissionDetails.sType}</div>
      <div> {submissionDetails.sDescription}</div>
      <div> {submissionDetails.sTemplate}</div>
      <div> {submissionDetails.sMarkingScheme}</div>
      <div> {submissionDetails.sDeadline}</div>
    </>
  );
}
