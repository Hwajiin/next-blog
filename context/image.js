import { createContext, useContext } from "react";
import ImageService from "../service/image";

export const ImageContext = createContext({});

export const ImageProvider = ({ children }) => {
  const imageService = new ImageService();

  return (
    <ImageContext.Provider value={{ imageService }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageService = () => useContext(ImageContext);
