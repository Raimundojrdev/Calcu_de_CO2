import { calculateCO2Emission } from './calculator.js';
import {
  clearError,
  getFormValues,
  initCalculatorUi,
  resetResultPanel,
  renderResult,
  showError,
  validateFormValues,
  renderHistory,
  initHistoryToggle,
} from './ui.js';
import { addToHistory, getHistory, removeFromHistory } from './history.js';

const canRenderLiveResult = ({ distanceKm, transportType }) =>
  transportType !== '' && !Number.isNaN(distanceKm) && distanceKm > 0;

const renderEmission = (form, { distanceKm, transportType }) => {
  try {
    const co2Value = calculateCO2Emission(distanceKm, transportType);
    renderResult(co2Value);
    addToHistory(distanceKm, transportType, co2Value);
  } catch (error) {
    showError(form, error.message);
  }
};

const handleFormSubmit = (form) => {
  clearError(form);

  const formValues = getFormValues(form);
  const validationMessage = validateFormValues(formValues);

  if (validationMessage) {
    showError(form, validationMessage);
    return;
  }

  renderEmission(form, formValues);
};

const handleFormReset = (form) => {
  clearError(form);
  resetResultPanel();
};

const handleFormInput = (form) => {
  clearError(form);

  const formValues = getFormValues(form);

  if (!canRenderLiveResult(formValues)) {
    return;
  }

  renderEmission(form, formValues);
};

const handleHistoryToggle = () => {
  const history = getHistory();
  renderHistory(history, handleRemoveFromHistory);
};

const handleRemoveFromHistory = (id) => {
  removeFromHistory(id);
  const history = getHistory();
  renderHistory(history, handleRemoveFromHistory);
};

const initApp = () => {
  initCalculatorUi({
    onSubmit: handleFormSubmit,
    onReset: handleFormReset,
    onInputChange: handleFormInput,
  });

  initHistoryToggle(handleHistoryToggle);
};

window.addEventListener('DOMContentLoaded', initApp);
