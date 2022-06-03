const server = require("../server.js");
const request = require("supertest");

describe("POST /api/v1/supervisorRequests", () => {
  //get supervisor requests for a specific staff memebr
  it("get supervisor requests for a specific staff memebr", async () => {
    const response1 = await request(server).get(
      "/api/v1/supervisorRequests/628d0363cec8f51cfb6dd746"
    );
    expect(response1.status).toBe(200);
  }, 30000);

  it("get cosupervisor requests for a specific staff memebr", async () => {
    const response1 = await request(server).get(
      "/api/v1/cosupervisorRequests/628d0363cec8f51cfb6dd746"
    );
    expect(response1.status).toBe(200);
  }, 30000);
});
