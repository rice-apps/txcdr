/**
 * Data for an annotation pin's event card
 */
export interface EventMarker {
  latlng: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
}
