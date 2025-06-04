export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  role_id: number;

  constructor(id: number, username: string, password: string, email: string, role_id: number) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role_id = role_id;
  }
}
