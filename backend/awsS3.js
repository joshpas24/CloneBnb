const AWS = require("aws-sdk");
const multer = require("multer");
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const NAME_OF_BUCKET = "jp-clonebnb"; // <-- Use your bucket name here


//------------------------Public Upload-------------------------------------

const singlePublicFileUpload = async (file) => {
    const imageFile = await file;
    console.log("imageFile: ", imageFile)
	const { originalname, buffer } = await file;
	const path = require("path");
	// name of the file in your S3 bucket will be the date in ms plus the extension name
	const Key = new Date().getTime().toString() + path.extname(originalname);
	const uploadParams = {
		Bucket: NAME_OF_BUCKET,
		Key,
		Body: buffer,
		ACL: "public-read",
	};
	const result = await s3.upload(uploadParams).promise();

	// save the name of the file in your bucket as the key in your database to retrieve for later
	return result.Location;
};

const multiplePublicFileUpload = async (files) => {
	return await Promise.all(
		files.map((file) => {
			return singlePublicFileUpload(file);
		})
	);
};

const extractKeyFromUrl = (fileUrl) => {
	const parsedUrl = url.parse(fileUrl);
	const key = path.basename(parsedUrl.pathname);

	return key;
};

const singlePublicFileDelete = async (file) => {
	const params = {
		Bucket: NAME_OF_BUCKET,
		Key: file,
	};
	try {
		await s3.deleteObject(params).promise();
	} catch (error) {
		console.error(JSON.stringify(error));
	}
};

//------------------------Private Upload-------------------------------------

const singlePrivateFileUpload = async (file) => {
	const { originalname, buffer } = await file;
	const path = require("path");
	// name of the file in your S3 bucket will be the date in ms plus the extension name
	const Key = new Date().getTime().toString() + path.extname(originalname);
	const uploadParams = {
		Bucket: NAME_OF_BUCKET,
		Key,
		Body: buffer,
	};
	const result = await s3.upload(uploadParams).promise();

	// save the name of the file in your bucket as the key in your database to retrieve for later
	return result.Key;
};

const multiplePrivateFileUpload = async (files) => {
	return await Promise.all(
		files.map((file) => {
			return singlePrivateFileUpload(file);
		})
	);
};

const retrievePrivateFile = (key) => {
    let fileUrl;
    if (key) {
      fileUrl = s3.getSignedUrl("getObject", {
        Bucket: NAME_OF_BUCKET,
        Key: key
      });
    }
    return fileUrl || key;
};

//------------------------Storage-------------------------------------

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
      callback(null, "");
    },
});

const singleMulterUpload = (nameOfKey) => {
    console.log("NAME OF KEY IN MULTER", nameOfKey)

    const res = multer({ storage: storage, limits: { fileSize: 50 * 1024 * 1024 } }).single(nameOfKey);

    console.log("MULTER RES: ", res)
    return res;
}

const multipleMulterUpload = (nameOfKey) => multer({ storage: storage }).array(nameOfKey);

module.exports = {
	s3,
	singlePublicFileUpload,
	multiplePublicFileUpload,
	singlePrivateFileUpload,
	multiplePrivateFileUpload,
	retrievePrivateFile,
	singleMulterUpload,
	singlePublicFileDelete,
	extractKeyFromUrl,
	multipleMulterUpload,
  };
