import { useEffect, useRef } from "react";

export const useRenderCount = (title: string) => {
  const count = useRef(0);
  useEffect(() => {
    console.log(title, "-> Render count: ", ++count.current);
  });
};
