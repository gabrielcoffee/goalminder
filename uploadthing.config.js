
const uploadThing = new UploadThing();

// Set up file settings
export const imageUploader = uploadThing({
  acceptedFiles: ['image/*'], // accept any image type
  maxFileSize: '3MB'          // set a max file size if desired
});
