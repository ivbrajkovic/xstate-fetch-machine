import { User } from "types";

type CardProps = { user: User };
const Card = (pros: CardProps) => {
  return <div className="p-10 rounded-md shadow-lg bg-white">Card</div>;
};

export default Card;
