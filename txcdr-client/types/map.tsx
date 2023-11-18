/**
 * Data for event markers on the map
 */
export interface EventMarker {
  latlng: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
}
