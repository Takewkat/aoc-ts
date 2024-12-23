import { computeSum } from "../math/index.ts";

/**
 * @function selectMatrixRow
 * @param matrix 
 * @param row 
 * @returns The row of the matrix
 */
export function selectMatrixRow<T>(matrix: Array<T[]>, row: number) {
  return matrix[row];
}

/**
 * @function selectMatrixColumn
 * @param matrix 
 * @param column 
 * @returns The column of the matrix
 */
export function selectMatrixColumn<T>(matrix: Array<T[]>, column: number) {
  return matrix.map((row) => row[column]);
}

/**
 * @function computeMatrixSum
 * @param matrix 
 * @returns The matrix's sum
 */
export function computeMatrixSum(matrix: Array<number[]>): number {
  let res = 0;
  for (const row of matrix) {
    res += computeSum(row);
  }
  return res;
}

/**
 * @deprecated Since it's 5x slower rather than computeMatrixSum
 * @param matrix
 * @returns The matrix's sum
 */
export function computeMatrixSumBis(matrix: Array<number[]>) {
  return computeSum(matrix.flatMap(computeSum));
}

/**
 * @function isAdjacent
 * @description Vérifie sur une liste de coordonnées, si un point cible est adjacent.
 * @param candidates Une liste de coordonnées
 * @param target Une coordonnée
 * @returns true | undefined
 */
export function isAdjacent(candidates: Coordinates[], target: Coordinates) {
  for (const candidate of candidates) {
    if (target.x - candidate.x > 1) continue;
    if (target.y - candidate.y > 1) continue;
    if (target.x - candidate.x < -1) continue;
    if (target.y - candidate.y < -1) continue;
    return true;
  }
}

export type Coordinates = {
  x: number;
  y: number;
};

export type NumbersMap = {
  x: number;
  y: number;
  value: number;
};

export type Directions = "north" | "south" | "east" | "west";