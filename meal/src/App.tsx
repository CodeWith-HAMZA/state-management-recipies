// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import NavigationTabs from "./components/NavigationTabs";
import Meals from "./components/grids/Meals";
import { Recipe } from "./models/recipe";
import { fetchRecipes } from "./services/meals";
import { useMeals } from "./contexts/meals-context";
import SelectItem from "./components/ui/select-item";

const weeks = [
  { id: 1, name: "Week 1" },
  { id: 2, name: "Week 2" },
  { id: 3, name: "Week 3" },
  { id: 4, name: "Week 4" },
];

function App() {
  // let meals: Recipe[] = [];
  const { state, dispatch } = useMeals();
  // const weeks = Array.from({ length: 4 }, (_, index) => index + 1);
  let [isOpen, setIsOpen] = useState(false);
  const [SelectedToWeek, setSelectedToWeek] = useState(weeks[0]); // while-transfer
  const [CurrentWeekTab, setCurrentWeekTab] = useState<number | "all">("all"); // while-transfer
  const [selectedMeals, setSelectedMeals] = useState<Recipe[]>([]);

  function open() {
    setIsOpen(true);
  }

  function close() {
    console.log("close");
    dispatch({
      type: "TRANSFER_RECIPES",
      payload: {
        fromWeek: CurrentWeekTab,
        toWeek: SelectedToWeek.id,
        recipes: [...selectedMeals],
      },
    });
    console.log(CurrentWeekTab, selectedMeals, SelectedToWeek);
    setSelectedMeals([]);
    setIsOpen(false);
  }

  // state.recipesByWeek[1][0].

  // const [meals, setMeals] = useState<Recipe[]>([]);

  let myMeals = null;

  useEffect(() => {
    // fetching recipes or meals
    fetchRecipes()
      .then((recipes) => {
        // if (meals) {
        //   setMeals(meals);
        // }
        if (recipes) {
          dispatch({ type: "SET_ALL_MEALS", payload: recipes });
        }
      })
      .catch((err) => {
        console.log(err); // or we can show toast -> to further improve this -> we can use *Tanstack-Query* (for Large-Scale-Apps)
      });
  }, [dispatch]);

  if (state.allMeals.length > 0) {
    myMeals = (
      <Meals
        setSelectedMeals={setSelectedMeals}
        selectedMeals={selectedMeals}
        CurrentWeekTab={CurrentWeekTab}
        meals={
          CurrentWeekTab === "all" ? [...state.allMeals] : state.recipesByWeek[CurrentWeekTab]
        }
      />
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-transparent to-white">
      <div className="container mx-auto p-6">
        <Header />

        <div className="flex justify-center border-b border-gray-200 mb-8">
          <button
            // className={cn}
            onClick={() => setCurrentWeekTab("all")}
            className={`px-4 py-2 font-medium text-gray-700 hover:text-gray-900  border-gray-900 ${
              "all" === CurrentWeekTab ? "border-b-4 border-gray-900" : ""
            }`}
          >
            All Meals
          </button>
          {[...Object.keys(state.recipesByWeek)].map((week) => (
            <button
              // className={cn}
              onClick={() => setCurrentWeekTab(week)}
              className={`px-4 py-2 font-medium text-gray-700 hover:text-gray-900  border-gray-900 ${
                week === CurrentWeekTab ? "border-b-4 border-gray-900" : ""
              }`}
            >
              Week {week}{" "}
              {state.recipesByWeek[week].length > 0 &&
                "(" + state.recipesByWeek[week].length + ")"}
            </button>
          ))}
          <Button
            disabled={!selectedMeals.length}
            onClick={open}
            className={`rounded-md ml-4 bg-black/80 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white ${
              !selectedMeals.length
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
          >
            Add To Week {!!selectedMeals.length && "(" + selectedMeals.length + ")"}
          </Button>
          <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                  transition
                  className="w-full max-w-md rounded-xl bg-white/65 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                  <DialogTitle as="h3" className="text-base/7 font-medium ">
                    Transfer Your Selected Meal To Any Week
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-black/50"></p>
                  <div className="mt-4">
                    <SelectItem
                      items={[...Object.keys(state.recipesByWeek)].map((_) => ({
                        name: "Week " + _,
                        id: _,
                      }))}
                      selectedItem={SelectedToWeek}
                      onItemSelect={(item) => setSelectedToWeek(item)}
                    />
                    <p className="my-2">Selected: {SelectedToWeek?.name}</p>

                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                      onClick={close}
                    >
                      Save
                    </Button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>{" "}
        </div>
        {myMeals}
      </div>
    </div>
  );
}

export default App;
