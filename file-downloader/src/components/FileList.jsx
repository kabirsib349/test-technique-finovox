import { 
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  CircularProgress,
  Typography
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';


const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric'};
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const FileList = ({files, downloadStatus, handleDownload})=>{
    if(files.length === 0){
      return (
        <Typography>
            "Aucun fichier disponible pour le téléchargement"
        </Typography>
      );
    }
    return(
        <List sx={{ bgcolor: 'background.paper' }}>
          {files.map((file, index) => (
            <div key={file.name}>
              <ListItem secondaryAction={
                downloadStatus[file.name] === 'downloading' ? (
                  <CircularProgress size={24} />
                ) : 
                downloadStatus[file.name] === 'success' ?(
                  <IconButton aria-label="Téléchargé" disabled>
                   <CheckCircleIcon color="success"/>
                  </IconButton>
                ) :
                downloadStatus[file.name] === 'error' ?(
                  <IconButton aria-label="Réessayer" onClick={() => handleDownload(file)}>
                    <ErrorIcon color="error" />
                  </IconButton>
                ) :
                (
                  <IconButton aria-label="Télécharger" onClick={() => handleDownload(file)}>
                    <DownloadIcon />
                  </IconButton>
                )
              }>
                <ListItemIcon>
                  <ArticleIcon/> 
                </ListItemIcon>

                <ListItemText
                  primary={file.name}
                  secondary={`Taille: ${formatBytes(file.size)} — Modifié le: ${formatDate(file.last_modified)}`}
                />
              </ListItem>
              {index < files.length - 1 && <Divider/>}
            </div>
          ))}
        </List>
    );   
};
export default FileList;

