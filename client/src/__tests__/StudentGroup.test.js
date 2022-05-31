import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateGroup from "../components/StudentGroup/CreateGroup";

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

// CreateGroup.js
test("Display user's name on the create group members chips", async () => {
  render(<CreateGroup user={user} />);
  const name = screen.getByText(/Andaraweera D.H./i);
  expect(name).toBeInTheDocument();
});
