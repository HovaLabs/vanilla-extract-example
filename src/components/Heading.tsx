import * as React from "react";
import * as styles from "./Heading.css";

interface HeadingProps {
  children: React.ReactNode;
}

export default function Heading({ children }: HeadingProps) {
  return <h1 className={styles.root}>{children}</h1>;
}
