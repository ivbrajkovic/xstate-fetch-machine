import { CardList } from "components/CardList";
import { InputFilter } from "components/InputFilter";
import { UserMachineProvider } from "context/userMachineContext";
import { Layout } from "layout";

const App = () => (
  <UserMachineProvider>
    <Layout>
      <InputFilter />
      <CardList />
    </Layout>
  </UserMachineProvider>
);

export default App;
