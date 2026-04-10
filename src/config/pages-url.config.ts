class DASHBOARD {
  private root = '';

  private withRoot(path: string) {
    return `${this.root}${path}`;
  }

  HOME = this.root || "/";

  SIGN_IN = this.withRoot("/sign-in");
  SIGN_UP = this.withRoot("/sign-up");
  EMAIL_VERIFICATION = this.withRoot("/email-verification");

  FORGOT_PASSWORD = this.withRoot("/forgot-password");
  RESET_PASSWORD = this.withRoot("/reset-password");
}

export const DASHBOARD_PAGES = new DASHBOARD();
