//table columns
export const columns = [
  { id: "groupID", label: "Group ID", minWidth: 70, align: "center" },
  { id: "reTopic", label: "Research Topic", minWidth: 100, align: "center" },

  { id: "role", label: "Your Role", minWidth: 100, align: "center" },
  {
    id: "students",
    label: "Members",
    minWidth: 140,
    align: "center",
  },
];

//function to create obj from server response
export const createObjResponse = (res, data) => {
  const studentsArray = [
    data.student1,
    data.student2 ? data.student2 : "",
    data.student3 ? data.student3 : "",
    data.student4 ? data.student4 : "",
  ];

  let obj = {
    _id: data._id,
    groupID: data.groupID,
    reTopic: data.researchTopic,
    role: res.data.type,
    students: studentsArray,
  };
  return obj;
};
