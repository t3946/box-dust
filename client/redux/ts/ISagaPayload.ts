export default interface ISagaPayload {
  data: Record<string, any>;
  callback?: () => void;
}
