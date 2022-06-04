import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import "../setupTests";
import CreateSubmission from "../components/AssignmentSubmission/CreateSubmission";
import UpdateSubmission from "../components/AssignmentSubmission/UpdateSubmission";
import SubmissionCard from "../components/Common/SubmissionCard";
import ViewSubmission from "../components/AssignmentSubmission/ViewSubmission";

const submission = [
  {
    submissionName: "Project Proposal",
    sType: "Presentation",
    sDescription:
      "Project Proposal – both softcopy and hardcopy need to submit • A hard copy of the Proposal document needs to submit at the time of the proposal presentation     • Total presentation time 40 minutes. •  All the members should present and the panel will ask questions from each member Q and A - 20 minutes",
    sTemplate: [],
    sDeadline: "2022-06-17T17:34:37.000+00:00",
    sVisibility: true,
    sMarkingScheme: [],
    id: "629876365a605575e4d0d63a",
  },
];
//view submission card
describe("CreateSubmission", () => {
  test("should render submissioncard component", () => {
    render(<SubmissionCard />);
    const SubmissionCardElement = screen.getByTestId(
      "629876365a605575e4d0d63a"
    );
    //assertion
    expect(SubmissionCardElement).toBeInTheDocument;
  });
});
// // CreateSubmission.js
describe("CreateSubmission", () => {
  test("Check whether alerts works when passing the incorrect data", async () => {
    render(<CreateSubmission />);
    const btn = screen.getByRole("button", { name: "Create Submission" });
    fireEvent.click(btn);
    const id = screen.getByText(/Error, please filled the required details!/i);
    expect(id).toBeInTheDocument();
  });
});
// ViewSubmission.js
describe("ViewSubmission", () => {
  it("should render ViewSubmission component", async () => {
    render(<ViewSubmission />);
    const divElement = screen.getByTestId("RP_IT4010");
    //assertion
    expect(divElement).toBeInTheDocument;
  });
});

test("should render CreateSubmission component and display alert", async () => {
  render(<CreateSubmission />);
  const divElement = screen.getByTestId("create_submission");
  //assertion
  expect(divElement).toBeInTheDocument;
});
