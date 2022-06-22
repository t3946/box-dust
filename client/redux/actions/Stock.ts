import ISagaPayload from "@redux/ts/ISagaPayload";

export const sell = (payload: ISagaPayload): any => ({
  type: `stock/sell`,
  payload,
});

export const get = (payload: ISagaPayload): any => ({
  type: `stock/get`,
  payload,
});
