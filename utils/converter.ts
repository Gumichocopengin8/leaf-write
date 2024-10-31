import { v4 as uuidv4 } from 'uuid';
import type { HagakiData, HagakiCSVData } from 'interfaces/hagaki';
import type { AddressRow } from 'interfaces/addressBook';
import { postalCodeValidation } from 'utils/validation';

export const convertToHagakiData = (d: AddressRow): HagakiData => {
  const isValidated = postalCodeValidation(String(d.postal_code));
  const postalCode = d.postal_code.split('-');
  const postalcodeLeft = postalCode[0];
  const postalcode_right = postalCode[1];

  if (postalcodeLeft === undefined || postalcode_right === undefined || !isValidated) {
    throw new Error('postal code format is incorrect');
  }
  const newHagakiData: HagakiData = {
    id: d.id,
    postalcode_left: postalcodeLeft,
    postalcode_right: postalcode_right,
    address1: d.address1,
    address2: d.address2,
    lastName: d.last_name,
    firstNameSuffixList: [
      { firstName: d.first_name1, suffix: d.suffix1 },
      { firstName: d.first_name2, suffix: d.suffix2 },
      { firstName: d.first_name3, suffix: d.suffix3 },
      { firstName: d.first_name4, suffix: d.suffix4 },
    ],
  };
  return newHagakiData;
};

export const convertCSVtoHagakiData = (data: HagakiCSVData[]): HagakiData[] => {
  // postal code validation
  for (const d of data) {
    const isValidated = postalCodeValidation(d.postal_code);
    if (!isValidated) {
      throw new Error(`${d.postal_code} is not a correct postalcode format`);
    }
  }

  const hagakiData: HagakiData[] = data.map((d) => {
    const postalCode = d.postal_code.split('-');
    return {
      id: uuidv4(),
      postalcode_left: postalCode?.[0] ?? '000-0000',
      postalcode_right: postalCode?.[1] ?? '000-0000',
      address1: d.address1,
      address2: d.address2,
      lastName: d.last_name,
      firstNameSuffixList: [
        { firstName: d.first_name1, suffix: d.suffix1 },
        { firstName: d.first_name2, suffix: d.suffix2 },
        { firstName: d.first_name3, suffix: d.suffix3 },
        { firstName: d.first_name4, suffix: d.suffix4 },
      ],
    };
  });
  return hagakiData;
};
