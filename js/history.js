import { PERFORMANCE_CONFIG } from './config.js';

/**
 * Gerenciamento de histórico de cálculos da EcoTrip.
 * Armazena e recupera cálculos anteriores usando localStorage.
 */

const STORAGE_KEY = 'ecotrip_calculation_history';

/**
 * Interface para um item do histórico:
 * @typedef {Object} HistoryItem
 * @property {number} id - ID único do cálculo
 * @property {number} distanceKm - Distância em km
 * @property {string} transportType - Tipo de transporte
 * @property {number} co2Emission - Emissão calculada em kg CO2
 * @property {Date} timestamp - Data/hora do cálculo
 */

/**
 * Carrega o histórico do localStorage.
 * @returns {HistoryItem[]} Array de itens do histórico
 */
const loadHistory = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Erro ao carregar histórico:', error);
    return [];
  }
};

/**
 * Salva o histórico no localStorage.
 * @param {HistoryItem[]} history - Array de itens do histórico
 */
const saveHistory = (history) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.warn('Erro ao salvar histórico:', error);
  }
};

/**
 * Adiciona um novo cálculo ao histórico.
 * Mantém apenas os cálculos mais recentes conforme configuração.
 * @param {number} distanceKm - Distância em km
 * @param {string} transportType - Tipo de transporte
 * @param {number} co2Emission - Emissão calculada
 */
export const addToHistory = (distanceKm, transportType, co2Emission) => {
  const history = loadHistory();

  const newItem = {
    id: Date.now(),
    distanceKm,
    transportType,
    co2Emission,
    timestamp: new Date().toISOString(),
  };

  history.unshift(newItem);

  // Mantém apenas os cálculos mais recentes
  const trimmedHistory = history.slice(0, PERFORMANCE_CONFIG.maxHistorySize);

  saveHistory(trimmedHistory);
};

/**
 * Retorna o histórico de cálculos.
 * @returns {HistoryItem[]} Array de itens do histórico
 */
export const getHistory = () => loadHistory();

/**
 * Limpa todo o histórico de cálculos.
 */
export const clearHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Erro ao limpar histórico:', error);
  }
};

/**
 * Remove um item específico do histórico.
 * @param {number} id - ID do item a ser removido
 */
export const removeFromHistory = (id) => {
  const history = loadHistory();
  const filteredHistory = history.filter(item => item.id !== id);
  saveHistory(filteredHistory);
};

/**
 * Retorna estatísticas do histórico.
 * @returns {Object} Estatísticas do histórico
 */
export const getHistoryStats = () => {
  const history = loadHistory();

  if (history.length === 0) {
    return {
      totalCalculations: 0,
      averageDistance: 0,
      averageEmission: 0,
      mostUsedTransport: null,
    };
  }

  const totalDistance = history.reduce((sum, item) => sum + item.distanceKm, 0);
  const totalEmission = history.reduce((sum, item) => sum + item.co2Emission, 0);

  const transportCount = history.reduce((acc, item) => {
    acc[item.transportType] = (acc[item.transportType] || 0) + 1;
    return acc;
  }, {});

  const mostUsedTransport = Object.entries(transportCount)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || null;

  return {
    totalCalculations: history.length,
    averageDistance: Math.round(totalDistance / history.length),
    averageEmission: Number((totalEmission / history.length).toFixed(2)),
    mostUsedTransport,
  };
};
