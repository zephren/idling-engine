class DataStorage {
  get(key: string, defaultValue?: any) {
    return localStorage[key] ? JSON.parse(localStorage[key]) : defaultValue;
  }

  set(key: string, value: any) {
    localStorage[key] = JSON.stringify(value);
  }

  delete(key: string) {
    delete localStorage[key];
  }
}

export const dataStorage = new DataStorage();
