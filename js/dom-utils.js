/**
 * Utilitários simples para consultas DOM e criação de elementos.
 */
export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsOrThrow(selector, scope = document) {
  const element = qs(selector, scope);

  if (!element) {
    throw new Error(`Elemento não encontrado: ${selector}`);
  }

  return element;
}

export function createElement(tag, options = {}) {
  const element = document.createElement(tag);

  if (options.className) {
    element.className = options.className;
  }

  if (options.attributes) {
    Object.entries(options.attributes).forEach(([name, value]) => {
      element.setAttribute(name, value);
    });
  }

  return element;
}
