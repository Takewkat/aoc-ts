import { fetchAndWriteChallenge, readPuzzle } from "./libs/puzzle/index.ts";
//import { computeSum } from "./libs/math/index.ts";

/**
 * Fonction principale
 * Vérifie si le puzzle est bien chargé
 * Dans le cas contraire, téléchargement et écriture du puzzle
 */
async function main() {
  await fetchAndWriteChallenge();
  const data = readPuzzle();
  //solver(data);
  console.log("answer:", solver(data));
}

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]) {
  for (const line of data) {
    console.log(line);
  }
  return 1;
  // const frequencyChanges = data.map(line => Number(line.trim()));
  // return computeSum(frequencyChanges);
}

main();
