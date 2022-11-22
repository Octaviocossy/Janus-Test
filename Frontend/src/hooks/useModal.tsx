import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactNode, useCallback } from 'react';

interface Props {
  title: string;
  component: ReactNode;
}

const useModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Component: React.FC<Props> = useCallback(
    ({ title, component }) => (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{component}</ModalBody>
        </ModalContent>
      </Modal>
    ),
    [isOpen]
  );

  return [Component, onOpen, onClose, isOpen] as const;
};

export default useModal;
