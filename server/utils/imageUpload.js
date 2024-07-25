import multer from "multer";

const timestampInSeconds = Math.floor(Date.now() / 1000);
// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // File destination
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname+"-"+`${timestampInSeconds}`) // File name
    }
});

// Define a function to filter file types
const fileFilter = (req, file, cb) => {
    // Check file type
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true); // Accept the file
    } else {
      // Reject the file
      cb(new Error('Only JPEG and PNG files are allowed'), false);
    }
};

const imageUpload = multer({ 
    storage: storage,
    fileFilter: fileFilter // Apply file filter
});

export default imageUpload;