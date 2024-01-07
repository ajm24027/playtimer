import {
    Modal as BaseModal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,

} from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const Modal = ({ title, isOpen, onClose, children }: PropsWithChildren<{ title: string, isOpen: boolean, onClose: () => void }>) =>
    <BaseModal
        colorScheme="purple"
        isOpen={isOpen}
        onClose={onClose}
        isCentered
    >
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="18px" />
        <ModalContent
            bgColor="purple.800"
            boxShadow="2px 2px 20px 10px rgba(0, 0, 0, 0.4)"
            border="1px solid white"
        >
            <ModalHeader color="white">{title}</ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>{children}</ModalBody>

            <ModalFooter></ModalFooter>
        </ModalContent>
    </BaseModal>
