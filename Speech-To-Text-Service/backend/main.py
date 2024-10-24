import os
from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import csv
from google.cloud import storage
import logging

# Configuración de la variable de entorno para Google Cloud
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'C:\Users\edils\OneDrive\Documentos\myenv\Speech-to-Text-Service\config\speech-to-text-credentials.json'

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas las fuentes, puedes restringirlo según sea necesario
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

# Configuración del logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.post("/generate-analysis")
async def generate_analysis(
    selectedService: str = Form(...),
    categories: str = Form(...),
    textFieldName: str = Form(...),  # Nuevo campo recibido del frontend
    file: UploadFile = File(...)
):
    try:
        logger.info(f"Recibiendo archivo para {selectedService} con categorías {categories} y campo de texto {textFieldName}")
        
        file_content = await file.read()  # Lee el contenido del archivo
        logger.info("Archivo leído correctamente")

        # Subir archivo a Google Cloud Storage
        client = storage.Client()
        bucket = client.bucket('filesia')  # Asegúrate de que el nombre del bucket es correcto
        blob = bucket.blob(file.filename)

        # Agregar metadatos al blob
        blob.metadata = {
            'selectedService': selectedService,
            'categories': categories,
            'textFieldName': textFieldName
        }

        # Subir el archivo con los metadatos
        blob.upload_from_string(file_content)
        logger.info("Archivo subido correctamente a Google Cloud Storage con metadatos")

        # Aquí puedes llamar a tu script de procesamiento y pasarle los parámetros necesarios

        return {"message": f"Análisis de {selectedService} generado correctamente para las categorías: {categories}"}
    
    except Exception as e:
        logger.error(f"Error al procesar la solicitud: {str(e)}")
        raise HTTPException(status_code=500, detail="Error al generar el análisis")
