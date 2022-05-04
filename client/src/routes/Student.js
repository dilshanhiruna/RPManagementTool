import React from "react";
import NewStudentMenu from "../components/StudentGroup/NewStudentMenu";
import CreateGroup from "../components/StudentGroup/CreateGroup";

export default function Student() {
  return (
    <div className="student__dashboard">
      {/* <NewStudentMenu /> */}
      <CreateGroup />
    </div>
  );
}
