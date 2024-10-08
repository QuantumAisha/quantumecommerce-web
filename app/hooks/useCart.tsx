import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartProductType } from "../product/[productId]/ProductDetails";
import { toast } from "react-hot-toast";

type CartContextType = {
  CartTotalQty: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [CartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

  useEffect(() => {
    const cartItems = localStorage.getItem("QuantumshopCartItems");
    if (cartItems) {
      const cProducts: CartProductType[] | null = JSON.parse(cartItems);
      setCartProducts(cProducts);
      if (cProducts) {
        setCartTotalQty(cProducts.length);
      }
    }
  }, []);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      toast.success('Product added to Cart');
      localStorage.setItem("QuantumshopCartItems", JSON.stringify(updatedCart));

      return updatedCart;
    });
    setCartTotalQty((prevQty) => prevQty + 1);
  }, []);

  

  const value = {
    CartTotalQty,
    cartProducts,
    handleAddProductToCart,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
