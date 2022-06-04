const server = require("../server");
const User = require('../models/User');
const create = require('../routes/User');
const request = require("supertest");


//Register a new user
describe("POST /usersignup", () => {
  let response = null;
  it("Register a new user", async () => {
    const res = await request(server).post("/usersignup").save({
        uid: "SN19999995",
        name: "Anne Taylor",
        staffType: "Staff",
        role: "Supervisor",
        interestedResearchField: "Machine Learning",
        studentGrouped: "None",
        studentGroupID: "None",
        email: "anne@gmail.com",
        password: "AnneTaylor@12345",
    });
    response = res;
    expect(res.status).toBe(201);
  }, 30000);


//Get all users
  it("Get all users", async () => {
    const response2 = await request(server).get("/allusers");
    expect(response2.status).toBe(200);
  });


  //Get a specific user by id
  it("Get a specific user by id", async () => {
    const response3 = await request(server).get("/:id");
    expect(response3.status).toBe(200);
  });


  //Update user
    it("Update user", async () => {
    const response4 = await request(server)
      .put("/user/update/:id")
      .findByIdAndUpdate({
        uid: "SN19999995",
        name: "Anne Taylor",
        staffType: "Staff",
        role: "Supervisor",
        interestedResearchField: "Image Processing",
        studentGrouped: "None",
        studentGroupID: "None",
        email: "annetaylor@gmail.com",
      });
    expect(response4.status).toBe(200);
  });


  //Delete user
  it("Delete user", async () => {
    const response5 = await request(server).delete("/user/delete/:id");
    expect(response5.status).toBe(400);
  });

});

//If an email of an existing user is given when registering a new user
describe('Register a new user', () => {
    it.only('Should not create a new user and throw error when a user with the given email exists', async () => {
        User.findOne = jest.fn().mockReturnValueOnce({
            email: "annetaylor@gmail.com",
        });

        User.save = jest.fn().mockImplementation(() => {});

        await expect(create("annetaylor@gmail.com")).rejects.toThrowError();
    })
});