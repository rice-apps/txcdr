import { Ionicons } from "@expo/vector-icons";
import { Divider } from "@rneui/themed";
import { ScrollView, View, Text, FlatList } from "react-native";
import { StatusName } from "../../map/EventCallout";

export default function Page() {
  return (
    <ScrollView style={{ padding: 25, flex: 1, flexDirection: "column" }}>
      <View
        style={{
          alignSelf: "center",
          borderWidth: 2,
          borderColor: "#5360F3",
          width: "100%",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#5360F3",
            width: "100%",
            alignContent: "center",
            alignSelf: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          {/* Home Icon */}
          <Ionicons name="home-outline" size={24} color="white" />
          {/* Address Name */}
          <Text
            style={{
              marginLeft: 8,
              fontSize: 16,
              fontWeight: "semibold",
              color: "white",
            }}
          >
            2413 Wichita St.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            padding: 15,
            gap: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "semibold",
              textTransform: "uppercase",
              textAlign: "right",
              width: "35%",
              color: "#5360F3",
            }}
          >
            Status
          </Text>
          <StatusName text={"Status"}></StatusName>
        </View>
        <Divider
          style={{ borderWidth: 1, borderColor: "lightgray", width: "90%" }}
        ></Divider>
        <View
          style={{
            flexDirection: "row",
            padding: 15,
            gap: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "semibold",
              textTransform: "uppercase",
              textAlign: "right",
              width: "35%",
              color: "#5360F3",
            }}
          >
            OWNER
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "semibold" }}>Name</Text>
        </View>
        <Divider
          style={{ borderWidth: 1, borderColor: "lightgray", width: "90%" }}
        ></Divider>
        <View
          style={{
            flexDirection: "row",
            padding: 15,
            gap: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "semibold",
              textTransform: "uppercase",
              textAlign: "right",
              width: "35%",
              color: "#5360F3",
            }}
          >
            HOUSEHOLD SIZE
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "semibold" }}>Name</Text>
        </View>
        <Divider
          style={{ borderWidth: 1, borderColor: "lightgray", width: "90%" }}
        ></Divider>
        <View
          style={{
            flexDirection: "row",
            padding: 15,
            gap: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "semibold",
              textTransform: "uppercase",
              textAlign: "right",
              width: "35%",
              color: "#5360F3",
            }}
          >
            OWNER
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "semibold" }}>Name</Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#5360F3",
            marginTop: 20,
          }}
        >
          Condition
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "medium",
            color: "black",
            marginTop: 10,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
      {/* Photos section */}
      <View>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#5360F3",
            marginTop: 20,
          }}
        >
          Photos
        </Text>
        <FlatList
          horizontal={true}
          renderItem={({ item }) => (
            <View
              style={{
                width: 200,
                height: 200,
                backgroundColor: "lightgray",
                borderRadius: 10,
                margin: 10,
              }}
            ></View>
          )}
          data={[1, 2, 3, 4, 5]}
        ></FlatList>
      </View>
      <View>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#5360F3",
            marginTop: 20,
          }}
        >
          Survey Forms
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "medium",
            color: "black",
            marginTop: 10,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
    </ScrollView>
  );
}
