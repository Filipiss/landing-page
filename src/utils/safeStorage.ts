/**
 * localStorage pode lançar exceção (modo privado, armazenamento bloqueado,
 * cota cheia). Estas funções nunca lançam: na falha, leem null e ignoram a escrita.
 */
export const safeStorage = {
  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Sem persistência: a preferência vale só para esta visita.
    }
  },
  remove(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignorado pelo mesmo motivo de set().
    }
  },
};
