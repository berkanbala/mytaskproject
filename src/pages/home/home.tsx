import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Loading } from "../../common/components/loading/loading";
import styles from "./home.module.scss";
import client from "../../common/client/apollo";
import Card from "../../custom/card/card";

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

export default function Home() {
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
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
    },
  });

  if (loading) return <Loading />;
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
      </div>
    </div>
  );
}
