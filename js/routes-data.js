/**
 * Dados de rotas pré-definidas para a calculadora EcoTrip.
 * Contém distâncias aproximadas entre cidades brasileiras comuns.
 * Fontes: Google Maps, IBGE e dados públicos de transporte.
 */

/**
 * Interface para uma rota:
 * @typedef {Object} Route
 * @property {string} origin - Cidade de origem
 * @property {string} destination - Cidade de destino
 * @property {number} distance - Distância em quilômetros
 * @property {string} [description] - Descrição opcional da rota
 * @property {string[]} [transportOptions] - Modos de transporte recomendados
 */

/**
 * Rotas pré-definidas entre cidades brasileiras.
 * Distâncias aproximadas baseadas em estradas principais.
 */
export const PREDEFINED_ROUTES = Object.freeze([
  {
    origin: 'São Paulo',
    destination: 'Rio de Janeiro',
    distance: 430,
    description: 'Rota pela BR-116, principal ligação entre as duas maiores cidades',
    transportOptions: ['car', 'bus', 'train', 'airplane'],
  },
  {
    origin: 'Rio de Janeiro',
    destination: 'Belo Horizonte',
    distance: 440,
    description: 'Via BR-040, conhecida como Estrada Real',
    transportOptions: ['car', 'bus', 'airplane'],
  },
  {
    origin: 'Belo Horizonte',
    destination: 'Brasília',
    distance: 740,
    description: 'Rota pela BR-040 e BR-050',
    transportOptions: ['car', 'bus', 'airplane'],
  },
  {
    origin: 'Brasília',
    destination: 'Salvador',
    distance: 1450,
    description: 'Longa viagem pela BR-020 e BR-242',
    transportOptions: ['car', 'bus', 'airplane'],
  },
  {
    origin: 'Salvador',
    destination: 'Recife',
    distance: 850,
    description: 'Via BR-101, litoral nordeste',
    transportOptions: ['car', 'bus', 'airplane'],
  },
  {
    origin: 'Recife',
    destination: 'Fortaleza',
    distance: 800,
    description: 'Rota pela BR-101 e BR-116',
    transportOptions: ['car', 'bus', 'airplane'],
  },
  {
    origin: 'Fortaleza',
    destination: 'Teresina',
    distance: 634,
    description: 'Via BR-222, ligação Ceará-Piauí',
    transportOptions: ['car', 'bus', 'airplane'],
  },
  {
    origin: 'Teresina',
    destination: 'São Luís',
    distance: 550,
    description: 'Via BR-316, rota Maranhão-Piauí',
    transportOptions: ['car', 'bus', 'airplane'],
  },
  {
    origin: 'São Luís',
    destination: 'Belém',
    distance: 950,
    description: 'Via BR-010, amazônica',
    transportOptions: ['car', 'bus', 'airplane'],
  },
  {
    origin: 'Belém',
    destination: 'Manaus',
    distance: 2650,
    description: 'Longa viagem amazônica pela BR-174',
    transportOptions: ['airplane'], // Principalmente por avião devido à distância
  },
]);

/**
 * Cidades disponíveis como origens ou destinos.
 * Extraído automaticamente das rotas pré-definidas.
 */
export const AVAILABLE_CITIES = Object.freeze([
  ...new Set(
    PREDEFINED_ROUTES.flatMap(route => [route.origin, route.destination])
  ),
].sort());

/**
 * Encontra rotas que conectam duas cidades específicas.
 * @param {string} origin - Cidade de origem
 * @param {string} destination - Cidade de destino
 * @returns {Route[]} Array de rotas encontradas
 */
export const findRoutes = (origin, destination) => {
  return PREDEFINED_ROUTES.filter(route =>
    route.origin.toLowerCase() === origin.toLowerCase() &&
    route.destination.toLowerCase() === destination.toLowerCase()
  );
};

/**
 * Busca rotas que partem de uma cidade específica.
 * @param {string} origin - Cidade de origem
 * @returns {Route[]} Array de rotas encontradas
 */
export const findRoutesFrom = (origin) => {
  return PREDEFINED_ROUTES.filter(route =>
    route.origin.toLowerCase() === origin.toLowerCase()
  );
};

/**
 * Busca rotas que chegam a uma cidade específica.
 * @param {string} destination - Cidade de destino
 * @returns {Route[]} Array de rotas encontradas
 */
export const findRoutesTo = (destination) => {
  return PREDEFINED_ROUTES.filter(route =>
    route.destination.toLowerCase() === destination.toLowerCase()
  );
};

/**
 * Calcula estatísticas das rotas disponíveis.
 * @returns {Object} Estatísticas das rotas
 */
export const getRouteStats = () => {
  const distances = PREDEFINED_ROUTES.map(route => route.distance);

  return {
    totalRoutes: PREDEFINED_ROUTES.length,
    totalCities: AVAILABLE_CITIES.length,
    averageDistance: Math.round(distances.reduce((a, b) => a + b, 0) / distances.length),
    minDistance: Math.min(...distances),
    maxDistance: Math.max(...distances),
  };
};

/**
 * Sugere rotas baseadas em critérios de sustentabilidade.
 * @param {string} origin - Cidade de origem
 * @param {string} destination - Cidade de destino
 * @returns {Route[]} Rotas ordenadas por sustentabilidade (menor emissão)
 */
export const suggestSustainableRoutes = (origin, destination) => {
  const routes = findRoutes(origin, destination);

  // Ordena por distância (aproximação de sustentabilidade)
  return routes.sort((a, b) => a.distance - b.distance);
};
