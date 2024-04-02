import React, { createContext, useContext, useEffect, useState } from "react";

type Orientation = "portrait" | "landscape";

type OrientationContextType = {
  orientation: Orientation;
  setOrientation: React.Dispatch<React.SetStateAction<Orientation>>;
};

export const OrientationContext = createContext<
  OrientationContextType | undefined
>(undefined);

export const UseOrientation = () => {
  const context = useContext(OrientationContext);
  if (!context) {
    throw new Error("useOrientation must be used within a OrientationProvider");
  }
  return context;
};

export const OrientationProvider: React.FC = ({ children }: any) => {
  const [orientation, setOrientation] = useState<Orientation>("portrait");

  return (
    <OrientationContext.Provider value={{ orientation, setOrientation }}>
      {children}
    </OrientationContext.Provider>
  );
};
