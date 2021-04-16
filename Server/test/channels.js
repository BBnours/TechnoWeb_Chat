const app = require("../app");
const db = require("../db_config");
const request = require("supertest");

describe("channel api tests", () => {
  beforeEach(async () => {
    await db.clear();
  });

  it("list empty", async () => {
    await request(app).get("/api/v1/channels").expect(200, []);
  });

  it("list one element", async () => {
    const channel = {
      id: "123",
      name: "name",
    };
    await db.put(`channels:${channel.id}`, JSON.stringify(channel));

    await request(app)
      .get("/api/v1/channels")
      .expect(200, [
        {
          id: "123",
          name: "name",
        },
      ]);
  });

  it("create new channel name not given", async () => {
    await request(app)
      .post("/api/v1/channels")
      .send({})
      .expect(400, "Name is requiered");
  });

  it("create new channel", async () => {
    const { body } = await request(app)
      .post("/api/v1/channels")
      .send({ name: "channel 1" })
      .expect(201);

    body.should.match({
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      name: "channel 1",
    });
  });

  it("show channel", async () => {
    const channel = {
      id: "123",
      name: "name",
    };
    await db.put(`channels:${channel.id}`, JSON.stringify(channel));

    await request(app).get("/api/v1/channels/123").expect(200, {
      id: "123",
      name: "name",
    });
  });

  it("show channel with id wich does not exist", async () => {
    await request(app).get("/api/v1/channels/444").expect(404);
  });

  it("update a channel", async () => {
    const channel = {
      id: "123",
      name: "name",
    };
    await db.put(`channels:${channel.id}`, JSON.stringify(channel));

    const { body } = await request(app)
      .put("/api/v1/channels/123")
      .send({
        id: "123",
        name: "modified",
      })
      .expect(200);

    body.should.match({
      id: "123",
      name: "modified",
    });
  });

  it("delete a channel", async () => {
    const channel = {
      id: "123",
      name: "name",
    };

    await db.put(`channels:${channel.id}`, JSON.stringify(channel));

    await request(app).delete("/api/v1/channels/123").expect(204);
  });
});
