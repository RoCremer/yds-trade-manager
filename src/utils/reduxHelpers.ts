// Redux helpers
// Generates a redux action with type only (no payload)
export const emptyActionGenerator = (type: string) => () => ({ type });

// Generates a redux action with type and payload
export const payloadActionGenerator = (type: string) => (payload: any) => ({ type, payload });
