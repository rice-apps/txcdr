import { Pressable, Text, View, Image, StyleSheet } from "react-native";
import { useSession } from "../../../auth/ctx";
import { Link, router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import EditProfilePage from 'editProfile/index.tsx';

const Card = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <View style={styles.cardContainer}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    <View style={styles.cardContent}>
      {children}
    </View>
  </View>
);

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Profile">
//         <Stack.Screen name="Profile" component={YourProfilePage} />
//         <Stack.Screen name="EditProfile" component={EditProfilePage} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

/**
 * The volunteer profile page
 * @returns Profile page component
 */
export default function Page() {
  const { signOut, editProfile, session } = useSession();
  return (
    <View>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
        </View>
        <Text> UserName </Text>
        <Pressable style={styles.pencilIcon} onPress={() => {
          editProfile();
          // router.replace("/map");
          router.replace("/profile/editProfile");
        }}>
          <Text> Edit Profile </Text>
        </Pressable>
        <Pressable
          className="px-4 py-2 bg-slate-400"
          onPress={() => {
            signOut();
            router.replace("/");
          }}
        >
          <Text>Sign out</Text>
        </Pressable>
      </View>
      <ScrollView>
        <Card title="Contact Information">
          <Text style={styles.infoTitle}>PHONE</Text>

          <Text style={styles.infoTitle}>EMAIL</Text>
        </Card>

        <Card title="Demographic Information">
          <Text style={styles.infoTitle}>PRONOUNS</Text>
          <Text style={styles.infoTitle}>AGE</Text>
          <Text style={styles.infoTitle}>RACE</Text>
          <Text style={styles.infoTitle}>LANGUAGES SPOKEN</Text>
        </Card>

        <Card title="Organizations">
          <View style={styles.organization}>
            <View style={styles.profileImageContainer}></View>
            <Text style={styles.infoContent}>Organization Name</Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    // alignItems: 'center',
    
    height: 75,
    // display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: 100,
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 10,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  pencilIcon: {
    height: 20
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cardHeader: {
    backgroundColor: "rgba(83, 96, 243, 1)",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 60,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    //add open sans font
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16.34,
    paddingBottom: 8,
    //add open sans font
  },
  infoContent: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 24.51,
    //add open sans font
  },
  cardContent: {
    padding: 20,
  },
  organization: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 20,
  },
  signOutButton: {
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
});