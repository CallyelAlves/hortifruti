import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type PropsHeader = {
  total?: number;
};

export function Header({ total }: PropsHeader) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ background: "#191A19" }} position="static">
        <Toolbar>
          <Typography
            variant="h1"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: "900",
              fontSize: 26,
            }}
          >
            <Link to="/">HORTIFRUTI</Link>
          </Typography>
          <Link to="/cart">
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                ":hover": { background: "#4E9F3D", color: "#fff" },
                border: "none",
              }}
              startIcon={<ShoppingCartIcon />}
            >
              <strong>{`Cart ${total}`}</strong>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
