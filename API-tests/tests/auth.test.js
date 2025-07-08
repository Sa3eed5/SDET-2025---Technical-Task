const request = require("supertest");
const BASE_URL = "http://localhost:3000";

describe("mock-user-auth - API Full Route Tests", () => {
  let token = "";
  let email = "saied123@example.com";
  let password = "123456";

  // TC01 
  test("TC01 - Should create user with valid email and password", async () => {
    const res = await request(BASE_URL)
      .post("/register")
      .send({ email, password });
    console.log(res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  // TC02
  test("TC02 - Should return 400 when email is missing", async () => {
    const res = await request(BASE_URL)
      .post("/register")
      .send({ email: "", password: "123@123" });
    console.log(res.body);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid data");
  });

  // TC03
  test("TC03 - Should return 400 when password is missing", async () => {
    const res = await request(BASE_URL)
      .post("/register")
      .send({ email, password: "" });
    console.log(res.body);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid data");
  });

  // TC04
  test("TC04 - Should return 400 for invalid email format", async () => {
    const res = await request(BASE_URL)
      .post("/register")
      .send({ email: "saied#", password: "123@123" });
    console.log(res.body);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid data");
  });

  // TC05
  test("TC05 - Should not allow registering with existing email", async () => {
    const res = await request(BASE_URL)
      .post("/register")
      .send({ email, password });
    console.log(res.body);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Email already exists");
  });

  // TC06
  test("TC06 - Should return 400 for short password", async () => {
    const res = await request(BASE_URL)
      .post("/register")
      .send({ email: "New@gmail.com", password: "123" });
    console.log(res.body);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Password must be at least 6 characters long");
  });

  // TC07
  test("TC07 - Should return 400 for too long password", async () => {
    const res = await request(BASE_URL)
      .post("/register")
      .send({ email:"New2@gmail.com", password: "1234567890123456789012345678901234567890" });
    console.log(res.body);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Password must be at most 30 characters long");
  });

  // TC08
  test("TC08 - Should authenticate user with correct credentials", async () => {
    const res = await request(BASE_URL)
      .post("/login")
      .send({ email, password });
    console.log(res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token", token);
  });

  // TC09
  test("TC09 - Should fail authentication with wrong credentials", async () => {
    const res = await request(BASE_URL)
      .post("/login")
      .send({ email: "Sa@gmail.com", password: "wrongpass" });
    console.log(res.body);
    expect(res.statusCode).toBe(404);
  });

  // TC10
  test("TC10 - Should return user profile with valid token", async () => {
    const res = await request(BASE_URL)
      .get("/profile")
      .set("Authorization", `Bearer ${token}`);
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email", email);
  });

  // TC11
  test("TC11 - Should return 401 when getting profile without token", async () => {
    const res = await request(BASE_URL).get("/profile");
    console.log(res.body);
    expect(res.statusCode).toBe(401);
  });
  // TC12
  test("TC12 - Should return 401 when getting profile with empty token", async () => {
    const res = await request(BASE_URL)
      .get("/profile")
      .set("Authorization", `Bearer `);
    console.log(res.body);
    expect(res.statusCode).toBe(401);
  });
  
  // TC13
  test("TC13 - Should update profile with valid token", async () => {
    const res = await request(BASE_URL)
      .patch("/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({ password: "newpassword123" });
    console.log(res.body);
    expect(res.statusCode).toBe(200);
  });

  // TC14
  test("TC14 - Should fail to update profile without token", async () => {
    const res = await request(BASE_URL)
      .patch("/profile")
      .send({ password: "newpassword123" });
    console.log(res.body);
    expect(res.statusCode).toBe(401);
  });
  // TC15
  test("TC15 - Should fail to update profile with invalid token", async () => {
    const res = await request(BASE_URL)
      .patch("/profile")
      .set("Authorization", `Bearer invalidtoken`)
      .send({ password: "newpassword123" });
    console.log(res.body);
    expect(res.statusCode).toBe(401);
  });
  // TC15
  test("TC15 - Should fail to update profile with invalid data", async () => {
    const res = await request(BASE_URL)
      .patch("/profile")         
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "wrong@gmail.com" });     
    console.log(res.body);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid email data");
    });

  // TC16
  test("TC16 - Should delete user profile with valid token", async () => {
    const res = await request(BASE_URL)
      .delete("/profile")
      .set("Authorization", `Bearer ${token}`);
    console.log(res.body);
    expect(res.statusCode).toBe(200);
  });

  // TC17
  test("TC17 - Should fail to delete profile with invalid token", async () => {
    const res = await request(BASE_URL)
      .delete("/profile")
      .set("Authorization", `Bearer invalidtoken`);
    console.log(res.body);
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Unauthorized");
  });

  // TC18
  test("TC18 - Should delete all users with correct admin key", async () => {
    const res = await request(BASE_URL)
      .delete("/all-users")
      .send({ key_admin: "admin" });
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  // TC19
  test("TC19 - Should fail to delete all users without admin key", async () => {
    const res = await request(BASE_URL)
      .delete("/all-users");
    console.log(res.body);
    expect(res.statusCode).toBe(401);
  });
  // TC20
  test("TC20 - Should fail to delete all users with incorrect admin key", async () => {
    const res = await request(BASE_URL)
      .delete("/all-users")
      .send({ key_admin: "wrongkey" });       
    console.log(res.body);      
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Unauthorized");      
  });
});
