import { readData } from "./dataReader";
import fs from "fs";

jest.mock("fs");

describe("dataReader", () => {
  it("should parse file without errors", () => {
    jest.spyOn(fs, "readFileSync").mockReturnValue("");

    const result = readData();

    expect(result).toBeDefined();
  });

  it("should parse a line with one result", () => {
    jest.spyOn(fs, "readFileSync").mockReturnValue("Cardiff West, 11014, C");

    const results = readData();

    const result = results[0];
    expect(result.region).toBe("Cardiff West");
    expect(result.party).toBe("C");
    expect(result.votes).toBe(11014);
  });

  it("should parse a line with many results on same region", () => {
    jest
      .spyOn(fs, "readFileSync")
      .mockReturnValue("Cardiff West, 11014, C, 17803, L");

    const results = readData();

    expect(results).toHaveLength(2);

    const firstResult = results[0];
    expect(firstResult.region).toBe("Cardiff West");
    expect(firstResult.party).toBe("C");
    expect(firstResult.votes).toBe(11014);

    const secondResult = results[1];
    expect(secondResult.region).toBe("Cardiff West");
    expect(secondResult.party).toBe("L");
    expect(secondResult.votes).toBe(17803);
  });

  it("should parse a line with result on different region", () => {
    jest
      .spyOn(fs, "readFileSync")
      .mockReturnValue(
        "Cardiff West, 11014, C\nIslington South & Finsbury, 22547, L"
      );

    const results = readData();

    expect(results).toHaveLength(2);

    const firstResult = results[0];
    expect(firstResult.region).toBe("Cardiff West");
    expect(firstResult.party).toBe("C");
    expect(firstResult.votes).toBe(11014);

    const secondResult = results[1];
    expect(secondResult.region).toBe("Islington South & Finsbury");
    expect(secondResult.party).toBe("L");
    expect(secondResult.votes).toBe(22547);
  });
});
