// types/wit.ts

export interface WitEntity {
  id: string;
  name: string;
  role: string;
  start: number;
  end: number;
  body: string;
  confidence: number;
  entities: unknown[];
  value: string;
  type: string;
}

export interface WitIntent {
  id: string;
  name: string;
  confidence: number;
}

export interface WitResponse {
  text: string;
  intents: WitIntent[];
  entities: {
    [key: string]: WitEntity[];
  };
  traits?: {
    [key: string]: {
      id: string;
      value: string;
      confidence: number;
    }[];
  };
}

export interface WitRequestBody {
  message: string;
}

export interface WitContext {
  message: string;
  reference_time?: string;
  timezone?: string;
  locale?: string;
  coords?: {
    lat: number;
    long: number;
  };
  thread_id?: string;
  session_id?: string;
}