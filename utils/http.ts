import { FetchDataProp } from "@/types/utils";


export const fetchData = async ({
  url,
  method = "GET",
  body = {},
}: FetchDataProp) => {
  try {
    const option: any = {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    };
    if (method === "POST" || method === "PUT") {
      option.body = JSON.stringify(body);
    }
    const res = await fetch(url, option);
    const data = await res.json();
    return data;
  } catch (err) {
    return { err };
  }
};

import { NextRequest, NextResponse } from "next/server";

interface SendResponseProps {
  status: number,
  response:any
}

export const sendResponse = (params: SendResponseProps) => {
  const {response, status} = params;
  return NextResponse.json(response, {status});
}

