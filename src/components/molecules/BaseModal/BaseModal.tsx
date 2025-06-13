import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import { ViewStyle } from 'react-native';

import { useTheme } from '@/theme';

// Move useTheme inside the component
interface ModalRef {
  open: () => void;
  close: () => void;
}

interface BaseModalProps {
  children: React.ReactNode;
  snapPoints?: (string | number)[];
  backdropOpacity?: number;
  containerStyle?: ViewStyle;
  onOpen?: () => void;
  onClose?: () => void;
  enableDynamicSizing?: boolean;
}

const BaseModal = forwardRef<ModalRef, BaseModalProps>((props, ref) => {
  // Move useTheme inside the component body
  const { layout } = useTheme();

  const {
    children,
    snapPoints,
    backdropOpacity = 0.5,
    containerStyle,
    onOpen,
    onClose,
    enableDynamicSizing = false,
  } = props;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Expose open and close methods to parent
  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetModalRef.current?.present();
      onOpen && onOpen();
    },
    close: () => {
      bottomSheetModalRef.current?.dismiss();
      onClose && onClose();
    },
    snapToIndex: (index: number) => {
      bottomSheetModalRef.current?.snapToIndex(index);
    },
  }));

  // Custom backdrop
  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={backdropOpacity}
      />
    ),
    [backdropOpacity],
  );

  // Handle modal state changes
  const handleSheetChanges = useCallback((index: number) => {
    console.log('Modal state changed:', index);
  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      enableDynamicSizing={enableDynamicSizing}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}
      handleStyle={layout.display('none')}
      style={containerStyle}
    >
      {/* <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={layout.flex1}
          > */}
      <BottomSheetView style={[layout.flex1]}>{children}</BottomSheetView>
      {/* </KeyboardAvoidingView> */}
    </BottomSheetModal>
  );
});

export default BaseModal;
