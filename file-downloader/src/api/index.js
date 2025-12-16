const API_BASE_URL = "http://localhost:5000";

export const getFiles = () => {
  return fetch(`${API_BASE_URL}/api/files`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des fichiers.");
      }
      return response.json();
    });
}
