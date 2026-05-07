import { createElement, qsOrThrow } from './dom-utils.js';
import { UI_CONFIG, ACCESSIBILITY_CONFIG, I18N_CONFIG } from './config.js';

const SELECTORS = Object.freeze({
  form: '.travel-form',
  distanceInput: 'input[name="distance"]',
  transportSelect: 'select[name="transport"]',
  resultValue: '.result-value',
  resultNote: '.result-note',
});

const ERROR_MESSAGE_CLASS = 'form-feedback';
const DEFAULT_RESULT_TEXT = UI_CONFIG.defaultResultText;
const NO_RESULT_MESSAGE = UI_CONFIG.noResultMessage;

const getForm = () => qsOrThrow(SELECTORS.form);

const getResultElements = () => ({
  resultValue: qsOrThrow(SELECTORS.resultValue),
  resultNote: qsOrThrow(SELECTORS.resultNote),
});

export const getFormValues = (form) => ({
  distanceKm: Number(form.distance.value),
  transportType: String(form.transport.value).trim(),
});

const ensureErrorElement = (form) => {
  let feedback = form.querySelector(`.${ERROR_MESSAGE_CLASS}`);

  if (!feedback) {
    feedback = createElement('p', { className: ERROR_MESSAGE_CLASS });
    feedback.setAttribute('role', ACCESSIBILITY_CONFIG.errorRole);
    form.appendChild(feedback);
  }

  return feedback;
};

export const showError = (form, message) => {
  const feedback = ensureErrorElement(form);
  feedback.textContent = message;
  feedback.style.display = 'block';
};

export const clearError = (form) => {
  const feedback = form.querySelector(`.${ERROR_MESSAGE_CLASS}`);

  if (!feedback) {
    return;
  }

  feedback.textContent = '';
  feedback.style.display = 'none';
};

export const renderResult = (co2Kg) => {
  const { resultValue, resultNote } = getResultElements();

  resultValue.textContent = `${co2Kg.toFixed(UI_CONFIG.decimalPlaces)} kg CO₂`;
  resultNote.textContent = 'Emissão estimada com base nos dados fornecidos.';
};

export const resetResultPanel = () => {
  const { resultValue, resultNote } = getResultElements();

  resultValue.textContent = DEFAULT_RESULT_TEXT;
  resultNote.textContent = NO_RESULT_MESSAGE;
};

export const validateFormValues = ({ distanceKm, transportType }) => {
  if (Number.isNaN(distanceKm) || distanceKm <= 0) {
    return UI_CONFIG.errorMessages.invalidDistance;
  }

  if (!transportType) {
    return UI_CONFIG.errorMessages.invalidTransport;
  }

  return null;
};

export const initCalculatorUi = ({ onSubmit, onReset, onInputChange }) => {
  const form = getForm();
  const distanceInput = qsOrThrow(SELECTORS.distanceInput, form);
  const transportSelect = qsOrThrow(SELECTORS.transportSelect, form);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    onSubmit(form);
  });

  form.addEventListener('reset', () => onReset(form));

  const handleUpdate = () => onInputChange(form);

  distanceInput.addEventListener('input', handleUpdate);
  transportSelect.addEventListener('change', handleUpdate);
};

/**
 * Renderiza a lista de histórico na interface.
 * @param {HistoryItem[]} history - Array de itens do histórico
 * @param {Function} onRemove - Callback para remover item
 */
export const renderHistory = (history, onRemove) => {
  const historyList = qsOrThrow('.history-list');
  const historyEmpty = qsOrThrow('.history-empty');

  // Limpa lista atual
  const existingItems = historyList.querySelectorAll('.history-item');
  existingItems.forEach(item => item.remove());

  if (history.length === 0) {
    historyEmpty.style.display = 'block';
    return;
  }

  historyEmpty.style.display = 'none';

  history.forEach(item => {
    const historyItem = createElement('div', { className: 'history-item' });

    const details = createElement('div', { className: 'history-details' });
    details.innerHTML = `
      <div class="history-transport">${formatTransportType(item.transportType)}</div>
      <div class="history-values">
        ${item.distanceKm} ${I18N_CONFIG.units.distance} → <span class="history-emission">${item.co2Emission} ${I18N_CONFIG.units.emission}</span>
      </div>
    `;

    const removeBtn = createElement('button', {
      className: 'history-remove',
      attributes: { 'aria-label': `Remover cálculo de ${item.distanceKm} km` }
    });
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', () => onRemove(item.id));

    historyItem.appendChild(details);
    historyItem.appendChild(removeBtn);
    historyList.appendChild(historyItem);
  });
};

/**
 * Formata o tipo de transporte para exibição.
 * @param {string} transportType - Tipo de transporte
 * @returns {string} Nome formatado
 */
const formatTransportType = (transportType) => {
  const names = {
    car: 'Carro',
    bus: 'Ônibus',
    train: 'Trem',
    airplane: 'Avião',
    bicycle: 'Bicicleta',
    walking: 'Caminhada',
  };

  return names[transportType] || transportType;
};

/**
 * Inicializa a funcionalidade de toggle do histórico.
 * @param {Function} onToggle - Callback para quando o histórico é mostrado/ocultado
 */
export const initHistoryToggle = (onToggle) => {
  const toggleBtn = qsOrThrow('.history-toggle');
  const historyList = qsOrThrow('.history-list');

  toggleBtn.addEventListener('click', () => {
    const isVisible = !historyList.hidden;
    historyList.hidden = isVisible;

    toggleBtn.textContent = isVisible ? 'Mostrar histórico' : 'Ocultar histórico';

    if (!isVisible) {
      onToggle();
    }
  });
};
