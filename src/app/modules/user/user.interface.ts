export interface IUser extends Document {
  name: string;
  email: string;
  isDeleted: boolean;
}
