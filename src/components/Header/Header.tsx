import Link from "next/link";

import styles from "./Header.module.scss";

type HeaderProp = {};

export const Header: React.FC<HeaderProp> = ({}: HeaderProp) => {
  return (
    <div className={styles.header__container}>
      <div className={styles.header__list}>
        <Link href="/">Home</Link>
      </div>
    </div>
  );
};
