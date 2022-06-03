import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import "../setupTests";
import StaffHeader from "../components/view/StaffHeader";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

const user = {
  _id: "628d0363cec8f51cfb6dd746",
  uid: "ST22000001",
  name: "Nuwan Kodagoda (SE, HPC, PC,PL, ADD)",
  email: "st22000001@sliit.lk",
  password: "password",
  role: "Staff",
  interestedResearchField: "Artificial Intelligence and Machine Learning",
  staffType: "supervisor",
  studentGrouped: null,
  studentGroupID: null,
};

const createRouterWrapper =
  (history) =>
  ({ children }) =>
    <Router history={history}>{children}</Router>;

describe("Supervisor Header", () => {
  it("Check whether staff portal is displayed when rendering the staff header", async () => {
    render(<StaffHeader userType={user.role} />);
    const portalName = screen.getByText(/Staff Portal/i);
    expect(portalName).toBeInTheDocument();
  });

  it("Check whether navigation to my groups work", () => {
    const history = createMemoryHistory();
    render(<StaffHeader />, { wrapper: createRouterWrapper(history) });
    fireEvent.click(screen.getByText("My Groups"));
    expect(history.location.pathname).toBe("/staff/mygrosups");
  });

  it("Check whether navigation to supervisor topic request work", () => {
    const history = createMemoryHistory();
    render(<StaffHeader />, { wrapper: createRouterWrapper(history) });
    fireEvent.click(screen.getByText("Supervisor Req"));
    expect(history.location.pathname).toBe("/staff/supervisor/topicReq");
  });

  it("Check whether navigation to co - supervisor topic request work", () => {
    const history = createMemoryHistory();
    render(<StaffHeader />, { wrapper: createRouterWrapper(history) });
    fireEvent.click(screen.getByText("Co-Supervisor Req"));
    expect(history.location.pathname).toBe("/staff/cosupervisor/topicReq");
  });

  it("Check whether navigation to student submissions work", () => {
    const history = createMemoryHistory();
    render(<StaffHeader />, { wrapper: createRouterWrapper(history) });
    fireEvent.click(screen.getByText("Submissions"));
    expect(history.location.pathname).toBe("/staff/studentSubmissions");
  });
});
