import { apiClient } from '@/lib/api/client';

describe('apiClient', () => {
  it('defaults the baseURL to the local API when no env var is set', () => {
    expect(apiClient.defaults.baseURL).toBe('http://localhost:8000/api');
  });

  it('sends JSON by default', () => {
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('attaches a bearer token from localStorage to outgoing requests', async () => {
    localStorage.setItem('authToken', 'test-token');
    const config = await apiClient.interceptors.request.handlers[0].fulfilled({ headers: {} });
    expect(config.headers.Authorization).toBe('Bearer test-token');
    localStorage.removeItem('authToken');
  });

  it('omits the Authorization header when no token is stored', async () => {
    const config = await apiClient.interceptors.request.handlers[0].fulfilled({ headers: {} });
    expect(config.headers.Authorization).toBeUndefined();
  });
});
