export interface YesNoMaybeResponse {
  answer: "yes" | "no" | "maybe";
  forced: boolean;
  image:  string;
}
