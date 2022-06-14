export interface HagakiData {
  id: string;
  postalcode_left: string;
  postalcode_right: string;
  address1: string;
  address2: string;
  lastName: string;
  firstNameSuffixList: {
    firstName: string;
    suffix: string;
  }[];
}

export interface HagakiCSVData {
  postal_code: string;
  address1: string;
  address2: string;
  last_name: string;
  first_name1: string;
  first_name2: string;
  first_name3: string;
  first_name4: string;
  suffix1: string;
  suffix2: string;
  suffix3: string;
  suffix4: string;
}
