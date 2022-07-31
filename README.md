This server template includes:
- Admin authentication endpoints through mongoose and jwt tokens stored in httpOnly cookies.
- Uploading and deleting objects into an AWS S3 bucket.

In other for this to run, you would need the following environment variables (under `./config/${name}.env`):

For Server:
- PORT

For MongoDB:
- MONGODB_URL

For Authentcation:
- JWT_SECRET

For AWS S3:
- AWS_BUCKET_NAME
- AWS_BUCKET_REGION
- AWS_ACCESS_KEY
- AWS_SECRET_KEY

_Created by Ke'an Martin Consolacion 31/07/2022_
