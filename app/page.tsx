import { Typography } from "@mui/material";
import styles from "./page.module.css";
import Button from "@/comps/button";

export default function Home() {
  return (
    <div className={styles.page}>
      <Typography variant="h1" color="primary">
        hello world
      </Typography>
      <Button>hello world</Button>
    </div>
  );
}
