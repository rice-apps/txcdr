import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { ms } from "react-native-size-matters";
import { DText } from "./styled-rn/DText";
import { useFilter } from "../utils/hooks/useFilter";
import React, { useEffect, useState } from "react";
import { router, useGlobalSearchParams } from "expo-router";
import { WideButton } from "./buttons/WideButton";
import { HandledModal } from "./modals/HandledModal";
import { Blue, Zinc } from "../utils/styles/colors";
import { Switch } from "@rneui/themed";
import { Picker } from "@react-native-picker/picker";
import { supabase } from "../utils/supabase";

function bool2Str(b: boolean): "true" | "false" {
  return b ? "true" : "false";
}

function str2Bool(s: "true" | "false" | undefined): boolean {
  return s == "true";
}

export interface AddressQueryParams {
  zipCode: string;
  claimed: "true" | "false";
  completed: "true" | "false";
  blockId: string;
  eventId: string;
}

interface Props {
  /** Filters to enable */
  filters: ("status" | "zipCode" | "blockId" | "event")[];
  /** Array of ZIP codes that the user can select from. This prop must be set if the ZIP code filter is enabled. */
  zipCodes?: string[];
  blockIds?: string[];
  eventIds?: string[];
}

/**
 * Provides UI for setting filters and updating the global search params. The available filters are predefined by the props.
 * @param props Pass in the filters you want to opt-in to. For example, if you want to enable the zip code filter, pass in `zipCode`.
 */
export function FilterController(props: Props) {
  const params = useGlobalSearchParams<Partial<AddressQueryParams>>();
  const [zipCode, setZipCode] = useState(params.zipCode);
  const [claimed, setClaimed] = useState(params.claimed ?? "false");
  const [completed, setCompleted] = useState(params.completed ?? "false");
  const [blockId, setBlockId] = useState(params.blockId);
  const [eventId, setEventId] = useState(params.eventId);
  const [eventNames, setEventNames] = useState<Map<string, string>>();

  // Create filters
  const [StatusFilter, statusVisible, statusToggle] = useFilter({
    name: "Status",
    modal: true,
  });
  const [ZipFilter, zipVisible, zipToggle] = useFilter({
    name: "Zip code",
    modal: true,
  });
  const [BlockFilter, blockVisible, blockToggle] = useFilter({
    name: "Block ID",
    modal: true,
  });
  const [EventFilter, eventVisible, eventToggle] = useFilter({
    name: "Event",
    modal: true,
  });

  const onZipSubmit = () => {
    zipToggle();
    router.setParams({ zipCode: zipCode });
  };
  const onBlockSubmit = () => {
    blockToggle();
    router.setParams({ blockId: blockId });
  };
  const onEventSubmit = () => {
    eventToggle();
    router.setParams({ eventId: eventId });
  };

  // Activate filters
  let statusEnabled = false;
  let zipEnabled = false;
  let blockEnabled = false;
  let eventEnabled = false;
  for (const filter of props.filters) {
    if (filter == "status") statusEnabled = true;
    if (filter == "zipCode") zipEnabled = true;
    if (filter == "blockId") blockEnabled = true;
    if (filter == "event") eventEnabled = true;
  }

  // Prop validation
  if (zipEnabled && !props.zipCodes)
    throw new Error(
      "You must provide available ZIP codes for the ZIP code filter.",
    );
  if (blockEnabled && !props.blockIds)
    throw new Error(
      "You must provide available block IDs for the block ID filter.",
    );
  if (eventEnabled && !props.eventIds)
    throw new Error(
      "You must provide available event IDs for the event filter.",
    );

  // Build labels to display in the filter buttons
  const statusSuffix: string[] = [];
  if (params.claimed)
    statusSuffix.push(params.claimed == "true" ? "Claimed" : "Unclaimed");
  if (params.completed)
    statusSuffix.push(params.completed == "true" ? "Complete" : "Incomplete");

  // Set default states (these are only for the UI, not the global search params)
  useEffect(() => {
    setZipCode(props.zipCodes ? props.zipCodes[0] : undefined);
    setBlockId(props.blockIds ? props.blockIds[0] : undefined);
    setEventId(props.eventIds ? props.eventIds[0] : undefined);
  }, [props.zipCodes]);

  // Fetch event names if the event filter is enabled
  useEffect(() => {
    const func = async () => {
      if (props.eventIds) {
        const res = await supabase
          .from("Event")
          .select("id, title")
          .in("id", props.eventIds);
        if (res.error) {
          console.error(res.error);
          return;
        }
        const names: Map<string, string> = new Map();
        res.data.forEach((e) => names.set(e.id.toString(), e.title));
        setEventNames(names);
      }
    };
    func();
  }, [props.eventIds]);

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.filterList}
      showsHorizontalScrollIndicator={false}
    >
      {statusEnabled && <StatusFilter suffix={statusSuffix.join(", ")} />}
      {zipEnabled && <ZipFilter suffix={params.zipCode} />}
      {blockEnabled && <BlockFilter suffix={params.blockId} />}
      {eventEnabled && eventNames && (
        <EventFilter
          suffix={params.eventId ? eventNames.get(params.eventId) : undefined}
        />
      )}

      {statusEnabled && (
        <HandledModal
          isVisible={statusVisible}
          onSwipeComplete={statusToggle}
          onBackdropPress={statusToggle}
        >
          <View style={styles.modalContainer}>
            <DText style={styles.filterTitle}>Status</DText>
            <View style={styles.switchRow}>
              <DText style={styles.switchText}>Claimed</DText>
              <Switch
                value={str2Bool(claimed)}
                onValueChange={(v) => setClaimed(bool2Str(v))}
              />
            </View>
            <View style={styles.switchRow}>
              <DText style={styles.switchText}>Completed</DText>
              <Switch
                value={str2Bool(completed)}
                onValueChange={(v) => setCompleted(bool2Str(v))}
              />
            </View>
            <View style={styles.buttonColumn}>
              <WideButton
                style={{ backgroundColor: Blue[500] }}
                onPress={() => {
                  router.setParams({ claimed: claimed, completed: completed });
                  statusToggle();
                }}
              >
                <DText style={styles.saveButtonText}>Save</DText>
              </WideButton>
              <WideButton
                style={{ backgroundColor: "transparent" }}
                onPress={() => {
                  setClaimed("false");
                  setCompleted("false");
                  router.setParams({
                    claimed: undefined,
                    completed: undefined,
                  });
                  statusToggle();
                }}
              >
                <DText style={styles.resetButtonText}>Reset</DText>
              </WideButton>
            </View>
          </View>
        </HandledModal>
      )}

      {zipEnabled && (
        <HandledModal
          isVisible={zipVisible}
          onSwipeComplete={zipToggle}
          onBackdropPress={zipToggle}
        >
          <View style={styles.modalContainer}>
            <DText style={styles.filterTitle}>Zip code</DText>
            <TouchableWithoutFeedback>
              <View>
                <Picker
                  selectedValue={zipCode}
                  onValueChange={(itemValue: string) => setZipCode(itemValue)}
                  mode="dropdown"
                >
                  {props.zipCodes &&
                    props.zipCodes.map((zip) => (
                      <Picker.Item label={zip} value={zip} key={zip} />
                    ))}
                </Picker>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.buttonColumn}>
              <WideButton
                style={{ backgroundColor: Blue[500] }}
                onPress={onZipSubmit}
              >
                <DText style={styles.saveButtonText}>Save</DText>
              </WideButton>
              <WideButton
                style={{ backgroundColor: "transparent" }}
                onPress={() => {
                  setZipCode(props.zipCodes ? props.zipCodes[0] : undefined);
                  router.setParams({ zipCode: undefined });
                  zipToggle();
                }}
              >
                <DText style={styles.resetButtonText}>Reset</DText>
              </WideButton>
            </View>
          </View>
        </HandledModal>
      )}
      {blockEnabled && (
        <HandledModal
          isVisible={blockVisible}
          onSwipeComplete={blockToggle}
          onBackdropPress={blockToggle}
        >
          <View style={styles.modalContainer}>
            <DText style={styles.filterTitle}>Block ID</DText>
            <TouchableWithoutFeedback>
              <View>
                <Picker
                  selectedValue={blockId}
                  onValueChange={(itemValue: string) => setBlockId(itemValue)}
                  mode="dropdown"
                >
                  {props.blockIds &&
                    props.blockIds.map((block) => (
                      <Picker.Item label={block} value={block} key={block} />
                    ))}
                </Picker>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.buttonColumn}>
              <WideButton
                style={{ backgroundColor: Blue[500] }}
                onPress={onBlockSubmit}
              >
                <DText style={styles.saveButtonText}>Save</DText>
              </WideButton>
              <WideButton
                style={{ backgroundColor: "transparent" }}
                onPress={() => {
                  setBlockId(props.blockIds ? props.blockIds[0] : undefined);
                  router.setParams({ blockId: undefined });
                  blockToggle();
                }}
              >
                <DText style={styles.resetButtonText}>Reset</DText>
              </WideButton>
            </View>
          </View>
        </HandledModal>
      )}
      {eventEnabled && eventNames && (
        <HandledModal
          isVisible={eventVisible}
          onSwipeComplete={eventToggle}
          onBackdropPress={eventToggle}
        >
          <View style={styles.modalContainer}>
            <DText style={styles.filterTitle}>Event</DText>
            <TouchableWithoutFeedback>
              <View>
                <Picker
                  selectedValue={eventId}
                  onValueChange={(itemValue: string) => setEventId(itemValue)}
                  mode="dropdown"
                >
                  {props.eventIds &&
                    props.eventIds.map((eventId) => (
                      <Picker.Item
                        label={eventNames?.get(eventId)}
                        value={eventId}
                        key={eventId}
                      />
                    ))}
                </Picker>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.buttonColumn}>
              <WideButton
                style={{ backgroundColor: Blue[500] }}
                onPress={onEventSubmit}
              >
                <DText style={styles.saveButtonText}>Save</DText>
              </WideButton>
              <WideButton
                style={{ backgroundColor: "transparent" }}
                onPress={() => {
                  setEventId(props.eventIds ? props.eventIds[0] : undefined);
                  router.setParams({ eventId: undefined });
                  eventToggle();
                }}
              >
                <DText style={styles.resetButtonText}>Reset</DText>
              </WideButton>
            </View>
          </View>
        </HandledModal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filterList: {
    justifyContent: "center",
    flexDirection: "row",
    gap: ms(10),
    flexGrow: 1,
  },
  modalContainer: { gap: ms(20) },
  buttonColumn: { gap: ms(5) },
  filterTitle: {
    fontSize: ms(24),
    fontWeight: "bold",
  },
  filterInput: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Zinc[400],
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: "600",
    textAlignVertical: "center", // Add this line
  },
  saveButtonText: {
    fontSize: ms(16),
    fontWeight: "bold",
    color: "white",
  },
  resetButtonText: {
    fontSize: ms(16),
    fontWeight: "bold",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchText: {
    fontSize: ms(14),
    fontWeight: "600",
  },
});
