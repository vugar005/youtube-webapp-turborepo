/* eslint-disable */

interface Language {
  iso_code: string;
  name: string;
  name_native: string;
}

interface Country {
  name: string;
  iso_code: string;
  name_native: string;
  phone_code: string;
  capital: string;
  currency: string;
  flag: string;
  languages: Language[];
  is_in_european_union: boolean;
}

interface State {
  name: string;
}

interface City {
  name: string;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface Continent {
  code: string;
  name: string;
}

export interface CountryCodeDTO {
  country: Country;
  state: State;
  city: City;
  postcode: string;
  location: Location;
  continent: Continent;
  ip: string;
}
