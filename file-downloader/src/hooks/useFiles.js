import { useState, useEffect } from 'react';
import { getFiles } from '../api';

export default function useFiles() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        getFiles()
            .then(data => {
                setFiles(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Erreur lors du chargement des fichiers');
                setLoading(false);
            });
    }, []);
    return { files, loading, error };
}