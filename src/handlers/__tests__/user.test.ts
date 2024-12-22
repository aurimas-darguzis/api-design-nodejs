import * as user from "../user";

describe("User handlers", () => {
  it("should create a new user", async () => {
    const req = {
      body: {
        username: "New user",
        password: "password",
      },
    };

    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };

    await user.createNewUser(req, res, () => {});
  });
});
