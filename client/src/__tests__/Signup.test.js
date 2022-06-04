import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import "../setupTests";
import Signup from "../components/Signup/index";

const registration = [
  {
    uid: "IT19999955",
    name: "John Doe",
    staffType: "Student",
    role: "Student",
    interestedResearchField: "None",
    studentGrouped: "None",
    studentGroupID: "None",
    email: "it19999955@my.sliit.lk",
    password: "JohnDoe@12345",
  },
];

//Register new user
describe("Signup", () => {
  test("Check whether alerts works when user gives an email of an existing user", async () => {
    render(<Signup />);
    const btn = screen.findOne("button", { name: "Signup" });
    fireEvent.click(btn);
    const id = screen.getByText(/Error, User already exists!/i);
    expect(id).toBeInTheDocument();
  });
});

test("Should render Signup component and display alert", async () => {
  render(<Signup />);
  const divElement = screen.getByTestId("signup");
  //assertion
  expect(divElement).toBeInTheDocument;
});