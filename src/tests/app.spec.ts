import request from "supertest";
import axios, { AxiosResponse, AxiosError } from "axios";
import dotenv from "dotenv"

dotenv.config();

const testUrl = process.env.TESTURL;
const testUsername = process.env.TESTUSERNAME;
const testPassword = process.env.TESTPASSWORD;
const testProductId = process.env.TESTPRODUCTID;
const correctDepositAmount = process.env.CORRECTDEPOSITAMOUNT;
const testWrongDepositAmt = process.env.TESTWRONGDEPOSIT;
const testAmountOfProduct = process.env.TESTAMOUNT;
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
              Authorization: `Bearer ${authResponse.data.accessToken}`,
            },
          }
        )
        .catch((err: AxiosError) => {
          expect(err.response?.status).toBe(400);
          expect(err.response?.data).toHaveProperty("error");
        });
    } catch (e) {}
  });
  
  it("testing deposit with correct values", async () => {
    try {
      const response = await axios.post(
        `${testUrl}/api/users/deposit`,
        {
          depositAmount: correctDepositAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${authResponse.data.accessToken}`,
          },
        }
      );
      expect(response.status).toEqual(200);
    } catch (e) {}
  });
  it("testing buy with affordable cost", async () => {
    try {
    const response = await axios.post(
      `${testUrl}/api/products/${testProductId}/buy`,
      {
        amountOfProduct: testAmountOfProduct,
      },
      {
        headers: {
          Authorization: `Bearer ${authResponse.data.accessToken}`,
        },
      }
    );
    expect(response.status).toBe(200);
    expect(response.data?.change).toBeInstanceOf(Array);
  } catch (e) {}
});
  it("testing wallet balance after purchase", async () => {
    try {
    const response = await axios.get(`${testUrl}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${authResponse.data.accessToken}`,
      },
    });
    expect(response.data?.deposit).toEqual(0);
} catch (e) {}
});
  it("testing reset", async () => {
    try {
    const response = await axios.get(`${testUrl}/api/users/reset-deposit`, {
      headers: {
        Authorization: `Bearer ${authResponse.data.accessToken}`,
      },
    });
    expect(response.status).toBe(200);
  } catch (e) {}
});
  it("testing buy with zero funds", async () => {
    try {
      axios
        .post(
          `${testUrl}/api/products/${testProductId}/buy`,
          {
            depositAmount: testWrongDepositAmt,
          },
          {
            headers: {
              Authorization: `Bearer ${authResponse.data.accessToken}`,
            },
          }
        )
        .catch((err: AxiosError) => {
          expect(err.response?.status).toBe(400);
          expect(err.response?.data).toHaveProperty("error");
        });
    } catch (e) {}
  });
  afterAll(async () => {
    await axios.get(`${testUrl}/api/users/logout/all`, {
      headers: {
        Authorization: `Bearer ${authResponse.data.accessToken}`,
      },
    });
  });
});
