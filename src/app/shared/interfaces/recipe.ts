export interface IRecipe {
  name: string;
  description: string;
  category: number;
  tags: string[];
  photo: string;
  link: string;
  prepareFor: number;
  prepareUnit: string;
  cookFor: number;
  cookUnit: string;
  servings: number;
  level: number;
  tools: string;
  instructions: string;
  comments: string;
}
