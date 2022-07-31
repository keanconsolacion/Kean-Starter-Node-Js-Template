const S3 = require("aws-sdk/clients/s3");

const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY } = process.env;

const s3 = new S3({
	region: AWS_BUCKET_REGION,
	accessKeyId: AWS_ACCESS_KEY,
	secretAccessKey: AWS_SECRET_KEY,
});

const folderName = "my_folder";

function uploadToS3(file, fileName) {
	const uploadParams = {
		Bucket: AWS_BUCKET_NAME,
		Body: file,
		Key: `${folderName}/${fileName}`,
		//Remove ACL if bucket is not public
		ACL: "public-read",
	};
	return s3.upload(uploadParams).promise();
}

function deleteFromS3(path) {
	const deleteParams = {
		Bucket: AWS_BUCKET_NAME,
		Key: `${folderName}/${path}`,
	};
	return s3.deleteObject(deleteParams).promise();
}

module.exports = {
	uploadToS3,
	deleteFromS3,
};
