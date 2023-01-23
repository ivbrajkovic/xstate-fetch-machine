import Card from "components/Card/Card";
import { useUserMachineUsers } from "hooks/useMachineUsers";

const NoUsersFound = () => (
  <div className="p-10 text-center font-medium text-xl">No users found</div>
);

const CardList = () => {
  const users = useUserMachineUsers();

  if (!users.length) return <NoUsersFound />;
  return (
    <ul className="flex flex-col gap-5">
      {users.map((user) => (
        <Card key={user.login.uuid} user={user} />
      ))}
    </ul>
  );
};

export default CardList;
