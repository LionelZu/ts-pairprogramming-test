import { testFn } from "./module";

describe("test", () => {
  it("should execute without error", () => {
    const res = testFn();

    expect(testFn()).toBeTruthy();
  });
});
