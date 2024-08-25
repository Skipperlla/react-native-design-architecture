import { useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

export default function useLayout() {
  const [layout, setLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const onLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => setLayout(nativeEvent.layout),
    [],
  );

  return {
    onLayout,
    ...layout,
  };
}
