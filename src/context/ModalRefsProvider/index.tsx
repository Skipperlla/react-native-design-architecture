import React, {
  PropsWithChildren,
  useCallback,
  useState,
  createContext,
  useMemo,
  useRef,
} from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { type BottomSheetProps } from '@gorhom/bottom-sheet';
import { PortalHost } from '@gorhom/portal';

import OptionsModal from './OptionsModal';

type SnapPoints = BottomSheetProps['snapPoints'];

const initialSnapPoints: SnapPoints = [150];

type ModalRefsContextType = {
  /**
   * Current visible options in the modal
   */
  currentOptionsId: string | null;
  setCurrentOptionsId: (id: string | null) => void;

  /**
   * Current snap points for the options modal
   */
  snapPoints: SnapPoints;
  setSnapPoints: (snapPoints: SnapPoints) => void;

  /**
   * Ref to the options modal
   */
  optionModalRef: React.RefObject<ModalOptionsProps>;

  /**
   * Style for the options modal
   */
  style: StyleProp<ViewStyle>;
  setStyle: React.Dispatch<React.SetStateAction<StyleProp<ViewStyle>>>;
};

export const ModalRefsContext = createContext<ModalRefsContextType | null>(
  null,
);

const ModalRefsProvider = ({ children }: PropsWithChildren) => {
  const [currentOptionsId, setCurrentOptionsId] = useState<string | null>(null);
  const [snapPoints, setSnapPoints] = useState<SnapPoints>(initialSnapPoints);
  useState<boolean>(true);
  const [style, setStyle] = useState<StyleProp<ViewStyle>>({});

  const optionModalRef = useRef<ModalOptionsProps>(null);

  const value = useMemo(() => {
    return {
      optionModalRef,
      setCurrentOptionsId,
      currentOptionsId,
      snapPoints,
      setSnapPoints,
      setStyle,
      style,
    };
  }, [currentOptionsId, snapPoints]);

  const onBackdropPress = useCallback(() => {
    setSnapPoints(initialSnapPoints);
  }, []);

  return (
    <ModalRefsContext.Provider value={value}>
      {children}
      {/*  App wide modals */}
      <OptionsModal
        snapPoints={snapPoints}
        ref={optionModalRef}
        setCurrentOptionsId={setCurrentOptionsId}
        onBackdropPress={onBackdropPress}
        style={style}
      >
        <PortalHost name="options" />
      </OptionsModal>
    </ModalRefsContext.Provider>
  );
};

export default ModalRefsProvider;
