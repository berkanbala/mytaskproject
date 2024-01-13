import styles from "./card.module.scss";
export default function Card(props: Props) {
  const { country } = props;
  return (
    <div className={styles.container}>
      <ul className={styles.content}>
        <p>Name</p>
        <li>{country.name} </li>
        <p>Phone</p>
        <li>{country.phone} </li>
        <p>Currency</p>
        <li>{country.currency} </li>
      </ul>
    </div>
  );
}

interface Props {
  country: any;
  name: string;
  phone: string;
  currency: string;
  entries: any;
  onloadMore: any;
}
