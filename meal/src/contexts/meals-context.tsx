import { ReactNode, createContext, useContext, useReducer } from "react";
import { Recipe } from "../models/recipe";
import { toast, Toaster } from "sonner";
 interface MealsState {
  allMeals: Recipe[];
  recipesByWeek: Record<number, Recipe[]>; // Key is week number
}
type MealsAction =
  | { type: "SET_ALL_MEALS"; payload: Recipe[] }
  | { type: "ADD_TO_WEEK"; payload: { week: number; recipes: Recipe[] } }
  | { type: "REMOVE_FROM_WEEK"; payload: { week: number; recipeIds: number[] } }
  | {
      type: "TRANSFER_RECIPES";
      payload: { fromWeek: number | "all"; toWeek: number; recipes: Recipe[] };
    };

// Initial state
const initialMealsState: MealsState = {
  allMeals: [],
  recipesByWeek: {
    // 'all':[],
    1: [],
    2: [],
    3: [],
    4: [],
  },
};

// Create context
const MealsContext = createContext<{
  state: MealsState;
  dispatch: React.Dispatch<MealsAction>;
}>({
  state: initialMealsState,
  dispatch: () => undefined,
});

// Reducer fn ( Or we could use simple useState hook? but for maintainable i used useReducer )
const mealsReducer = (state: MealsState, action: MealsAction): MealsState => {
  switch (action.type) {
    case "SET_ALL_MEALS":
      return { ...state, allMeals: action.payload };

    case "ADD_TO_WEEK": {
      const { week, recipes } = action.payload;
      return {
        ...state,
        recipesByWeek: {
          ...state.recipesByWeek,
          [week]: [...(state.recipesByWeek[week] || []), ...recipes],
        },
      };
    }

    case "REMOVE_FROM_WEEK": {
      const { week, recipeIds } = action.payload;
      return {
        ...state,
        recipesByWeek: {
          ...state.recipesByWeek,
          [week]: (state.recipesByWeek[week] || []).filter(
            (recipe) => !recipeIds.includes(recipe.id)
          ),
        },
      };
    }

    case "TRANSFER_RECIPES": {
      const { fromWeek, toWeek, recipes } = action.payload;
      const recipeIds = recipes.map((recipe) => recipe.id);
      const targetWeekRecipes = state.recipesByWeek[toWeek] || [];
      const filteredRecipes = recipes.filter(
        (recipe) =>
          !targetWeekRecipes.some((existing) => existing.id === recipe.id)
      );

      const duplicateRecipes = recipes.filter((recipe) =>
        targetWeekRecipes.some((existing) => existing.id === recipe.id)
      );
      if (duplicateRecipes.length > 0) {
        toast.error("You can't add duplicate recipes to the same week");
      }
      // Filter out duplicates
      if (fromWeek === "all") {
        return {
          ...state,
          recipesByWeek: {
            ...state.recipesByWeek,

            // we don't have to update 'all' (All-Meals)
            [toWeek]: [...(targetWeekRecipes || []), ...filteredRecipes],
          },
        };
      }

      return {
        ...state,
        recipesByWeek: {
          ...state.recipesByWeek,
          [fromWeek]: (state.recipesByWeek[fromWeek] || []).filter(
            (recipe) => !recipeIds.includes(recipe.id)
          ),
          [toWeek]: [...(targetWeekRecipes || []), ...filteredRecipes],
        },
      };
    }

    default:
      return state;
  }
};

// Provider component
export const MealsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(mealsReducer, initialMealsState);
  return (
    <MealsContext.Provider value={{ state, dispatch }}>
      <Toaster />

      {children}
    </MealsContext.Provider>
  );
};

export const useMeals = () => useContext(MealsContext);
