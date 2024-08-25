import { useCallback, useContext } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { BottomSheetProps } from '@gorhom/bottom-sheet';

import { ModalRefsContext } from '@app/context/ModalRefsProvider';

type SnapPoints = BottomSheetProps['snapPoints'];
const initialSnapPoints: SnapPoints = [200];

const useOptionsModal = () => {
  const {
    optionModalRef,
    setCurrentOptionsId,
    currentOptionsId,
    setSnapPoints,
    setStyle,
  } = useContext(ModalRefsContext)!;

  if (!optionModalRef.current && !optionModalRef) {
    throw new Error('useOptionsModal must be used within a ModalRefsProvider');
  }

  const open = useCallback(
    (
      optionId: string,
      snapPoints: SnapPoints = initialSnapPoints,
      style: StyleProp<ViewStyle> = {},
    ) => {
      setCurrentOptionsId(optionId);
      setSnapPoints(snapPoints);
      optionModalRef.current?.present();
      setStyle(style);
    },
    [optionModalRef, setCurrentOptionsId, setSnapPoints],
  );

  const close = useCallback(() => {
    optionModalRef.current?.dismiss();
  }, [optionModalRef, setCurrentOptionsId]);

  return {
    present: open,
    dismiss: close,
    currentOptionsId,
  };
};

export default useOptionsModal;
