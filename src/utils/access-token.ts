class Token {
  private tokenKey: string;

  /**
   * Creates an instance of the Token class.
   * @param {string} tokenKey - The key used to store the token in localStorage.
   */
  constructor(tokenKey: string) {
    this.tokenKey = tokenKey;
  }

  /**
   * Sets the token in localStorage.
   * @param {string} token - The token to be stored.
   */
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Retrieves the token from localStorage.
   * @returns {string | null} The token if found, otherwise null.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Removes the token from localStorage.
   */
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Checks if the token exists in localStorage.
   * @returns {boolean} True if the token exists, otherwise false.
   */
  hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}

export const access_token = new Token("access_token");
