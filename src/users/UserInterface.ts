export interface ICreateUserInput {
  username: string;
  password: string;
  displayName?: string;
  membershipTier?: string;
  contactNumber?: string;
}

export interface IUpdateUserInput {
  displayName?: string;
  membershipTier?: string;
  contactNumber?: string;
}

export interface ICreateUserProfileInput {
  dob: string;
  age: number;
  role: string;
}
