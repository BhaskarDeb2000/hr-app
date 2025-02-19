import { Box, CircularProgress } from "@mui/material";

const Loader: React.FC = () => (
  <Box sx={{ textAlign: "center", marginTop: 4 }}>
    <CircularProgress />
  </Box>
);

export default Loader;
