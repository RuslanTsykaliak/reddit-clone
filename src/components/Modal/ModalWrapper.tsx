import {
    Modal,
    ModalOverlay,
    ModalContent,
  } from "@chakra-ui/react";
  import React, { ReactNode } from "react";
  
  type ModalWrapperProps = {
    isOpen: boolean; // Controls the visibility of the modal
    onClose: () => void; // Function to handle modal close event
    children: ReactNode; // The content to be displayed inside the modal
  };
  
  const ModalWrapper: React.FC<ModalWrapperProps> = ({
    children,
    isOpen,
    onClose,
  }) => {
    return (
      <>
        {/* Chakra UI Modal component */}
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          {/* ModalOverlay is used to create a backdrop for the modal */}
          <ModalOverlay />
  
          {/* ModalContent holds the actual content of the modal */}
          <ModalContent width={{ base: "sm", md: "xl" }}>
            {/* The content to be displayed inside the modal */}
            {children}
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ModalWrapper;
  