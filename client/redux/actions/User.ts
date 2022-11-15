import ISagaPayload from "@redux/ts/ISagaPayload";

export const registration = (payload: ISagaPayload): any => ({
  type: `user/register`,
  payload,
});

export const sendConfirmEmail = (payload: ISagaPayload): any => ({
  type: `user/register/send-confirm-email`,
  payload,
});

export const confirmEmail = (payload: ISagaPayload): any => ({
  type: `user/register/confirm-email`,
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

export const play = (payload: ISagaPayload): any => ({
  type: `user/play`,
  payload,
});

export const acceptPartnership = (payload: ISagaPayload): any => ({
  type: `user/accept-partnership`,
  payload,
});
