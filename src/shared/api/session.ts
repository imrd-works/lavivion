export interface AuthSession {
  getToken: () => string | null;
  onUnauthorized: () => void;
}

const anonymousSession: AuthSession = {
  getToken: () => null,
  onUnauthorized: () => {},
};

let session: AuthSession = anonymousSession;

// Inverted dependency: the transport must not import the user entity (shared
// cannot depend on upper layers), so the app layer injects the session here.
export function provideAuthSession(adapter: AuthSession): void {
  session = adapter;
}

export function getAuthToken(): string | null {
  return session.getToken();
}

export function reportUnauthorized(): void {
  session.onUnauthorized();
}
