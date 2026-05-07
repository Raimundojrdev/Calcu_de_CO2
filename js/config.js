/**
 * Configurações globais da aplicação EcoTrip.
 * Centraliza constantes e configurações reutilizáveis.
 */

/**
 * Fatores de emissão de CO2 por quilômetro para cada modo de transporte.
 * Valores em kg CO2/km, baseados em dados aproximados.
 * Fontes: IPCC, EPA e estudos de transporte sustentável.
 */
export const EMISSION_FACTORS = Object.freeze({
  car: 0.192,      // Carro médio (gasolina/diesel)
  bus: 0.105,      // Ônibus urbano/intermunicipal
  train: 0.041,    // Trem elétrico
  airplane: 0.255, // Avião comercial (média)
  bicycle: 0,      // Bicicleta (zero emissões)
  walking: 0,      // Caminhada (zero emissões)
});

/**
 * Tipos de transporte suportados pela aplicação.
 * Derivado automaticamente dos fatores de emissão.
 */
export const SUPPORTED_TRANSPORT_TYPES = Object.freeze(Object.keys(EMISSION_FACTORS));

/**
 * Configurações de validação para entradas do usuário.
 */
export const VALIDATION_RULES = Object.freeze({
  distance: {
    min: 0.1,
    max: 10000,
    step: 0.1,
  },
});

/**
 * Configurações de UI e experiência do usuário.
 */
export const UI_CONFIG = Object.freeze({
  decimalPlaces: 2,
  defaultResultText: '- kg CO₂',
  noResultMessage: 'Insira as informações acima para ver o impacto da viagem.',
  errorMessages: {
    invalidDistance: 'Informe uma distância válida maior que zero.',
    invalidTransport: 'Selecione um tipo de transporte.',
    calculationError: 'Erro ao calcular emissão. Verifique os dados.',
  },
});

/**
 * Configurações de acessibilidade.
 */
export const ACCESSIBILITY_CONFIG = Object.freeze({
  errorRole: 'alert',
  liveRegion: 'polite',
});

/**
 * Configurações de performance e otimização.
 */
export const PERFORMANCE_CONFIG = Object.freeze({
  debounceDelay: 300, // ms para debounce de inputs
  maxHistorySize: 10, // máximo de cálculos armazenados no histórico
});

/**
 * Configurações de internacionalização (i18n).
 * Suporte básico para português brasileiro.
 */
export const I18N_CONFIG = Object.freeze({
  locale: 'pt-BR',
  currency: 'BRL',
  units: {
    distance: 'km',
    weight: 'kg',
    emission: 'CO₂',
  },
});

/**
 * Configurações de desenvolvimento e debug.
 */
export const DEBUG_CONFIG = Object.freeze({
  enableLogging: false,
  logLevel: 'warn', // 'debug', 'info', 'warn', 'error'
});

/**
 * URLs e endpoints para integração futura (ex: APIs de clima, rotas).
 */
export const API_ENDPOINTS = Object.freeze({
  // Placeholder para futuras integrações
  weather: 'https://api.weather.com/v1/',
  routes: 'https://api.routing.com/v1/',
});

/**
 * Metadados da aplicação.
 */
export const APP_METADATA = Object.freeze({
  name: 'EcoTrip',
  version: '1.0.0',
  description: 'Calculadora de impacto ambiental para viagens',
  author: 'Equipe EcoTrip',
  license: 'MIT',
});
