const cityCoordinates = {
  delhi: { lat: 28.6139, lng: 77.2090 },
  mumbai: { lat: 19.0760, lng: 72.8777 },
  kolkata: { lat: 22.5726, lng: 88.3639 },
  chennai: { lat: 13.0827, lng: 80.2707 },
  bangalore: { lat: 12.9716, lng: 77.5946 },
};

export function getCoordinates(location) {
  if (!location) return null;
  return cityCoordinates[location.toLowerCase()] || null;
}
