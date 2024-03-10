interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  registration_number: string;
  id?: string;
  avatar?: string;
}

export { ICreateUserDTO };
