import ISagaPayload from "@redux/ts/ISagaPayload";

export const sell = (payload: ISagaPayload): any => ({
  type: `stock/sell`,
  payload,
});
