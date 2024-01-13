import { useState } from "react";
import styles from "./App.module.scss";
import { gql, useQuery } from "@apollo/client";
import client from "./client/apollo";
import Card from "./card/card";

const COUNTRY = gql`
  query getCountry {
    countries {
      name
      capital
      phone
      currency
    }
  }
`;

const PAGE_SIZE = 10;

export default function App() {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("");

  const handleChange = (e: any) => {
    setFilter(e.target.value);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
  };

  const { loading, error, data, fetchMore } = useQuery(COUNTRY, {
    client,
    variables: {
      // offset: 0,
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
      // limit: 10,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;

  console.log(data);

  return (
    <div className={styles.container}>
      <h1>🚀 My Firt Apollo App 🚀</h1>
      <form action="" className={styles.searchForm} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="country"
          value={filter}
          onChange={handleChange}
        />
        <button className={styles.submitbtn} type="submit">
          ara
        </button>
      </form>
      <div className={styles.content}>
        {data?.countries
          ?.filter((item: any) => {
            return filter.toLowerCase() === ""
              ? item
              : item.name.toLowerCase().includes(filter);
          })
          .map((country: any, key: number) => (
            <Card
              country={country}
              key={key}
              entries={data.feed || []}
              onloadMore={() =>
                fetchMore({
                  variables: {
                    offset: data.feed.length,
                  },
                })
              }
              name={""}
              phone={""}
              currency={""}
            />
          ))}
        {/* <nav className={styles.pagination}>
          <button disabled={!page} onClick={() => setPage((prev) => prev - 1)}>
            geri
          </button>
          <span>page {page + 1} </span>
          <button onClick={() => setPage((prev) => prev + 1)}>ileri</button>
        </nav> */}
      </div>
    </div>
  );
}
