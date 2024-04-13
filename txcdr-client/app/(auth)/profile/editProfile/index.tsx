import { Pressable, Text, View, Image, StyleSheet, TextInput } from "react-native";
import { useSession } from "../../../../auth/ctx";
import { ScrollView } from "react-native-gesture-handler";
import { UploadImage } from "./imagepicker";
/**
 * The volunteer profile page
 * @returns Profile page component
 */
export default function Page() {
  const { signOut, editProfile, session } = useSession();
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.editProfileHeader}> Edit Profile </Text>
        {/* <View style={styles.profileImageContainer}></View> */}
        <UploadImage />
        <View style={styles.form}>
          <Text style={styles.header}>Personal Information</Text>
          <Text style={styles.subHeader}> First Name</Text>
          <TextInput style={styles.input} />
          <Text style={styles.subHeader}> Last Name</Text>
          <TextInput style={styles.input} />
          <Text style={styles.header}>Demographic Information</Text>
          <View style={styles.rowContainer}>
            <View style={styles.section}>
              <Text style={styles.subHeader}>Pronouns</Text>
              <TextInput style={styles.inputSmall} />
            </View>
            <View style={styles.section}>
              <Text style={styles.subHeader}>Age</Text>
              <TextInput style={styles.inputSmall} />
            </View>
          </View>
          <Text style={styles.subHeader}> Languages Spoken</Text>
          <TextInput style={styles.inputLarge} />
          <Text style={styles.header}>Contact Information</Text>
          <Text style={styles.subHeader}> Phone Number </Text>
          <TextInput placeholder="(###) ###-####" style={styles.input} />
          <Text style={styles.subHeader}> Email Address </Text>
          <TextInput style={styles.input} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 66,
    
  },
  form: {
    marginLeft: 36,

  },
  editProfileHeader: {
    color: "black",
    fontSize: 24,
    fontWeight: '700',
    height: 33,
    width: 132,
    marginLeft: 36,
    marginBottom: 10,
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 10,
    backgroundColor: 'rgba(217, 217, 217, 1)',
    marginLeft: 165,
  },
  editProfileButton: {
    color: 'red', 
  },
  header: {
    color: 'rgba(83, 96, 243, 1)',
    fontSize: 18,
    fontWeight: '700',
    height: 25,
    // width: 193,
    // marginLeft: 36,
    // marginTop: 10,
    marginBottom: 10,
  },
  subHeader: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    height: 25,
    // width: 96,
    // marginLeft: 36,
    // marginTop: 10,
    marginBottom: 10,
  },
  input: {
    color: 'black',
    fontSize: 17,
    fontWeight: '400',
    height: 49,
    width: 302,
    borderColor: 'rgba(217, 217, 217, 1)',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    // marginLeft: 36,
    marginBottom: 10, 
  },
  inputSmall: {
    color: 'black',
    fontSize: 17,
    fontWeight: '400',
    height: 49,
    width: 133,
    borderColor: 'rgba(217, 217, 217, 1)',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    // marginLeft: 36,
    marginBottom: 10, 
  },
  inputLarge: {
    color: 'black',
    fontSize: 17,
    fontWeight: '400',
    height: 100,
    width: 302,
    borderColor: 'rgba(217, 217, 217, 1)',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    // marginLeft: 36,
    marginBottom: 10, 
  },
  rowContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // width: '100%',
    marginTop: 10,
    justifyContent: 'center',
  },
  section: {
    flex: 1,
    // marginRight: 10,
    
  },
});