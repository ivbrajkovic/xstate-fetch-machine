import { inspect } from "@xstate/inspect";
import { CardList } from "components/CardList";
import { InputFilter } from "components/InputFilter";
import { UserMachineProvider } from "context/userMachineContext";
import { Layout } from "layout";

inspect({
  iframe: false, // open in new window
});

const App = () => (
  <UserMachineProvider>
    <Layout>
      <InputFilter />
      <CardList />
    </Layout>
  </UserMachineProvider>
);

export default App;
