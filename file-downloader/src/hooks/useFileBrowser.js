import { useState } from 'react';
import useFiles from './useFiles';

export default function useFileBrowser() {
    const { files: rawFiles, loading, error } = useFiles();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: 'name',
        direction: 'ascending'
    });

    // Filtrage (Search)
    const filteredFiles = rawFiles.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Tri (Sort)
    const processedFiles = [...filteredFiles].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return {
        files: processedFiles,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        sortConfig,
        requestSort
    };
}
