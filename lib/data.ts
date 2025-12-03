import fs from "fs/promises";
import path from "path";

export interface ColorItem {
  POLSKONE_GRUPA_KOLORU: string;
  WARTOSC: string;
  PRZEKODOWANIE: string;
}

export interface ModelItem {
  WARTOSC: string;
  PRZEKODOWANIE: string;
}

export async function getColors(): Promise<ColorItem[]> {
  const filePath = path.join(process.cwd(), "data", "colors.json");
  const fileContent = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContent);
}

export async function getModels(): Promise<ModelItem[]> {
  const filePath = path.join(process.cwd(), "data", "models.json");
  const fileContent = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(fileContent) as ModelItem[];
  return data.sort((a, b) => a.WARTOSC.localeCompare(b.WARTOSC));
}
