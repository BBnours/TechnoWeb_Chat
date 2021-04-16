const app = require("../app");
const db = require("../db_config");
const request = require("supertest");

describe("user api tests", () => {
  beforeEach(async () => {
    await db.clear(); //on va clean la base de données
  });

  it("list empty", async () => {
    // Return an empty channel list by default
    await request(app).get("/api/v1/users").expect(200, []);
  });

  it("list one element", async () => {
    const user = {
      id: "321",
      name: "name",
      email: "name@gmail.com",
      password: "mdpEnClair",
    };
    await db.put(`users:${user.id}`, JSON.stringify(user));

    // Ensure we list the channels correctly
    await request(app)
      .get("/api/v1/users")
      .expect(200, [
        {
          id: "321",
          name: "name",
          email: "name@gmail.com",
          password: "mdpEnClair",
        },
      ]);
  });

  it("create new user with name not given", async () => {
    await request(app)
      .post("/api/v1/users")
      .send({
        id: "123",
        email: "email",
        password: "Password",
      })
      .expect(400, "Name is required");
  });

  it("create new user with email not given", async () => {
    await request(app)
      .post("/api/v1/users")
      .send({
        id: "123",
        name: "Name",
        password: "Password",
      })
      .expect(400, "Email is required");
  });

  it("create new user with password not given", async () => {
    await request(app)
      .post("/api/v1/users")
      .send({
        id: "123",
        name: "Name",
        email: "email",
      })
      .expect(400, "Password is required");
  });

  it("create new user", async () => {
    const { body } = await request(app)
      .post("/api/v1/users")
      .send({ name: "user 1", email: "name@gmail.com", password: "mdpEnClair" })
      .expect(201);

    body.should.match({
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      name: "user 1",
      email: "name@gmail.com",
      password: "mdpEnClair",
    });
  });

  it("show a user", async () => {
    const user = {
      id: "123",
      name: "name",
      email: "name@gmail.com",
      password: "mdpEnClair",
    };

    await db.put(`users:${user.id}`, JSON.stringify(user));

    await request(app).get("/api/v1/users/123").expect(200, {
      id: "123",
      name: "name",
      email: "name@gmail.com",
      password: "mdpEnClair",
    });
  });

  it("show user with inexisting id", async () => {
    await request(app).get("/api/v1/users/444").expect(404);
  });

  it("update a show", async () => {
    const user = {
      id: "123",
      name: "name",
      email: "name@gmail.com",
      password: "mdpEnClair",
    };
    await db.put(`users:${user.id}`, JSON.stringify(user));

    const { body } = await request(app)
      .put("/api/v1/users/123")
      .send({
        id: "123",
        name: "modified",
        email: "name@gmail.com",
        password: "mdpEnClair",
      })
      .expect(200);

    body.should.match({
      id: "123",
      name: "modified",
      email: "name@gmail.com",
      password: "mdpEnClair",
    });
  });

  it("delete a user", async () => {
    const user = {
      id: "123",
      name: "name",
      email: "name@gmail.com",
      password: "mdpEnClair",
    };

    await db.put(`users:${user.id}`, JSON.stringify(user));

    await request(app).delete("/api/v1/users/123").expect(204);
  });
});
