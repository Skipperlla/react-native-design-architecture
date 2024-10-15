import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
  memo,
} from 'react';
import { StyleProp, ViewProps } from 'react-native';
import BottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppStore } from '@app/store';

export type OptionsModalHandle = {
  present: () => void;
  dismiss: () => void;
};

type Props = {
  snapPoints: BottomSheetProps['snapPoints'];
  children: React.ReactNode;
  onBackdropPress?: () => void;
  setCurrentOptionsId: React.Dispatch<React.SetStateAction<string | null>>;
  style: StyleProp<ViewProps>;
};

const _OptionsModal = forwardRef<OptionsModalHandle, Props>(
  (
    { children, snapPoints, onBackdropPress, setCurrentOptionsId, style },
    ref,
  ) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const { bottom } = useSafeAreaInsets();
    const { isDarkMode } = useAppStore();
    const backgroundColor = isDarkMode ? '#000A15' : '#FFFFFF';

    useImperativeHandle(ref, () => {
      return {
        present: () => {
          bottomSheetRef.current?.expand();
        },
        dismiss: () => {
          bottomSheetRef.current?.close();
        },
      };
    }, []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => {
        return (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            onPress={onBackdropPress}
          />
        );
      },
      [onBackdropPress],
    );
    const onChange = useCallback((index: number) => {
      if (index === -1) {
        setCurrentOptionsId(null);
      }
    }, []);

    return (
      <BottomSheet
        enablePanDownToClose
        ref={bottomSheetRef}
        handleIndicatorStyle={{
          display: 'none',
        }}
        style={{
          backgroundColor,
          borderRadius: 25,
        }}
        backgroundStyle={{
          backgroundColor,
          borderRadius: 25,
        }}
        enableDynamicSizing
        handleComponent={() => null}
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        index={-1}
        onChange={onChange}
      >
        <BottomSheetView
          style={[
            {
              paddingBottom: bottom || 24,
            },
            style,
          ]}
        >
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

export default memo(_OptionsModal);
