import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import "../setupTests";
import CreateGroup from "../components/StudentGroup/CreateGroup";
import TopicReg from "../components/StudentGroup/TopicReg";
import Submissions from "../components/StudentGroup/Submissions";

const user = {
  _id: "628a4cd9c334a17636b35847",
  uid: "IT19963884",
  name: "Andaraweera D.H.",
  email: "it19963884@my.sliit.lk",
  password: "password",
  role: "student",
  interestedResearchField: null,
  staffType: null,
  studentGrouped: true,
  studentGroupID: "628e55274a2760fe44048084",
};

const group = {
  _id: { $oid: "628e55274a2760fe44048084" },
  student1: { $oid: "628a4cd9c334a17636b35847" },
  student2: { $oid: "628a4d79c334a17636b35848" },
  student3: { $oid: "628a4db1c334a17636b3584a" },
  student4: { $oid: "628a4d9ec334a17636b35849" },
  groupID: "SE3040",
  groupClosed: null,
  researchTopic:
    "Evaluating factors that predispose aging Covid patients to more severe complications",
  topicFeedback: {
    approveOrReject: "Approved",
    feedback:
      "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien in",
  },
  topicDetailDocument: null,
  supervisor: { $oid: "628d0363cec8f51cfb6dd746" },
  supervisorStatus: "accepted",
  cosupervisorStatus: "accepted",
  cosupervisor: { $oid: "628d0363cec8f51cfb6dd74b" },
  panelmember: { $oid: "628d0363cec8f51cfb6dd746" },
  createdDate: { $date: { $numberLong: "1653495079946" } },
  __v: 0,
};

const students = [
  {
    _id: "628a4cd9c334a17636b35847",
    uid: "IT19963884",
    name: "Andaraweera D.H. ",
    email: "it19963884@my.sliit.lk",
    password: "password",
    role: "student",
    interestedResearchField: null,
    staffType: null,
    studentGrouped: true,
    studentGroupID: "6297726c8d052da2d3ad4c5b",
  },
  {
    _id: "628a4cd9c334a17636b35847",
    uid: "IT19963884",
    name: "Andaraweera D.H. ",
    email: "it19963884@my.sliit.lk",
    password: "password",
    role: "student",
    interestedResearchField: null,
    staffType: null,
    studentGrouped: true,
    studentGroupID: "6297726c8d052da2d3ad4c5b",
  },
  {
    _id: "628a4cd9c334a17636b35847",
    uid: "IT19963884",
    name: "Andaraweera D.H. ",
    email: "it19963884@my.sliit.lk",
    password: "password",
    role: "student",
    interestedResearchField: null,
    staffType: null,
    studentGrouped: true,
    studentGroupID: "6297726c8d052da2d3ad4c5b",
  },
  {
    _id: "628a4cd9c334a17636b35847",
    uid: "IT19963884",
    name: "Andaraweera D.H. ",
    email: "it19963884@my.sliit.lk",
    password: "password",
    role: "student",
    interestedResearchField: null,
    staffType: null,
    studentGrouped: true,
    studentGroupID: "6297726c8d052da2d3ad4c5b",
  },
];

// CreateGroup.js
describe("CreateGroup", () => {
  it("Display user's name on the create group members chips", async () => {
    render(<CreateGroup user={user} />);
    const name = screen.getByText(/Andaraweera D.H./i);
    expect(name).toBeInTheDocument();
  });

  it("Check whether alerts works if grp id is empty in create group", async () => {
    render(<CreateGroup user={user} />);
    const btn = screen.getByRole("button", { name: "ADD" });
    fireEvent.click(btn);
    const groupID = screen.getByText(/Error, please check again!/i);
    expect(groupID).toBeInTheDocument();
  });
});

describe("TopicReg", () => {
  it("Check whether tilte change is there is a topic", async () => {
    render(<TopicReg user={user} testLoad={false} testTopic="sdfsd" />);

    const title = screen.getByText(/Update Your Topic/i);
    expect(title).toBeInTheDocument();
  });
  it("Check whether tilte change is there isn't topic", async () => {
    render(<TopicReg user={user} testLoad={false} testTopic="" />);

    const title = screen.getByText(/Topic Registration/i);
    expect(title).toBeInTheDocument();
  });
  it("Check where the error alert", async () => {
    render(<TopicReg user={user} testLoad={false} testTopic="" />);

    const btn = screen.getByRole("button", { name: "Submit Topic" });
    fireEvent.click(btn);
    const error = screen.getByText(/Error, please check your topic again!/i);
    expect(error).toBeInTheDocument();
  });
});

describe("Student Dashboard", () => {
  it("Check group details are showing in the dashboard", async () => {
    render(<Submissions studentGroup={group} />);

    const groupID = screen.getByText(/SE3040/i);
    expect(groupID).toBeInTheDocument();

    const groupClosed = screen.getByText(/View Feedback/i);
    expect(groupClosed).toBeInTheDocument();

    const title = screen.getByText(
      /Evaluating factors that predispose aging Covid patients to more severe complications/i
    );
    expect(title).toBeInTheDocument();
  });
});
