import { readFileSync } from "fs";

export function readData(): Resultat[] {
  const file = readFileSync("assets/data.csv", "utf-8");
  const lines = file.split("\n");
  const results: Resultat[] = [];
  lines.map((l) => {
    const elements = l.split(",");
    const region = elements[0].trim();
    for (let index = 1; index < elements.length; index = index + 2) {
      const result = parseInt(elements[index]);
      const party = elements[index + 1].trim();
      results.push(new Resultat(region, party, result));
    }
  });
  return results;
}

export class Resultat {
  constructor(
    public region: string,
    public party: string,
    public votes: number
  ) {}
}
