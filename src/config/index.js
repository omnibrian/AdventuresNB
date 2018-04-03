let s3PublicBucket = process.env.REACT_APP_S3_PUBLIC_BUCKET || 'adventuresnb-prod-static';
let s3PublicContentURL = `https://s3.amazonaws.com/${s3PublicBucket}`;

export default {
  GOOGLE_MAPS_API_KEY: process.env.REACT_APP_MAPS_API_KEY || '',
  S3_PUBLIC_BUCKET: s3PublicBucket,
  S3_PUBLIC_CONTENT_URL: s3PublicContentURL,
  DEFAULT_ADVENTURE_IMAGE: `${s3PublicContentURL}/HikingLogox2.jpg`
};
