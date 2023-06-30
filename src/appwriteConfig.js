import { Client, Databases, Account } from 'appwrite';

export const PROJECT_ID = '649c9624c091fba90803';
export const DATABASE_ID = '649da4e06287410a5a75';
export const COLLECTION_ID_MESSAGES = '649da4e56a3e5e40252e';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('649c9624c091fba90803');

export const databases = new Databases(client);
export const account = new Account(client);

export default client;