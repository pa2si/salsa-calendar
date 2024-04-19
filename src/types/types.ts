export interface Event {
  id: number;
  imageUrl: string;
  title: string;
  date: Date;
  city: string;
  location: string;
  street: string;
  number: string;
  postal: string;
  country: string;
  genre: string;
}

export interface User {
  emailAddresses: { emailAddress: string }[];
}
