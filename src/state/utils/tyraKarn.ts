interface ITyraKarnResponse<T> {
  readonly _links: {
    readonly next?: {
      readonly href: string;
    };
  };
  readonly _embedded: {
    readonly results: T[];
  };
}

export default async function tyraKarn<T>(url: string) {
  const allResults: T[] = [];
  let next: string | null = url;

  while (next != null) {
    const data: ITyraKarnResponse<T> = await fetch(
      `https://api.tyra-karn.com${next}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    ).then(res => res.json());

    allResults.push(...data._embedded.results);
    next = data._links.next ? data._links.next.href : null;
  }

  return allResults;
}
