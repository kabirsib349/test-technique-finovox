import pytest
from backend import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_list_files(client):
   # Arrange (s'assurer que le dossier files existe)
   import os
   if not os.path.exists('files'):
       os.makedirs('files')
   #Act (Utiliser le client pour faire une requete GET sur /api/files)
   response = client.get('/api/files')
   #Assert 
   assert response.status_code == 200
   assert response.content_type == 'application/json'
   assert isinstance(response.get_json(), list)
    
def test_download_file(client):
    #Arrange
    import os
    test_filename = "download_test.txt"
    #utilisation des codes hexadécimaux pour les accents : \xc3\xa9 = é
    file_content = b"ceci est un test de t\xc3\xa9l\xc3\xa9chargement"
    with open(os.path.join('files', test_filename), 'wb') as f:
        f.write(file_content)
    #Act
    response = client.get(f'/download/{test_filename}')
    #Assert
    assert response.status_code == 200
    assert response.data == file_content
    assert 'attachment' in response.headers['Content-Disposition']
    response.close()
    os.remove(os.path.join('files', test_filename))

def test_download_nonexistent_file(client):
    #Act
    response = client.get('/download/non_existent_file.txt')
    #Assert
    assert response.status_code == 404
    
