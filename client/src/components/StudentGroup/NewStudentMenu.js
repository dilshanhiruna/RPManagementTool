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
          image="https://cdn.dribbble.com/users/1355613/screenshots/7190094/media/50b564fe0f7e3cced8e5aeccb2bd1af0.jpg"
        />
      </div>
      <div style={{ marginLeft: "30px" }}>
        <MediaCard
          title="Join Group"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique neque vel odio vulputate luctus. Nam id bibendum metus. Mauris id eros lacinia lorem condimentum blandit at tincidunt sem. In sodales mattis dolor"
          btn1="Join "
          btn2="Learn More"
          image="https://cdn.dribbble.com/users/1355613/screenshots/7202110/media/7757913c7c52c153be9494f61c007546.jpg"
        />
      </div>
    </div>
  );
}
