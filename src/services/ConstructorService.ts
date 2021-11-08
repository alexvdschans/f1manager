import http from "@/http-service";
import Constructor from "@/types/Constructor";

export type PaginationType = {
  current: number;
  last: number;
};

export type QueryParameters = {
  [key: string]: boolean | number | string;
};

export default {
  async get(
    params: QueryParameters
  ): Promise<{ constructors: Constructor[]; pagination: PaginationType }> {
    const { data } = await http.get("/2021/constructors.json", { params });
    return {
      constructors: data.MRData.ConstructorTable.Constructors,
      pagination: {
        current: 1,
        last: 1,
      },
    };
  },
};
