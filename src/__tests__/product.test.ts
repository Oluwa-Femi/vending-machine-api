import request from "supertest";
import axios, { AxiosResponse, AxiosError } from "axios";

const testUrl = "http://localhost:1337"; //replace with yours 🙂
const testUsername = "test@example.com" //replace with yours 🙂 from database
const testPassword = "Password456!" //replace with yours 🙂 from database
const testProductId = "product_5pjrny2mk2"; //replace with yours 🙂 from database
const testDepositAmt = 20;
const testWrongDepositAmt = 21;
const testAmountOfProduct = 2;
let authResponse: AxiosResponse;

describe("Test", () => {
    beforeAll(async () => {

        authResponse = await axios.post(`${testUrl}/api/sessions`, { username: testUsername, password: testPassword });
        expect(authResponse.status).toBe(200);
        expect(authResponse.headers["content-type"]).toContain("json");
        expect(authResponse.data).toHaveProperty("accessToken");
        expect(authResponse.data).toHaveProperty("refreshToken");

    });

    it("testing deposit with wrong values", async () => {
        try {
            axios.post(`${testUrl}/api/users/deposit`,
                {
                    depositAmount: testWrongDepositAmt
                },
                {
                    headers:
                        { "Authorization": `Bearer ${authResponse.data.accessToken}` }
                }).catch((err: AxiosError) => {
                    expect(err.response?.status).toBe(400);
                    expect(err.response?.data).toHaveProperty("error");
                });
        } catch (e) {
            //nothing to do here
        }

    })
    it("testing deposit with correct values", async () => {
        const response = await axios.post(`${testUrl}/api/users/deposit`,
            {
                depositAmount: testDepositAmt
            },
            {
                headers:
                    { "Authorization": `Bearer ${authResponse.data.accessToken}` }
            })
        expect(response.status).toBe(200);
    })
    it("testing buy with affordable cost", async () => {
        const response = await axios.post(`${testUrl}/api/products/${testProductId}/buy`,
            {
                amountOfProduct: testAmountOfProduct
            },
            {
                headers:
                    { "Authorization": `Bearer ${authResponse.data.accessToken}` }
            })
        expect(response.status).toBe(200);
        expect(response.data?.change).toBeInstanceOf(Array);
    });
    it("testing wallet balance after purchase", async () => {
        const response = await axios.get(`${testUrl}/api/users/profile`,
            {
                headers:
                    { "Authorization": `Bearer ${authResponse.data.accessToken}` }
            });
        expect(response.data?.deposit).toEqual(0);
    });
    it("testing reset", async () => {
        const response = await axios.get(`${testUrl}/api/users/reset-deposit`,
            {
                headers:
                    { "Authorization": `Bearer ${authResponse.data.accessToken}` }
            })
        expect(response.status).toBe(200);
    })

    it("testing buy with zero funds", async () => {
        try {
            const response = await axios.post(`${testUrl}/api/products/${testProductId}/buy`,
                {
                    amountOfProduct: testAmountOfProduct
                },
                {
                    headers:
                        { "Authorization": `Bearer ${authResponse.data.accessToken}` }
                })
        } catch (e: any) {
            expect(e.response?.status).toBe(404);
        }
    });
    afterAll(async () => {
        await axios.get(`${testUrl}/api/users/logout/all`, {
            headers:
                { "Authorization": `Bearer ${authResponse.data.accessToken}` }
        });
    })
});