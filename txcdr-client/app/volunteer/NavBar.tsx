import { SafeAreaView } from "react-native-safe-area-context";
import { NavBarButton } from "./NavBarButton";

export function NavBar() {
  return (
    <SafeAreaView className="flex flex-row gap-2 justify-around bg-gray-200 items-center align-middle">
      <NavBarButton />
      <NavBarButton />
      <NavBarButton />
      <NavBarButton />
    </SafeAreaView>
  );
}
