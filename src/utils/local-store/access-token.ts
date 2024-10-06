import { localStore } from ".";

export class AccessToken {
  private readonly access_token = "access_token";

  get(): string | undefined {
    return localStore.getItem(this.access_token);
  }
  has(): boolean {
    return !!localStore.getItem("access_token");
  }
  set(token: string) {
    localStore.setItem(this.access_token, token);
  }
}
