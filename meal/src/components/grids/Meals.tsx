import { useState } from "react";
import { useMeals } from "../../contexts/meals-context";
import { Recipe } from "../../models/recipe";
import MealCard from "../cards/MeelCard";

interface Props {
  meals: Recipe[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<Recipe[]>>
  selectedMeals: Recipe[]
  CurrentWeekTab: number | 'all'
}
export default function Meals({ meals ,CurrentWeekTab, setSelectedMeals, selectedMeals}: Props) {
  // const { state } = useMeals();
  // const [selectedMeals, setSelectedMeals] = useState<Recipe[]>([]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {!meals.length && <h2 className="text-2xl text-center font-semibold">No Meals Found For This Week :(</h2>}
      {meals.map((meal) => (
        <div
          onClick={() => {
            setSelectedMeals((_) => {

              if(_.map((m) => m.id).includes(meal.id)) {
                return [..._.filter((m) => m.id !== meal.id)];
              }
              return [..._, meal];
            });
          }}
          key={meal.id}
          className={`relative hover:scale-[1.03] cursor-pointer transition-all ${
            selectedMeals.includes(meal) ? "scale-[1.04] opacity-60" : ""}`}
        >
          {selectedMeals.includes(meal) && (
            <div className="absolute p-2 inset-0 opacity-60 rounded-lg shadow-none transition-all" />
          )}
          <MealCard CurrentWeekTab={CurrentWeekTab} key={meal.id} meal={meal} />
        </div>
      ))}
    </div>
  );
}
