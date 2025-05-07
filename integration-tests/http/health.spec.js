"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("@medusajs/test-utils");
jest.setTimeout(60 * 1000);
(0, test_utils_1.medusaIntegrationTestRunner)({
    inApp: true,
    env: {},
    testSuite: ({ api }) => {
        describe("Ping", () => {
            it("ping the server health endpoint", async () => {
                const response = await api.get('/health');
                expect(response.status).toEqual(200);
            });
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhbHRoLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoZWFsdGguc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUFrRTtBQUNsRSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQTtBQUUxQixJQUFBLHdDQUEyQixFQUFDO0lBQzFCLEtBQUssRUFBRSxJQUFJO0lBQ1gsR0FBRyxFQUFFLEVBQUU7SUFDUCxTQUFTLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7UUFDckIsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDcEIsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUMvQyxNQUFNLFFBQVEsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQ3pDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3RDLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIn0=