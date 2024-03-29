import { faker } from "@faker-js/faker";

import type { Person } from "./columns";

// export type Person = {
//   firstName: string;
//   lastName: string;
//   age: number;
//   visits: number;
//   status: "relationship" | "complicated" | "single";
//   progress: number;
//   subRows?: Person[];
// };

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i += 1) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(40),
    visits: faker.datatype.number(1000),
    progress: faker.datatype.number(100),
    status: faker.helpers.shuffle<Person["status"]>([
      "relationship",
      "complicated",
      "single",
    ])[0],
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth];
    return range(len).map((): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

const data = makeData(100);

export async function fetchData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  // this is not the right way to use promises this is just to simulate some network latency
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 500));

  return {
    rows: data.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize
    ),
    pageCount: Math.ceil(data.length / options.pageSize),
  };
}
