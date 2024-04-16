import Cookies from 'js-cookie';
import { API_URL, COOKIE_ACCESS_TOKEN_KEY } from '../configs/constants';

export class ApiClient {
  private baseUrl: string;
  private accessToken: string = '';

  constructor(url: string) {
    const access_token = Cookies.get(COOKIE_ACCESS_TOKEN_KEY);

    this.baseUrl = url;
    if (access_token) this.accessToken = access_token;
  }

  async handleResponse<TResult>(response: Response): Promise<TResult> {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    try {
      return await response.json();
    } catch (error) {
      throw new Error('Error parsing JSON response');
    }
  }

  public async get<TResult = unknown>(
    endpoint: string,
    queryParams?: Record<string, string | number>
  ): Promise<TResult> {
    const url = new URL(endpoint, this.baseUrl);

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
    });

    return this.handleResponse<TResult>(response);
  }

  public async post<TResult = unknown, TData = Record<string, unknown>>(
    endpoint: string,
    body: TData
  ): Promise<TResult> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    return this.handleResponse<TResult>(response);
  }

  public async put<TResult = unknown, TData = Record<string, unknown>>(
    endpoint: string,
    body: TData
  ): Promise<TResult> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    return this.handleResponse<TResult>(response);
  }

  public async delete<TResult = unknown>(endpoint: string): Promise<TResult> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers
    });

    return this.handleResponse<TResult>(response);
  }

  public async upload<TResult = unknown, TData = unknown>(
    endpoint: string,
    body: TData
  ): Promise<TResult> {
    const headers: Record<string, string> = {};
    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    console.log(body, 'body');
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body: body as any
    });

    return this.handleResponse<TResult>(response);
  }
}

export const apiClient = new ApiClient(API_URL);
