import { Pressable, Text, View, Image, StyleSheet } from "react-native";
import { useSession } from "../../../auth/ctx";
import { router } from "expo-router";

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
        {/* <Text style={styles.userName}>{session?.name}</Text> */}
        <Text> UserName </Text>
        <Pressable style={styles.pencilIcon} onPress={() => {
          editProfile();
        }}>
          <Text> Edit Profile </Text>
        </Pressable>
      </View>
      <Text>Profile page</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 75,
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 10,
    backgroundColor: 'gray',
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
  signOutButton: {
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
});