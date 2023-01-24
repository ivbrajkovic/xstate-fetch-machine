import { ReactEventHandler } from "react";
import { User } from "types";

type CardProps = { user: User };

const handleLoadImage: ReactEventHandler<HTMLImageElement> = (e) => {
  e.currentTarget.classList.toggle("opacity-0");
};

const Card = (props: CardProps) => (
  <div className="p-10 rounded-md shadow-lg bg-white flex gap-4">
    <div className="p-1 border-2 rounded-full">
      <img
        onLoad={handleLoadImage}
        src={props.user.picture.medium}
        alt="user"
        className="rounded-full h-[72px] w-[72px] opacity-0 transition-opacity duration-500 ease-in-out"
      />
    </div>
    <div>
      <h3 className="mb-1 text-xl">
        {props.user.name.first} {props.user.name.last}
      </h3>
      <p className="text-gray-400 text-sm leading-4">{props.user.email}</p>
      <p className="text-gray-400 text-sm leading-4">{props.user.gender}</p>
    </div>
  </div>
);

export default Card;
