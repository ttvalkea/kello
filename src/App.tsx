import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { format, getHours } from "date-fns";
import { fi } from "date-fns/locale";

function App() {
  const [date, setDate] = useState(new Date());
  const [fontSizeFactor, setFontSizeFactor] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const clock = format(date, "HH:mm");
  const day = format(date, "dd");
  const monthName = format(date, "LLLL", { locale: fi });
  const year = format(date, "yyyy");
  const dayName = format(date, "cccc", { locale: fi });
  const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);

  const partOfDay = getPartOfDay(date);

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: "95vh", backgroundColor: "lightgreen", padding: 10 }}
    >
      <Stack justifyContent="center" alignItems="center" height="100%">
        <Typography fontSize={100 * fontSizeFactor}>
          {capitalizedDayName}
        </Typography>
        <Typography fontSize={100 * fontSizeFactor}>{partOfDay}</Typography>
        <Typography fontSize={150 * fontSizeFactor}>{clock}</Typography>
        <Typography fontSize={50 * fontSizeFactor}>
          {day}. {monthName} {year}
        </Typography>
      </Stack>
      <Button onClick={() => setFontSizeFactor(fontSizeFactor + 0.04)}>
        +
      </Button>
      <Button onClick={() => setFontSizeFactor(fontSizeFactor - 0.04)}>
        -
      </Button>
    </Container>
  );
}

export default App;

const getPartOfDay = (date: Date): string => {
  const hour = getHours(date);

  if (hour >= 6 && hour < 10) {
    return "Aamu";
  } else if (hour >= 10 && hour < 12) {
    return "Aamupäivä";
  } else if (hour >= 12 && hour < 17) {
    return "Iltapäivä";
  } else if (hour >= 17 && hour < 22) {
    return "Ilta";
  } else {
    return "Yö";
  }
};
