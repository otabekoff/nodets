import request from "supertest";
import app from "../src/dev-hello";
import { describe, expect, it } from "vitest";

describe("Hello server", () => {
  it("GET /hello returns Hello World", async () => {
    const res = await request(app).get("/hello");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Hello World" });
  });
});
