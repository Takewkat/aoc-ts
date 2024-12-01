import consola from "consola";
import { readFileSync } from "fs";
import { chromium } from "playwright";
import { cookie, day, puzzleFile, year } from "../../constants.ts";
import { fetchInstructions, fetchPuzzle } from "../../libs/puzzle/fetch.ts";
import {
  createDirectories,
  isChallengeFetched,
  writeInstructions,
  writePuzzle,
} from "./write.ts";

export function readPuzzle(path = puzzleFile): string[] {
  try {
    const file = readFileSync(path, "utf-8");
    const lines = file.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    console.log(`Successfully read ${lines.length} lines from puzzle file at ${path}`);
    return lines;
  } catch (error) {
    console.error(`Error reading puzzle file at ${path}:`, error);
    throw error;
  }
}

export async function fetchAndWriteChallenge() {
  if (isChallengeFetched()) {
    return;
  }
  createDirectories();
  try {
    consola.start("Récupération du challenge en cours...");
    const [puzzle, instructions] = await Promise.all([
      fetchPuzzle(),
      fetchInstructions(),
    ]);
    if (puzzle) writePuzzle(puzzle);
    if (instructions) writeInstructions(instructions);
  } catch (error) {
    console.error(error);
  }
}

export async function postAnswer(candidate: number) {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.addInitScript((cookie: string) => {
    document.cookie = cookie;
  }, cookie);

  await page.goto(`https://adventofcode.com/`);
  await page.goto(`https://adventofcode.com/${year}/day/${day}`);

  await page.getByRole("textbox").fill(String(candidate));
  await page.getByRole("button", { name: "[Submit]" }).click();

  const isSuccess = await page.isVisible("text='That's the right answer'");
  const errorMessage = await page.getByRole("article").textContent();

  if (!isSuccess) {
    throw new Error(errorMessage!);
  }

  await page.pause();
}
