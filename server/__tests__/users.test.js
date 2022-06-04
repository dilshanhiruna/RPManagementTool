const server = require("../server");
const Users = require('../models/users');
const create = require('../routes/users');
const request = require("supertest");


//Register a new user
describe("POST /usersignup", () => {
  let response = null;
  it("Register a new user", async () => {
    const res = await request(server).post("/usersignup").save({
        name: "Anne Taylor",
        type: "Staff",
        role: "Supervisor",
        interestedResearchField: "Machine Learning",
        studentGrouped: "None",
        email: "anne@gmail.com",
        password: "AnneTaylor@12345",
    });
    response = res;
    expect(res.status).toBe(200);
  }, 30000);


//Get all users
  it("Get all users", async () => {
    const response2 = await request(server).get("/users");
    expect(response2.status).toBe(200);
  });


  //Get a specific user by id
  it("Get a specific user by id", async () => {
    const response3 = await request(server).get("/user/:id");
    expect(response3.status).toBe(200);
  });


  //Update user
    it("Update user", async () => {
    const response4 = await request(server)
      .put("/user/update/:id")
      .findByIdAndUpdate({
        name: "Anne Taylor",
        type: "Staff",
        role: "Supervisor",
        interestedResearchField: "Image Processing",
        studentGrouped: "None",
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
        Users.User.findOne = jest.fn().mockReturnValueOnce({
            email: "john@gmail.com",
        });

        Users.User.save = jest.fn().mockImplementation(() => {});

        await expect(create("john@gmail.com")).rejects.toThrowError();
    })
});