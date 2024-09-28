import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the structure of the state
interface GlobalState {
  count: number;
  user: string | null;
}

// Define the context value type
interface GlobalStateContextType {
  state: GlobalState;
  updateState: (newState: Partial<GlobalState>) => void;
}

// Create the context with an initial value (can be null initially)
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

// Define the provider props to accept children
interface GlobalStateProviderProps {
  children: ReactNode;
}

// Create the provider component
const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [state, setState] = useState<GlobalState>({
    count: 0,
    user: null,
  });

  // Helper function to update state based on the previous state
  const updateState = (newState: Partial<GlobalState>) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <GlobalStateContext.Provider value={{ state, updateState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Helper hook to use the GlobalStateContext (optional but good practice)
const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

export { GlobalStateContext, GlobalStateProvider, useGlobalState };
