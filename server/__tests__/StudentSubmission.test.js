const server = require("../server.js");
const request = require("supertest");

let studentDcomunetSubmission_id = null;
let studentPresentationSubmission_id = null;

describe("POST /api/v1/studentSubmission", () => {
  let response = null;
  //create a new student submission of type document
  it("create a new student document submission", async () => {
    const response1 = await request(server)
      .post("/api/v1/studentSubmission")
      .send({
        file: {
          name: "sample_file_name",
          base64: "sample_file_string",
        },
        submissionDetailsId: "6299eefa13314ed33c7563e9",
        studentGroupId: "628e55274a2760fe44048084",
      });
    expect(response1.status).toBe(200);
  }, 30000);

  //create a new student submission of type presentation
  it("create a new student presenation submission", async () => {
    const response2 = await request(server)
      .post("/api/v1/studentSubmission")
      .send({
        file: {
          name: "sample_file_name",
          base64: "sample_file_string",
        },
        submissionDetailsId: "6299f85b13314ed33c7563ee",
        studentGroupId: "628e55274a2760fe44048084",
      });
    expect(response2.status).toBe(200);
  }, 30000);

  //get a specific student submission (document)
  it("get created student document submission", async () => {
    const response3 = await request(server)
      .post("/api/v1/studentSubmission/getSpecific")
      .send({
        submissionDetailsId: "6299eefa13314ed33c7563e9",
        studentGroupId: "628e55274a2760fe44048084",
      });
    expect(response3.status).toBe(200);
    studentDcomunetSubmission_id = response3.body.data._id;
  }, 30000);

  //get a specific student submission (presentation)
  it("get created student presenation submission", async () => {
    const response4 = await request(server)
      .post("/api/v1/studentSubmission/getSpecific")
      .send({
        submissionDetailsId: "6299f85b13314ed33c7563ee",
        studentGroupId: "628e55274a2760fe44048084",
      });
    expect(response4.status).toBe(200);
    studentPresentationSubmission_id = response4.body.data._id;
  }, 30000);

  //get student submissions for a specific supervisor
  it("get student submissions (documents) for a specific supervisor", async () => {
    const response5 = await request(server).get(
      "/api/v1/studentSubmission/staff/628d0363cec8f51cfb6dd746"
    );
    expect(response5.status).toBe(200);
  }, 30000);

  //get student submissions for a specific panel member
  it("get student submissions (presentations) for a specific panel member", async () => {
    const response6 = await request(server).get(
      "/api/v1/studentSubmission/panel/628d0363cec8f51cfb6dd746"
    );
    expect(response6.status).toBe(200);
  }, 30000);

  //delete student document submission
  it("delete created student document submission", async () => {
    const response7 = await request(server).delete(
      `/api/v1/studentSubmission/${studentDcomunetSubmission_id}`
    );
    expect(response7.status).toBe(200);
  }, 30000);

  //delete student presenation submission
  it("delete created student presentation submission", async () => {
    const response8 = await request(server).delete(
      `/api/v1/studentSubmission/${studentPresentationSubmission_id}`
    );
    expect(response8.status).toBe(200);
  }, 30000);
});
