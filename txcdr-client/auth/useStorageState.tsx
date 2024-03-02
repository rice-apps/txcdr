import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useReducer, useState } from "react";
import { Platform } from "react-native";
import { Session } from "../types/auth";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [false, null],
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null,
    ): [boolean, T | null] => [false, action],
    initialValue,
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: Session | null) {
  if (Platform.OS == "web") {
    try {
      if (value == null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.error("Local storage is unavailable: ", e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, JSON.stringify(value));
    }
  }
}

export function useStorageState(key: string): UseStateHook<Session> {
  // Public
  const [state, setState] = useAsyncState<Session>();

  // Get
  useEffect(() => {
    if (Platform.OS == "web") {
      try {
        if (typeof localStorage != "undefined") {
          const res = localStorage.getItem(key);
          if (res) {
            setState(JSON.parse(res));
          }
        }
      } catch (e) {
        console.error("Local storage is unavailable: ", e);
      }
    } else {
      SecureStore.getItemAsync(key).then((value) => {
        if (value) {
          setState(JSON.parse(value));
        }
      });
    }
  }, [key]);

  const setValue = useCallback(
    (value: Session | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key],
  );

  return [state, setValue];
}
