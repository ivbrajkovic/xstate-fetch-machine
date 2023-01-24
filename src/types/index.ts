// generated with https://jvilk.com/MakeTypes/

export interface User {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: DobOrRegistered;
  registered: DobOrRegistered;
  phone: string;
  cell: string;
  id: Id;
  picture: Picture;
  nat: string;
}
export interface Name {
  title: string;
  first: string;
  last: string;
}
export interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: Coordinates;
  timezone: Timezone;
}
export interface Street {
  number: number;
  name: string;
}
export interface Coordinates {
  latitude: string;
  longitude: string;
}
export interface Timezone {
  offset: string;
  description: string;
}
export interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}
export interface DobOrRegistered {
  date: string;
  age: number;
}
export interface Id {
  name: string;
  value: string | null;
}
export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export type UserFilters = {
  gender: "male" | "female" | "all";
  name: string;
};

export type UserMachineContext<T> = {
  filters: UserFilters;
  error: string;
  users: User[];
  // fetchMachine: ActorRef<FetchMachineEvents<T>, any> | null;
};

export type UserMachineEvent =
  | { type: "FETCH_USERS" }
  | { type: "CHANGE_NAME"; data: Partial<UserFilters> }
  | { type: "CHANGE_GENDER"; data: Partial<UserFilters> }
  | {
      type: "error.platform.fetchUsers";
      data: string;
    }
  | {
      type: "done.invoke.fetchUsers";
      data: User[];
    };
