import { EMISSION_FACTORS, SUPPORTED_TRANSPORT_TYPES, UI_CONFIG } from './config.js';

const normalizeTransportType = (transportType) => String(transportType).trim().toLowerCase();

const assertValidDistance = (distanceKm) => {
  if (typeof distanceKm !== 'number' || Number.isNaN(distanceKm)) {
    throw new TypeError('Distância deve ser um número válido.');
  }

  if (distanceKm <= 0) {
    throw new RangeError('Distância deve ser maior que zero.');
  }
};

const assertValidTransportType = (transportType) => {
  if (typeof transportType !== 'string' || transportType.trim().length === 0) {
    throw new TypeError('Tipo de transporte deve ser uma string não vazia.');
  }

  const key = normalizeTransportType(transportType);

  if (!Object.prototype.hasOwnProperty.call(EMISSION_FACTORS, key)) {
    const supported = SUPPORTED_TRANSPORT_TYPES.join(', ');
    throw new Error(`Tipo de transporte inválido. Use um dos seguintes: ${supported}.`);
  }
};

const getEmissionFactor = (transportType) => EMISSION_FACTORS[normalizeTransportType(transportType)];

export const calculateCO2Emission = (distanceKm, transportType) => {
  assertValidDistance(distanceKm);
  assertValidTransportType(transportType);

  const emissionFactor = getEmissionFactor(transportType);
  return Number((distanceKm * emissionFactor).toFixed(UI_CONFIG.decimalPlaces));
};

// Re-export para compatibilidade
export { SUPPORTED_TRANSPORT_TYPES };
