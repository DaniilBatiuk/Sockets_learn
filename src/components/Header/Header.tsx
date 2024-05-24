import Link from "next/link";

import styles from "./Header.module.scss";

type HeaderProp = {};

export const Header: React.FC<HeaderProp> = ({}: HeaderProp) => {
  return (
    <div className={styles.header__container}>
      <div className={styles.header__list}>
        <Link href="/">Home</Link>
        <Link href="/room/66505392d4155489abdaf439">Room with pusher</Link>
        <Link href="/About">About</Link>
      </div>
    </div>
  );
};
