import { useState } from 'react';

const API_BASE_URL = 'http://localhost:5000';

export default function useFileDownloader() {
    const [downloadStatus, setDownloadStatus] = useState({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleDownload = async (file) => {
        const name = file.name;
        setDownloadStatus(prevStatus => ({
            ...prevStatus,
            [name]: 'downloading'
        }));
        try{
            const response = await fetch(`${API_BASE_URL}/download/${name}`);
            if (!response.ok) {
                throw new Error(`Échec du téléchargement. Le serveur a  répondu : ${response.statusText}`);
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            setDownloadStatus(prevStatus => ({
                ...prevStatus,
                [name]: 'success'
            }));
            setSnackbar({
                open: true,
                message: `Le fichier "${name}" a été téléchargé avec succès.`,
                severity: 'success'
            });
        }catch(error){
            setDownloadStatus(prevStatus => ({
                ...prevStatus,
                [name]: 'error'
            }));
            setSnackbar({
                open: true,
                message: error.message,
                severity: 'error'
            });
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    return {
        downloadStatus,
        snackbar,
        handleDownload,
        handleCloseSnackbar
    };
}
