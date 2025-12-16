import {useState} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
  Typography,
  Container,
  Snackbar,
  Alert
} from '@mui/material';
import FileList from './components/FileList';
import SortControls from './components/SortControls';
import SearchFilter from './components/SearchFilter';
import FileSkeleton from './components/FileSkeleton';
import useFileBrowser from './hooks/useFileBrowser';
import useFileDownloader from './hooks/useFileDownloader';

function App() {

  const [themeMode, setThemeMode] = useState('light');
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const {
    files,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    sortConfig,
    requestSort
  } = useFileBrowser();

  const {
    downloadStatus,
    snackbar,
    handleDownload,
    handleCloseSnackbar
  } = useFileDownloader();

  if (error) {
    return (
      <Container sx={{ textAlign: 'center', my: 10 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="h4" gutterBottom component="div">
            Liste des fichiers à télécharger
          </Typography>
          <IconButton sx={{ml:1}} onClick={toggleTheme} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          disabled={loading}
        />

        <SortControls
          sortConfig={sortConfig}
          requestSort={requestSort}
          disabled={loading}
        />

        {loading ? (
          <FileSkeleton />
        ) : (
          <FileList
            files={files}
            downloadStatus={downloadStatus}
            handleDownload={handleDownload}
          />
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App;