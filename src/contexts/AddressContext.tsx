import React, { createContext, useContext, useState, useEffect } from 'react';

interface AddressContextType {
  address: string;
  setAddress: (address: string) => void;
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: (isOpen: boolean) => void;
  openAddressModal: () => void;
  closeAddressModal: () => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddressState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('santor-user-address') || '';
    }
    return '';
  });
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Save to localStorage whenever address changes
  useEffect(() => {
    localStorage.setItem('santor-user-address', address);
  }, [address]);

  const setAddress = (newAddress: string) => {
    setAddressState(newAddress);
  };

  const openAddressModal = () => setIsAddressModalOpen(true);
  const closeAddressModal = () => setIsAddressModalOpen(false);

  return (
    <AddressContext.Provider
      value={{
        address,
        setAddress,
        isAddressModalOpen,
        setIsAddressModalOpen,
        openAddressModal,
        closeAddressModal,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddress must be used within AddressProvider');
  }
  return context;
};

export default AddressContext;
