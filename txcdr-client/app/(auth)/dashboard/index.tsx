import { ActivityIndicator } from "react-native";
import { useRole } from "../../../utils/hooks/useRole";
import { UserPage } from "./UserPage";
import { AdminPage } from "./AdminPage";

export default function Page() {
  const [role, loading] = useRole();

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return role == "USER" ? <UserPage /> : <AdminPage />;
}
