const server = require("../server");
const request = require("supertest");

describe("POST /api/v1/AssignmentSubmissions", () => {
  let response = null;
  //create a new submission type
  test("create a new submission type", async () => {
    const res1 = await request(server)
      .post("/api/v1/AssignmentSubmissions")
      .send({
        submissionName: "Project Proposal",
        sType: "Document",
        sDescription: "test project proposal ",
        sTemplate: {
          name: "",
        },
        sMarkingScheme: {
          name: "",
        },
        sDeadline: "2022-06-17T17:34:37.000+00:00",
        sVisibility: false,
      });
    response = res1;
    expect(res1.status).toBe(200);
  }, 30000);

  //update the submission type details
  test("update the submission type details", async () => {
    //update the submission type details
    const res2 = await request(server)
      .put(`/api/v1/AssignmentSubmissions/${response.body.data._id}`)
      .send({
        sDescription: "update the test",
        sTemplate: {
          name: "",
        },
        sMarkingScheme: {
          name: "",
        },
        sDeadline: "2022-06-17T17:34:37.000+00:00",
      });
    expect(res2.status).toBe(200);
  });

  //activate the submission
  test("activate the submission", async () => {
    const res6 = await request(server)
      .put(`/api/v1/AssignmentSubmissions/visibility/${response.body.data._id}`)
      .send({
        sVisibility: true,
      });
    expect(res6.status).toBe(200);
  });

  //get all submission types
  test("get all student groups", async () => {
    const res3 = await request(server).get("/api/v1/AssignmentSubmissions");
    expect(res3.status).toBe(200);
  });

  //get submission types using ID
  test("get submission types using ID", async () => {
    const res4 = await request(server).get(
      `/api/v1/AssignmentSubmissions/${response.body.data._id}`
    );
    expect(res4.status).toBe(200);
  });

  //delete the submission type
  test("delete the submission type", async () => {
    const res5 = await request(server).delete(
      `/api/v1/AssignmentSubmissions/${response.body.data._id}`
    );
    expect(res5.status).toBe(200);
  });
});
