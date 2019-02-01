import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService<T> {
  private _dataSession: T[];

  constructor(data: T[]) {
    this._dataSession = data;
  }

  getAll(): T[] {
    return this._dataSession;
  }

  getById(id: number): T {
    const item: any = this._dataSession.find((x: any) => x.id === id);
    return <T>JSON.parse(item);
  }

  add(item: T): void {
    this._dataSession.push(item);
  }

  delete(id: number): void {
    const index = this._dataSession.findIndex((x: any) => x.id === id);
    if (index !== -1) {
      this._dataSession.splice(index, 1);
    }
  }

  update(id: number, item: T): void {
    const index = this._dataSession.findIndex((x: any) => x.id === id);
    if (index !== -1) {
      this._dataSession.splice(index, 1, item);
    }
  }
}
