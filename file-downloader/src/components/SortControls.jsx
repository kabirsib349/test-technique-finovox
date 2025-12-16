import { Box, MenuItem, FormControl, Select, InputLabel, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const SortControls = ({ sortConfig, requestSort, disabled }) => {
  const handleSortChange = (event) => {
    requestSort(event.target.value);
  };

  const handleDirectionToggle = () => {
    requestSort(sortConfig.key);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
      <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }} disabled={disabled}>
        <InputLabel id="sort-label">Trier par</InputLabel>
        <Select
          labelId="sort-label"
          value={sortConfig.key}
          onChange={handleSortChange}
          label="Trier par"
        >
          <MenuItem value="name">Nom</MenuItem>
          <MenuItem value="size">Taille</MenuItem>
          <MenuItem value="last_modified">Date</MenuItem>
        </Select>
      </FormControl>

      <IconButton onClick={handleDirectionToggle} disabled={disabled} title="Changer l'ordre">
        {sortConfig.direction === 'ascending' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </IconButton>
    </Box>
  );
};
export default SortControls;