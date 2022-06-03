export const columns = [
  { id: "groupID", label: "Group ID", minWidth: 100, align: "center" },

  {
    id: "topic",
    label: "Research Topic",
    minWidth: 100,
    align: "center",
  },

  {
    id: "submission",
    label: "Topic Details File",
    minWidth: 100,
    align: "center",
  },
  {
    id: "submittedOn",
    label: "Submitted On",
    minWidth: 100,
    align: "center",
  },
  {
    id: "marks",
    minWidth: 100,
    align: "center",
  },
];

//function to create obj from server response
export const createObjResponse = (res, data) => {
  if (!data.submissionDetailsId || !data.studentGroupId) {
    return null;
  }
  let obj = {
    _id: data._id,
    groupObjectID: data.studentGroupId._id,
    groupID: data.studentGroupId.groupID,
    topic: data.studentGroupId.researchTopic,
    submittedOn: formatDate(data.submittedOn),
    submission: data.file,
    marks: data.obtainedMarks,
  };
  return obj;
};

//function to format js date
export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
