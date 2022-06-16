export const postalCodeValidation = (postalCode: string): boolean => {
  const isValidated = /^\d{3}-\d{4}$/.test(postalCode);
  return isValidated;
};
