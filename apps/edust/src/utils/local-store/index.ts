import { AccessToken } from "./access-token";

export class LocalStorage {
  private readonly key = "edust";

  accessToken: AccessToken;

  constructor() {
    this.accessToken = new AccessToken();
  }

  private getItems(): Record<string, unknown> | null {
    const db = localStorage.getItem(this.key) || "{}";
    return JSON.parse(db);
  }

  setItem(key: string, value: string): void {
    const db = this.getItems() || {};
    localStorage.setItem(this.key, JSON.stringify({ ...db, [key]: value }));
  }

  getItem(key: string): string | undefined {
    const db = this.getItems();
    return db ? (db[key] as string | undefined) : undefined;
  }
}

export const localStore = new LocalStorage();
