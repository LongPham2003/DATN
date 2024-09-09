import { Box, Button } from "@mui/material";
function App() {
  return (
    <Box className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="mb-4 text-3xl font-bold">Kết hợp MUI và Tailwind CSS</h1>
      <Button variant="contained" color="primary" className="mb-2">
        Nút MUI
      </Button>
      <button className="my-5 rounded bg-blue-500 px-4 py-2 font-bold text-white">
        Nút Tailwind CSS
      </button>
    </Box>
  );
}

export default App;
