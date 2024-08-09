import { useContext } from "react";

import { OrderDetails } from "../contexts/OrderDetail";

// Custom hook to use the OrderDetails context
export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return context;
};
