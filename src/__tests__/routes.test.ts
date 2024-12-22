import app from "../server";
import request from "supertest";

describe("GET /", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/");

    expect(res.body.message).toBe("Hello, world!");
  });
});
