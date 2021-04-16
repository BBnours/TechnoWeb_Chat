const app = require("../app");
const db = require("../db_config");
const request = require("supertest");
const { v4: uuid } = require("uuid");

describe("message api tests", () => {
  beforeEach(async () => {
    await db.clear();
  });

  it("list empty", async () => {
    await request(app).get("/api/v1/users").expect(200, []);
  });

  it("list one element", async () => {
    const channel = {
      id: "123",
      name: "name",
    };
    await db.put(`channels:${channel.id}`, JSON.stringify(channel));

    const message = {
      id: "666",
      userId: "999",
      content: "Hello World!",
      created_at: "2021-02-20T14:28:04.856Z",
    };

    await db.put(
      `channels:${channel.id}:messages:${message.id}`,
      JSON.stringify(message)
    );

    await request(app)
      .get("/api/v1/messages/666")
      .expect(200, [
        {
          id: "666",
          userId: "999",
          content: "Hello World!",
          created_at: "2021-02-20T14:28:04.856Z",
        },
      ]);
  });

  it("create new message", async () => {
    const channel = {
      id: uuid(),
      name: "name",
    };

    await db.put(`channels:${channel.id}`, JSON.stringify(channel));

    const { body } = await request(app)
      .post("/api/v1/channels/123/messages")
      .send({ userId: uuid(), content: "Hello World!" })
      .expect(200);

    body.should.match({
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      userId: /^\w+-\w+-\w+-\w+-\w+$/,
      content: "Hello World!",
      created_at: /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
    });
  });

  it("create new message with content not given", async () => {
    const channel = {
      id: "123",
      name: "name",
    };
    await db.put(`channels:${channel.id}`, JSON.stringify(channel));

    await request(app)
      .post("/api/v1/channels/123/messages")
      .send({ userId: "999" })
      .expect(400, "Content is required");
  });

  it("create new message with userId not given", async () => {
    const channel = {
      id: "123",
      name: "name",
    };
    await db.put(`channels:${channel.id}`, JSON.stringify(channel));

    await request(app)
      .post("/api/v1/channels/123/messages")
      .send({ content: "Je ne dis pas non à une bonne note" })
      .expect(400, "UserId is required");
  });

  it("show a message", async () => {
    const channel = {
      id: "123",
      name: "name",
    };
    await db.put(`channels:${channel.id}`, JSON.stringify(channel));

    const message = {
      id: "666",
      userId: "999",
      content: "Hello World!",
    };

    await db.put(
      `channels:${channel.id}:messages:${message.id}`,
      JSON.stringify(message)
    );

    await request(app)
      .get("/api/v1/messages/666")
      .expect(200, [
        {
          id: "666",
          userId: "999",
          content: "Hello World!",
        },
      ]);
  });

  it("show message with inexisting id", async () => {
    const channel = {
      id: "123",
      name: "name",
    };
    await db.put(`channels:${channel.id}`, JSON.stringify(channel));

    await request(app).get("/api/v1/channles/123/messages").expect(404);
  });

  it("update a message", async () => {
    const channel = {
      id: "123",
      name: "name",
    };
    await db.put(`channels:${channel.id}`, JSON.stringify(channel));

    const message = {
      id: "666",
      userId: "999",
      content: "Hello World!",
      created_at: "2021-02-20T14:28:04.856Z",
    };
    await db.put(
      `channels:${channel.id}:messages:${message.id}`,
      JSON.stringify(message)
    );

    const { body } = await request(app)
      .put("/api/v1/messages/666")
      .send({
        id: "666",
        userId: "999",
        content: "Hello World!",
        created_at: "2021-02-20T14:28:04.856Z",
      })
      .expect(200);

    body.should.match({
      id: "666",
      userId: "999",
      content: "Hello World!",
      created_at: "2021-02-20T14:28:04.856Z",
      modified_at: /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
    });
  });

  it("delete a message", async () => {
    const channel = {
      id: "123",
      name: "name",
    };
    await db.put(`channels:${channel.id}`, JSON.stringify(channel));

    const message = {
      id: "666",
      userId: "999",
      content: "Hello World!",
      created_at: "2021-02-20T14:28:04.856Z",
    };
    await db.put(
      `channels:${channel.id}:messages:${message.id}`,
      JSON.stringify(message)
    );

    await request(app).delete("/api/v1/messages/666").expect(204);
  });
});
