import React, { createContext, useContext, useState, ReactNode } from "react";

interface PersonIdContextProps {
  personId: string | null;
  setPersonId: (id: string) => void;
}

const PersonIdContext = createContext<PersonIdContextProps | undefined>(undefined);

export const PersonIdProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [personId, setPersonId] = useState<string | null>(null);

  return (
    <PersonIdContext.Provider value={{ personId, setPersonId }}>
      {children}
    </PersonIdContext.Provider>
  );
};

export const usePersonId = (): PersonIdContextProps => {
  const context = useContext(PersonIdContext);
  if (!context) {
    throw new Error("usePersonId must be used within a PersonIdProvider");
  }
  return context;
};