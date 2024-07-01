import { EventDetails } from "../types/event";

/**
 * Mock API for events
 */
export const events: Record<number, EventDetails> = {
  1: {
    id: 1,
    eventName: "Houston, Texas",
    description:
      "Join us in Houston, Texas, for a crucial disaster canvassing event aimed at supporting our community in times of need. As we come together, volunteers will go door-to-door to provide information, resources, and assistance to those affected by recent disasters. Your participation can make a significant impact, helping us build resilience and solidarity in Houston during challenging times.",
    numSurveyed: 3,
    numAddresses: 30,
    numVolunteers: 50,
    contactName: "Gary Flaharty",
    severity: "Moderate",
    registered: true,
  },
  2: {
    id: 2,
    eventName: "Austin, Texas",
    description:
      "Join us in Austin, Texas, for a crucial disaster canvassing event aimed at supporting our community in times of need. As we come together, volunteers will go door-to-door to provide information, resources, and assistance to those affected by recent disasters. Your participation can make a significant impact, helping us build resilience and solidarity in Austin during challenging times.",
    numSurveyed: 10,
    numAddresses: 30,
    numVolunteers: 50,
    contactName: "Gary Flaharty",
    severity: "Severe",
    registered: true,
  },
  3: {
    id: 3,
    eventName: "El Paso, Texas",
    description:
      "Join us in El Paso, Texas, for a crucial disaster canvassing event aimed at supporting our community in times of need. As we come together, volunteers will go door-to-door to provide information, resources, and assistance to those affected by recent disasters. Your participation can make a significant impact, helping us build resilience and solidarity in El Paso during challenging times.",
    numSurveyed: 2,
    numAddresses: 10,
    numVolunteers: 25,
    contactName: "Gary Flaharty",
    severity: "Low",
    registered: true,
  },
  4: {
    id: 4,
    eventName: "Dallas, Texas",
    description:
      "Join us in Dallas, Texas, for a crucial disaster canvassing event aimed at supporting our community in times of need. As we come together, volunteers will go door-to-door to provide information, resources, and assistance to those affected by recent disasters. Your participation can make a significant impact, helping us build resilience and solidarity in Dallas during challenging times.",
    numSurveyed: 9,
    numAddresses: 80,
    numVolunteers: 24,
    contactName: "Gary Flaharty",
    severity: "Severe",
    registered: true,
  },
  5: {
    id: 5,
    eventName: "Houston, Texas",
    description:
      "Join us in Houston, Texas, for a crucial disaster canvassing event aimed at supporting our community in times of need. As we come together, volunteers will go door-to-door to provide information, resources, and assistance to those affected by recent disasters. Your participation can make a significant impact, helping us build resilience and solidarity in Houston during challenging times.",
    numSurveyed: 14,
    numAddresses: 50,
    numVolunteers: 28,
    contactName: "Gary Flaharty",
    severity: "Moderate",
    registered: true,
  },
} as const;

// Mock API call for retrieving events by ID
export function fetchEvent(id: number): EventDetails {
  return events[id];
}
