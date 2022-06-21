import ISagaPayload from "@redux/ts/ISagaPayload";

export const registration = (payload: ISagaPayload): any => ({
  type: `user/register`,
  payload,
});

export const login = (payload: ISagaPayload): any => ({
  type: `user/login`,
  payload,
});

export const update = (payload: ISagaPayload): any => ({
  type: `user/update`,
  payload,
});
