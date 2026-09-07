export const carBrands = [
  { name: 'Toyota', badge: 'T', tone: 'from-red-500 to-red-700', models: ['Camry', 'Corolla', 'RAV4', 'Land Cruiser', 'Prius'] },
  { name: 'BMW', badge: 'BMW', tone: 'from-blue-500 to-blue-700', models: ['3 Series', '5 Series', 'X3', 'X5', 'M4'] },
  { name: 'Mercedes-Benz', badge: 'M', tone: 'from-slate-400 to-slate-700', models: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE'] },
  { name: 'Lexus', badge: 'L', tone: 'from-slate-500 to-slate-800', models: ['ES', 'RX', 'LX', 'NX', 'IS'] },
  { name: 'Hyundai', badge: 'H', tone: 'from-sky-500 to-blue-700', models: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Solaris'] },
  { name: 'Kia', badge: 'KIA', tone: 'from-slate-700 to-black', models: ['K5', 'Sportage', 'Sorento', 'Rio', 'Carnival'] },
  { name: 'Volkswagen', badge: 'VW', tone: 'from-blue-600 to-indigo-800', models: ['Polo', 'Golf', 'Passat', 'Tiguan', 'Touareg'] },
  { name: 'Audi', badge: 'A', tone: 'from-red-600 to-slate-800', models: ['A4', 'A6', 'Q5', 'Q7', 'e-tron'] },
  { name: 'Honda', badge: 'H', tone: 'from-red-600 to-red-800', models: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit'] },
  { name: 'Ford', badge: 'F', tone: 'from-blue-600 to-blue-900', models: ['Focus', 'Mondeo', 'Explorer', 'Ranger', 'Mustang'] },
];

export function findCarBrand(value) {
  const query = value.trim().toLowerCase();
  if (!query) return null;
  return carBrands.find((brand) => `${brand.name} ${brand.models.join(' ')}`.toLowerCase().includes(query)
    || query.includes(brand.name.toLowerCase())
    || brand.models.some((model) => query.includes(model.toLowerCase()))) || null;
}
