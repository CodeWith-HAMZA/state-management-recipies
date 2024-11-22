import axios, { AxiosResponse } from "axios";
import { Recipe } from "../../models/recipe";
import { BASE_URL } from "../../constants";

export const fetchRecipes = async (): Promise<Recipe[] | null> => {
  try {

    // To improve this we could use (Axios Instance Property)
    // And would define in /services/index.ts -> and export axiosInstance

    const response: AxiosResponse<{ recipes: Recipe[] }> = await axios.get(
      BASE_URL + "/recipes"
    );

    const { recipes } = response.data;

    if (!recipes) {
      console.error("No recipes found in the response.");
      return null;
    }

    console.log(recipes, " recipes");

    return recipes;
  } catch (error) {
    
     if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};
