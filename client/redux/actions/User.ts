import ISagaPayload from "@redux/ts/ISagaPayload";

const prefix = "USER";

export const registration = (payload: ISagaPayload): any => ({
  type: `${prefix}_REGISTRATION`,
  payload,
});

export const login = (payload: ISagaPayload): any => ({
  type: `${prefix}_LOGIN`,
  payload,
});