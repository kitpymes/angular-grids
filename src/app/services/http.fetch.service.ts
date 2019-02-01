import { Injectable } from '@angular/core';

@Injectable()
export class HttpFetchService {
  constructor() {}

  async getJson(url: string): Promise<any> {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const corsUrl = 'https://cors-anywhere.herokuapp.com/';

    try {
      const response = await fetch(`${corsUrl}${url}`, config);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}
