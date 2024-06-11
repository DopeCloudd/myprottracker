import request from "supertest";

import app from "../../app";

describe("Auth routes", () => {
  // Test the POST /auth/register route
  it("Register a user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        firstName: "Valentin",
        lastName: "LEROUGE",
        email: "valentin.lerouge18@gmail.com",
        password: "testPassword",
      })
      .expect("Content-Type", /json/);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true });
  });

  // Test the POST /auth/login route
  it("Login a user", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "valentin.lerouge18@gmail.com",
      password: "testPassword",
    });
    expect(res.status).toBe(200);
  });
});
