import { useMeals } from "../../contexts/meals-context";
import { Recipe } from "../../models/recipe";
import { toast } from "sonner";

interface Props {
  meal: Recipe;
  CurrentWeekTab: number | "all";
}
export default function MealCard({ meal, CurrentWeekTab }: Props) {
  const { state, dispatch } = useMeals();
  function handleRemove(event) {
    console.log("handleRemove", meal.id, CurrentWeekTab);
    event.stopPropagation(); // Prevent the div click from triggering

    if (CurrentWeekTab === "all")
      return toast.error("You can't remove meals from here");
    //   return toast.error("You can't remove meals from All Moe");
    dispatch({
      type: "REMOVE_FROM_WEEK",
      payload: { recipeIds: [meal.id], week: CurrentWeekTab },
    });

    // on api-success
    toast.success("Successfully removed")
  }
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 left-2 bg-black text-white text-xs font-medium px-2 py-1 rounded">
          {meal.mealType?.[0]}
        </span>
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
        >
          {CurrentWeekTab !== "all" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : null}{" "}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{meal.name}</h3>
        <p className="text-sm text-gray-600 mt-2">{meal.instructions?.[0]}</p>
      </div>
    </div>
  );
}
