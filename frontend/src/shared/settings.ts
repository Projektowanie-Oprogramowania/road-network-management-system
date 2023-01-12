export const apiUrl: string = 'http://localhost:8080';

export const userID: number = 0; // Ig potrzebne do niektórych requestów będzie

export const role = 'admin';

export const getRole = (): string => role;
export const getRoleParam = (): object => ({ role: role });
