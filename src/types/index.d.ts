import { type BottomSheetModalProps } from '@gorhom/bottom-sheet';

declare global {
  type BottomSheetModalRef = BottomSheetModalProps;
  type ModalOptionsProps = {
    present: () => void;
    dismiss: () => void;
  };
}
