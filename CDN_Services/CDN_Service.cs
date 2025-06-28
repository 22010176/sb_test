using Amazon.S3;
using Microsoft.Extensions.Configuration;

namespace CDN_Services;

public class CDN_Service
{
  readonly IAmazonS3 s3Client;
  readonly string bucketName;

  public CDN_Service(IConfiguration configuration)
  {
    var awsOptions = configuration.GetSection("AWS");
    bucketName = awsOptions["BucketName"]!;

    s3Client = new AmazonS3Client(
        awsOptions["AccessKey"],
        awsOptions["SecretKey"],
        new AmazonS3Config
        {
          ServiceURL = awsOptions["ServiceURL"],
          ForcePathStyle = true
        }
    );
  }
}
