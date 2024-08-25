import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "@app/navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
