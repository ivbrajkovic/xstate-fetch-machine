import Card from "components/Card/Card";
import useMachineUsers from "hooks/useMachineUsers";

const CardList = () => {
  const users = useMachineUsers();
  if (users.length === 0)
    return (
      <div className="p-10 text-center font-medium text-xl">No users found</div>
    );
  return (
    <ul className="flex flex-col gap-5">
      {users.map((user) => (
        <Card key={user.login.uuid} user={user} />
      ))}
    </ul>
  );
};

export default CardList;
