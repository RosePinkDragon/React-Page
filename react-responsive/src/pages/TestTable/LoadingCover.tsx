import { Box, CircularProgress } from "@mui/material";

const LoadingCover = () => {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
      }}
      position="absolute"
      width="100%"
      bgcolor="#ffffffcc"
      height="100%"
      zIndex={1000}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingCover;
