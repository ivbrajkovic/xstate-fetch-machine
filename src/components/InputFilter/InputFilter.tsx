import { useUserMachineFilters } from "hooks/useUserMachineFilters";
import { ChangeEventHandler } from "react";
import { UserFilters } from "types";

const InputFilter = () => {
  const { filters, send } = useUserMachineFilters();

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    send({ type: "CHANGE_NAME", data: { name: e.target.value } });

  const handleGenderChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    send({
      type: "CHANGE_GENDER",
      data: { gender: e.target.title as UserFilters["gender"] },
    });

  return (
    <div className="p-5 mb-6 rounded-md shadow-lg bg-white flex gap-5">
      <div className="flex-1">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Username
        </label>
        <input
          title="name"
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus-visible:border-blue-500 block w-full p-2.5"
          placeholder="Filter users by name"
          value={filters.name}
          onChange={handleNameChange}
        />
      </div>
      <div className="">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Gender
        </label>
        <div className="flex gap-4 items-start">
          <div>
            <div className="flex">
              <input
                id="gender-male"
                type="radio"
                title="male"
                checked={filters.gender === "male"}
                onChange={handleGenderChange}
              />
              <label htmlFor="gender-male" className="pl-2">
                Male
              </label>
            </div>
            <div className="flex">
              <input
                id="gender-female"
                type="radio"
                title="female"
                checked={filters.gender === "female"}
                onChange={handleGenderChange}
              />
              <label htmlFor="gender-female" className="pl-2">
                Female
              </label>
            </div>
          </div>
          <div className="flex">
            <input
              id="gender-all"
              type="radio"
              title="all"
              checked={filters.gender === "all"}
              onChange={handleGenderChange}
            />
            <label htmlFor="gender-all" className="pl-2">
              All
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputFilter;
