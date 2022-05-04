import React from "react";
import "./NewStudentMenu.css";
import MediaCard from "../Common/MediaCard";

export default function NewStudentMenu() {
  return (
    <div className="newstudent__dashboard">
      <div>
        <MediaCard
          title="Create Group"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique neque vel odio vulputate luctus. Nam id bibendum metus. Mauris id eros lacinia lorem condimentum blandit at tincidunt sem. In sodales mattis dolor"
          btn1="Create"
          btn2="Learn More"
          image={require("../../assets/images/createGroup.png")}
        />
      </div>
      <div style={{ marginLeft: "30px" }}>
        <MediaCard
          title="Join Group"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique neque vel odio vulputate luctus. Nam id bibendum metus. Mauris id eros lacinia lorem condimentum blandit at tincidunt sem. In sodales mattis dolor"
          btn1="Join "
          btn2="Learn More"
          image={require("../../assets/images/joinGroup.png")}
        />
      </div>
    </div>
  );
}
