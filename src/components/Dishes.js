import Loader from "./Loader";
import { useLoaderData } from "react-router-dom";
export default function Dishes() {
  const data = useLoaderData();
  if (!data) return <Loader />;

  return <div>{JSON.stringify(data)}</div>;
}
