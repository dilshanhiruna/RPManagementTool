const server = require("../server.js");
const request = require("supertest");

describe("POST /api/v1/studentgroups", () => {
  let response = null;
  //create a new student group
  it("create a new student group", async () => {
    const res = await request(server).post("/api/v1/studentgroups").send({
      GroupID: "test ID",
      student1: "628a6207c334a17636b3584b",
    });
    response = res;
    expect(res.status).toBe(200);
  }, 30000);

  it("add a research topic to the student group", async () => {
    //add a research topic to the student group
    const response2 = await request(server)
      .put(`/api/v1/studentgroups/researchtopic/${response.body.data._id}`)
      .send({
        researchTopic: "test Topic",
      });
    expect(response2.status).toBe(200);
  });

  it("add a supervisor to the student group", async () => {
    //add a supervisor to the student group
    const response3 = await request(server)
      .put(`/api/v1/studentgroups/supervisor/${response.body.data._id}`)
      .send({
        supervisor: "628a4cd9c334a17636b35847",
        supervisorStatus: "pending",
      });
    expect(response3.status).toBe(200);
  });

  it("add a co-supervisor to the student group", async () => {
    //add a cosupervisor to the student group
    const response4 = await request(server)
      .put(`/api/v1/studentgroups/cosupervisor/${response.body.data._id}`)
      .send({
        cosupervisor: "628a4cd9c334a17636b35847",
        cosupervisorStatus: "pending",
      });
    expect(response4.status).toBe(200);
  });

  it("add a panelmember to the student group", async () => {
    //add a panelmember to the student group
    const response5 = await request(server)
      .put(`/api/v1/studentgroups/panelmember/${response.body.data._id}`)
      .send({
        panelmember: "628a4cd9c334a17636b35847",
      });
    expect(response5.status).toBe(200);
  });

  it("get all student groups", async () => {
    //get all student groups
    const response6 = await request(server).get("/api/v1/studentgroups");
    expect(response6.status).toBe(200);
  });

  it("get a student group by id", async () => {
    //get a student group by id
    const response7 = await request(server).get(
      `/api/v1/studentgroups/${response.body.data._id}`
    );
    expect(response7.status).toBe(200);
  });

  it("check group id", async () => {
    //check group id
    const response8 = await request(server).get(
      `/api/v1/studentgroups/checkgroupid/${response.body.data._id}`
    );
    expect(response8.status).toBe(200);
  });

  it("delete the student group", async () => {
    // delete the student group
    const response9 = await request(server).delete(
      `/api/v1/studentgroups/${response.body.data._id}`
    );
    expect(response9.status).toBe(200);
  });
});
