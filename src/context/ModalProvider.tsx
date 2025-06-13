import { OtpConfirmModalContent } from '@/components/atoms';
import {
  BaseModal,
  ForgotAndPhoneModalContent,
  MessageModalContent,
} from '@/components/molecules';
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

interface ModalContextProps {
  openModal: (
    modalKey: 'otpConfirm' | 'responseMessage' | 'forgotPassword',
    data?: any,
  ) => void;
  closeModal: (modalKey: string) => void;
  modalData: { [key: string]: any };
}

const ModalContext = createContext<ModalContextProps | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const modalRefs = useRef<{ [key: string]: React.RefObject<any> }>({});
  const [modalData, setModalData] = useState<{ [key: string]: any }>({});

  const registerModal = useCallback((key: string) => {
    if (!modalRefs.current[key]) {
      modalRefs.current[key] = React.createRef();
    }
    return modalRefs.current[key];
  }, []);

  const openModal = (key: string, data?: any) => {
    setModalData((prev) => ({ ...prev, [key]: data }));
    modalRefs.current[key]?.current?.open();
  };

  const closeModal = (key: string) => {
    modalRefs.current[key]?.current?.close();
  };

  const snapModal = (key: string, index: number = 0) => {
    modalRefs.current[key]?.current?.snapToIndex(index); // Snap to index 0 (e.g., minimize modal)
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalData }}>
      {children}

      {/* OTP Confirmation Modal */}
      <BaseModal
        ref={registerModal('otpConfirm')}
        snapPoints={[
          modalData['otpConfirm']?.type === 'passwordReset' ? '70%' : '50%',
        ]}
        backdropOpacity={0.7}
      >
        {modalData['otpConfirm'] && (
          <OtpConfirmModalContent
            snapModal={() => snapModal('otpConfirm')}
            {...modalData['otpConfirm']}
          />
        )}
      </BaseModal>

      {/* Password Reset Modal */}
      <BaseModal
        ref={registerModal('responseMessage')}
        // snapPoints={['CONTENT_HEIGHT']}
        enableDynamicSizing
        backdropOpacity={0.7}
      >
        {modalData['responseMessage'] && (
          <MessageModalContent
            snapModal={() => snapModal('responseMessage')}
            {...modalData['responseMessage']}
          />
        )}
      </BaseModal>

      <BaseModal
        ref={registerModal('forgotPassword')}
        // snapPoints={['30%']}
        enableDynamicSizing
        backdropOpacity={0.7}
      >
        {modalData['forgotPassword'] && (
          <ForgotAndPhoneModalContent
            snapModal={() => snapModal('forgotPassword')}
            {...modalData['forgotPassword']}
          />
        )}
      </BaseModal>
    </ModalContext.Provider>
  );
};

export default ModalProvider;
