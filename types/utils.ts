export interface FetchDataProp {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: { [key: string]: any };
}