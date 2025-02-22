import { IsNumber, IsOptional } from "class-validator";

export interface BaseModel {
  id: number;
  documentId: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Media {
  id: number;
  documentId: string;
  url: string;
}

export interface Route {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  handler: string;
  config: {
    auth: boolean;
    middlewares: any;
    policies: any;
  };
}

export class PaginateSchema {
  @IsOptional()
  @IsNumber()
  page: number;

  constructor(data: any) {
    this.page = data?.page ?? 1;
  }
}
