import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import "../setupTests";
import PanelmHeader from "../components/view/PanelmHeader";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

const user = {
  _id: "628d0363cec8f51cfb6dd746",
  uid: "ST22000001",
  name: "Vishan Jayasinghearachchi (SE, PL)",
  email: "st22000012@sliit.lk",
  password: "password",
  role: "Staff",
  interestedResearchField: "Artificial Intelligence and Machine Learning",
  staffType: "panelM",
  studentGrouped: null,
  studentGroupID: null,
};

const createRouterWrapper =
  (history) =>
  ({ children }) =>
    <Router history={history}>{children}</Router>;

describe("Panel Member Header", () => {
  it("Check whether staff portal is displayed when rendering the panel member header", async () => {
    render(<PanelmHeader userType={user.role} />);
    const portalName = screen.getByText(/Staff Portal/i);
    expect(portalName).toBeInTheDocument();
  });

  it("Check whether navigation to my groups work", () => {
    const history = createMemoryHistory();
    render(<PanelmHeader />, { wrapper: createRouterWrapper(history) });
    fireEvent.click(screen.getByText("Manage Topics"));
    expect(history.location.pathname).toBe("/staff/panelmember/topicReq");
  });

  it("Check whether navigation to supervisor topic request work", () => {
    const history = createMemoryHistory();
    render(<PanelmHeader />, { wrapper: createRouterWrapper(history) });
    fireEvent.click(screen.getByText("Submissions"));
    expect(history.location.pathname).toBe(
      "/staff/panelmember/studentSubmissions"
    );
  });
});
