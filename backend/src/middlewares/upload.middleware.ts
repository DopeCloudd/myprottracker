import multer from "multer";

// Configuration de multer pour stocker le fichier en mémoire
const storage = multer.memoryStorage();

// Middleware multer pour gérer un seul fichier avec le champ "image"
const uploadMiddleware = multer({ storage: storage }).single("image");

export default uploadMiddleware;
