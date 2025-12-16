import { TextField } from '@mui/material';
export default function SearchFilter({ searchTerm, setSearchTerm, disabled }) {
    return (
        <TextField
            disabled={disabled}
            label="Rechercher des fichiers"
            variant="filled"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 3 }}
        />
    );
}