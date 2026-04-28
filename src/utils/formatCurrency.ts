export const formatCurrency = (n: number): string => {
  if (!isFinite(n)) return "0€";
  return `${Math.round(n).toLocaleString("lv-LV")}€`;
};

export const formatRange = (min: number, max: number): string =>
  `${formatCurrency(min)}–${formatCurrency(max)}`;
