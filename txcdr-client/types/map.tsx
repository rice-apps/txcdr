/**
 * Data for event markers on the map
 */
export interface EventMarker {
  id: number;
  latlng: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
}
