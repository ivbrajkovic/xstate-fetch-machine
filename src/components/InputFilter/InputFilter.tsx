import { useUserMachineContext } from "context/userMachineContext";

const InputFilter = () => {
  const ctx = useUserMachineContext();
  console.log("InputFilter:ctx", ctx);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    ctx.send({ type: "CHANGE", data: { name: e.target.value } });

  return (
    <div className="p-5 mb-6 rounded-md shadow-lg bg-white">
      <label
        htmlFor="username"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Username
      </label>
      <input
        id="username"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus-visible:border-blue-500 block w-full p-2.5"
        placeholder="Filter users by name"
        onChange={handleChange}
      />
    </div>
  );
};

export default InputFilter;
