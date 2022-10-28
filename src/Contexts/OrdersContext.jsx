import { createContext, useState, useEffect } from "react";
import { addToDb, readFromDb } from "../utilities/localDB";
const orderContext = createContext(null);
export { orderContext };

export default function OrderContext({ children }) {
  const [orderedMeals, setOrderedMeals] = useState({});
  const addToOrder = (id) => {
    setOrderedMeals((current) => {
      current[id] = 1;
      addToDb({ ...current });
      return { ...current };
    });
  };

  const modifyQuantify = (id, quantity) => {
    if (+orderedMeals[id] === 0 && quantity < 0) {
      return;
    }
    orderedMeals[id] = orderedMeals[id] + quantity;
    const newState = { ...orderedMeals };
    addToDb(newState);
    setOrderedMeals(newState);
  };

  useEffect(() => {
    const locallyStored = readFromDb();
    setOrderedMeals(locallyStored);
  }, []);

  const contextPayload = { orderedMeals, addToOrder, modifyQuantify };
  return (
    <orderContext.Provider value={contextPayload}>
      {children}
    </orderContext.Provider>
  );
}
