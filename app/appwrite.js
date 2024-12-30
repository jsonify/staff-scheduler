import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6771cd040032dd3eed80');

export const account = new Account(client);
export { ID } from 'appwrite';
