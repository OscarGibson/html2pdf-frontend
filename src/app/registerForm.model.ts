export class RegisterForm {
  constructor(
    public login: string,
    public password: string,
    public passwordrepeat: string,
    public email: string,
    public firstName: string,
    public lastName: string
  ) {}
}
