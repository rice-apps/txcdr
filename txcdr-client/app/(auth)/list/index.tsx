import { Text, View } from "react-native";
import FormBuilder from "../../../utils/formbuilder";
import Form from "../../../utils/form";
import FormBlock from "../../../utils/form";

/**
 * List page
 * @returns List page component
 */
export default function Page() {
  return (
    <View>
      <Text>List page</Text>
      <View>
        <FormBlock></FormBlock>
      </View>
    </View>
  );
}
