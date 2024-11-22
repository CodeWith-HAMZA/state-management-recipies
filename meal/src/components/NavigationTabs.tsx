import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

export default function NavigationTabs() {

    const weeks = Array.from({ length: 4 }, (_, index) => index + 1);
    

    return (
      <div className="flex justify-center border-b border-gray-200 mb-8">
        <button className="px-4 py-2 font-medium text-gray-700 hover:text-gray-900 border-b-2 border-transparent focus:border-gray-900">
          All Meals
        </button>
        <button className="px-4 py-2 font-medium text-gray-700 hover:text-gray-900 border-b-2 border-gray-900">
          Week 1
        </button>
        <button className="px-4 py-2 font-medium text-gray-700 hover:text-gray-900 border-b-2 border-transparent focus:border-gray-900">
          Week 2
        </button>
        <button className="px-4 py-2 font-medium text-gray-700 hover:text-gray-900 border-b-2 border-transparent focus:border-gray-900">
          Week 3
        </button>
        <button className="px-4 py-2 font-medium text-gray-700 hover:text-gray-900 border-b-2 border-transparent focus:border-gray-900">
          Week 4
        </button>
        <div className="w-52 text-right">
        <Menu>
      <MenuButton className="bg-gray-900 text-white rounded-lg hover:opacity-70 px-6 py-2">Add To Week</MenuButton>
      <MenuItems className={'bg-gray-50 px-12 py-2 text-gray-700 rounded-lg flex flex-col gap-4 '} anchor="bottom">
      {weeks.map((weeknumber) => (
        <MenuItem key={weeknumber}>
          <a className=" block cursor-pointer data-[focus]:opacity-60">
            Week {weeknumber}
          </a>
        </MenuItem>
      ))}
      </MenuItems>
    </Menu>
    </div>
      </div>
    );
  }
  