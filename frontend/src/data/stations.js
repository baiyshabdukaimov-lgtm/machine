// Replace `logo` with a local path (for example /logos/autopro.svg) when assets are available.
const source = [
  ['AutoPro Garage', 42.8781, 74.6033, 4.9, 'suspension', '#0ea5e9'], ['MotorLab', 42.8614, 74.5929, 4.8, 'engine', '#f97316'],
  ['Paint Point', 42.8865, 74.6301, 4.7, 'paint', '#ec4899'], ['Tire City', 42.8690, 74.6422, 4.8, 'tires', '#8b5cf6'],
  ['Bishkek Drive', 42.8968, 74.5807, 4.9, 'diagnostics', '#14b8a6'], ['Master Auto', 42.8503, 74.6149, 4.6, 'engine', '#f59e0b'],
  ['Nomad Service', 42.8797, 74.6568, 4.8, 'electrics', '#6366f1'], ['Kyrgyz Motors', 42.8448, 74.5805, 4.7, 'suspension', '#22c55e'],
  ['Pro Wheel', 42.9045, 74.6188, 4.8, 'tires', '#ef4444'], ['Vertex Garage', 42.8894, 74.5974, 4.9, 'diagnostics', '#06b6d4'],
  ['Altyn Auto', 42.8667, 74.5741, 4.6, 'paint', '#d946ef'], ['TechCar Bishkek', 42.8540, 74.6382, 4.7, 'electrics', '#3b82f6'],
];

export const stations = source.map(([name, latitude, longitude, rating, specialization, accent], index) => {
  const freeSlots = 1 + (index % 4);
  const queueCount = index % 5;
  return {
    id: index + 1, name, logo: '', latitude, longitude, rating, specialization, accent,
    address: `Бишкек, ${['пр. Чүй', 'ул. Байтик Баатыра', 'ул. Жибек Жолу'][index % 3]}, ${120 + index * 7}`,
    queueCount, freeSlots, inService: 2 + (index % 4),
    currentQueue: Array.from({ length: queueCount }, (_, queueIndex) => ({ position: queueIndex + 1, label: `AS-${String(index + 1).padStart(2, '0')}${queueIndex + 1}` })),
    bays: [{ id: index * 10 + 1, name: 'Box A', category: specialization }, { id: index * 10 + 2, name: 'Box B', category: specialization }],
  };
});
