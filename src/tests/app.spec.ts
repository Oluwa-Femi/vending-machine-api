import axios, { AxiosResponse, AxiosError } from "axios";

const testUrl = "http://localhost:8080";
const testUsername = "Babs";
const testPassword = "Qwerty1234lj$";
const testProductId = "751f5";
const cost = 20;
const testWrongDepositAmt = 41;
const testAmountOfProduct = 5;
let authResponse: AxiosResponse;

describe("Test", () => {
  beforeAll(async () => {
    authResponse = await axios.post(`${testUrl}/api/sessions`, {
      username: testUsername,
      password: testPassword,
    });
    expect(authResponse.status).toBe(200);
    expect(authResponse.headers["content-type"]).toContain("application/json");
    expect(authResponse.data.data.data).toHaveProperty("accessToken");
    expect(authResponse.data.data.data).toHaveProperty("refreshToken");
  });

  it("testing deposit with wrong values", async () => {
    try {
      axios
        .post(
          `${testUrl}/api/users/deposit`,
          {
            depositAmount: testWrongDepositAmt,
          },
          {
            headers: {
              Authorization: `Bearer ${authResponse.data.data.data.accessToken}`,
            },
          }
        )
        .catch((err: AxiosError) => {
          expect(err.response?.status).toBe(400);
          expect(err.response?.data).toHaveProperty("error");
        });
    } catch (e) {
      //nothing to do here
    }
  });
  it("testing deposit with correct values", async () => {
    const response = await axios.post(
      `${testUrl}/api/users/deposit`,
      {
        depositAmount: cost,
      },
      {
        headers: { Authorization: `Bearer ${authResponse.data.data.data.accessToken}` },
      }
    );
    console.log("responsedhhhhjjkkkk", response.status)
    expect(response.status).toBe(200);
  });
  it("testing buy with affordable cost", async () => {
    const response = await axios.post(
      `${testUrl}/api/products/${testProductId}/buy`,
      {
        amountOfProduct: testAmountOfProduct,
      },
      {
        headers: { Authorization: `Bearer ${authResponse.data.data.data.accessToken}` },
      }
    );
    expect(response.status).toBe(200);
    expect(response.data?.change).toBeInstanceOf(Array);
  });
  it("testing wallet balance after purchase", async () => {
    const response = await axios.get(`${testUrl}/api/users/profile`, {
      headers: { Authorization: `Bearer ${authResponse.data.data.data.accessToken}` },
    });
    expect(response.data?.deposit).toEqual(0);
  });
  it("testing reset", async () => {
    const response = await axios.get(`${testUrl}/api/users/reset-deposit`, {
      headers: { Authorization: `Bearer ${authResponse.data.data.data.accessToken}` },
    });
    expect(response.status).toBe(200);
  });

  it("testing buy with zero funds", async () => {
    try {
      const response = await axios.post(
        `${testUrl}/api/products/${testProductId}/buy`,
        {
          amountOfProduct: testAmountOfProduct,
        },
        {
          headers: { Authorization: `Bearer ${authResponse.data.data.data.accessToken}` },
        }
      );
    } catch (e: any) {
      expect(e.response?.status).toBe(404);
    }
  });
  afterAll(async () => {
    await axios.get(`${testUrl}/api/users/logout/all`, {
      headers: { Authorization: `Bearer ${authResponse.data.data.data.accessToken}` },
    });
  });
});
