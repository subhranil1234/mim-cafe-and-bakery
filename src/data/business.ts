export const BUSINESS = {
  name: 'MIM Bakery & Café',
  shortName: 'MIM',
  tagline: 'A moment to slow down. A chance to create.',
  subTagline: 'A bakery, a café, and a little space to create.',
  location: {
    neighbourhood: 'Salugara',
    city: 'Siliguri',
    state: 'West Bengal',
    country: 'India',
    displayAddress: 'Salugara, Siliguri, West Bengal, India',
    mapsUrl: 'https://www.google.com/maps/search/Mim+Bakery+and+Cafe+Salugara+Siliguri/',
  },
  // Approximate city-level coordinates used solely for Siliguri sunrise/sunset ambience calculation.
  // Not represented as the café's exact street address.
  ambienceCoordinates: {
    latitude: 26.7271,
    longitude: 88.3953,
    timezone: 'Asia/Kolkata',
  },
  verificationNotes: [
    'Opening hours pending confirmation from MIM.',
    'Phone / WhatsApp contact number pending confirmation from MIM.',
    'Official Instagram / social handles pending confirmation from MIM.',
    'One line at the bottom of the Sandwiches menu photo is cropped and unreadable.',
  ],
} as const;
