const cityCoordinates = {
  // Existing
  delhi: { lat: 28.6139, lng: 77.2090 },
  mumbai: { lat: 19.0760, lng: 72.8777 },
  kolkata: { lat: 22.5726, lng: 88.3639 },
  chennai: { lat: 13.0827, lng: 80.2707 },
  bangalore: { lat: 12.9716, lng: 77.5946 },

  // ⭐ Your new pickup areas
  narela: { lat: 28.8520, lng: 77.0920 },
  "rajouri garden": { lat: 28.6513, lng: 77.1235 },
  mayapuri: { lat: 28.6412, lng: 77.1140 },
};

export function getCoordinates(location) {
  if (!location) return null;

  const key = location.trim().toLowerCase();

  return cityCoordinates[key] || null;
}
