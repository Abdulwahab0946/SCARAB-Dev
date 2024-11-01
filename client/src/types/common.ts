export type Statuses = "idle" | "success" | "fail" | "loading";

export interface ConfigState {
  status: Statuses;
  error: null | string;
}
