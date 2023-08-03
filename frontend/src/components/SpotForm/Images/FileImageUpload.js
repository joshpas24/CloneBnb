import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadDropzone } from "react-uploader";

// Initialize once (at the start of your app).
const uploader = Uploader({
    apiKey: "free" // Get production API keys from Upload.io
});

// Configuration options: https://upload.io/uploader#customize
const options = { multi: true };

const FileImageUpload = () => {


    return (
        <UploadDropzone uploader={uploader}
                  options={options}
                  onUpdate={files => alert(files.map(x => x.fileUrl).join("\n"))}
                  width="600px"
                  height="375px" />
    )
}

export default FileImageUpload;
