import { Button, Typography } from "@mui/material";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Typography variant="h1" color="primary">
        hello world
      </Typography>
      <Button variant="contained">hello world</Button>
    </div>
  );
}
