import { CardList } from "components/CardList";
import { InputFilter } from "components/InputFilter";
import { UserMachineProvider } from "context/userMachineContext";

const App = () => {
  return (
    <UserMachineProvider>
      <div className="flex justify-center pt-20">
        <div className="min-w-[50%]">
          <InputFilter />
          <CardList />
        </div>
      </div>
    </UserMachineProvider>
  );
};

export default App;
