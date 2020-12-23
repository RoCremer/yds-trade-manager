import { payloadActionGenerator } from '@utils/reduxHelpers';

export const INITIALIZE_SET_PROTOCOL = 'INITIALIZE_SET_PROTOCOL';

export const initializeSetProtocol = payloadActionGenerator(INITIALIZE_SET_PROTOCOL);
