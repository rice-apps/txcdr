import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ISvgProps } from "../../types/utils";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export const HomeNormal = (props: ISvgProps) => (
  <Ionicons name="home-outline" color="white" size={36} />
);

export const HomeFilled = (props: ISvgProps) => (
  <Ionicons name="home" color="white" size={36} />
);

export const ListNormal = (props: ISvgProps) => (
  <Ionicons name="list-outline" color="white" size={36} />
);

export const ListFilled = (props: ISvgProps) => (
  <Ionicons name="list" color="white" size={36} />
);

export const MapNormal = (props: ISvgProps) => (
  <Ionicons name="map-outline" color="white" size={36} />
);

export const MapFilled = (props: ISvgProps) => (
  <Ionicons name="map" color="white" size={36} />
);

export const ProfileNormal = (props: ISvgProps) => (
  <Ionicons name="person-outline" color="white" size={36} />
);

export const ProfileFilled = (props: ISvgProps) => (
  <Ionicons name="person" color="white" size={36} />
);
