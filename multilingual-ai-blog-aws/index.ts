import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";
import * as path from "path";

// 1. Define site folder
const siteDir = "site";

// 2. Create S3 bucket with static site hosting
const siteBucket = new aws.s3.Bucket("blog-static-bucket", {
  website: {
    indexDocument: "index.html",
    errorDocument: "404.html",
  },
  forceDestroy: true,
});

// 3. Make the bucket publicly readable
new aws.s3.BucketPolicy("public-read-policy", {
  bucket: siteBucket.bucket,
  policy: siteBucket.bucket.apply(bucketName =>
    JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Sid: "PublicReadGetObject",
          Effect: "Allow",
          Principal: "*",
          Action: "s3:GetObject",
          Resource: [`arn:aws:s3:::${bucketName}/*`],
        },
      ],
    })
  ),
});

// 4. Helper: get content type by file extension
const getContentType = (fileName: string): string => {
  if (fileName.endsWith(".html")) return "text/html";
  if (fileName.endsWith(".css")) return "text/css";
  if (fileName.endsWith(".js")) return "application/javascript";
  if (fileName.endsWith(".json")) return "application/json";
  if (fileName.endsWith(".png")) return "image/png";
  if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) return "image/jpeg";
  if (fileName.endsWith(".ico")) return "image/x-icon";
  return "application/octet-stream";
};

// 5. Upload all files in /site
function walkDir(dir: string, fileList: string[] = []) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  });
  return fileList;
}

const files = walkDir(siteDir);

for (const filePath of files) {
  const relativePath = filePath.replace(`${siteDir}${path.sep}`, "");
  new aws.s3.BucketObject(relativePath, {
    bucket: siteBucket,
    source: new pulumi.asset.FileAsset(filePath),
    contentType: getContentType(filePath),
  });
}

// 6. Export the live URL
export const websiteUrl = siteBucket.websiteEndpoint;
