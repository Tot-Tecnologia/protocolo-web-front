import { SetStorage, GetStorage } from "@/data/protocols/cache";

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set<T>(key: string, value: T): void {
    if (value) {
      localStorage.setItem(this.getKey(key), JSON.stringify(value));
    } else {
      localStorage.removeItem(this.getKey(key));
    }
  }

  get<T>(key: string): T | null {
    const value = localStorage.getItem(this.getKey(key));
    return value != null ? (JSON.parse(value) as T) : null;
  }

  private getKey(key: string): string {
    return `@ProtocoloWeb__Key=${key}`;
  }
}
