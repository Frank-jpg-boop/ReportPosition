 const COS=require("./cos-wx-sdk-v5.js")

 //上传图片到腾讯云
 function uploadFile({filename,filePath,data}){
 
/* 	const Bucket="";//存储桶的名称，命名规则为 BucketName-APPID，此处填写的存储桶名称必须为此格式
	const Region="";//存储桶所在地域 */
	//创建一个 COS SDK 实例
	// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
	const cos = new COS({
		getAuthorization: function (options, callback) {
		  callback({
		    TmpSecretId: data.credentials.tmpSecretId,
		    TmpSecretKey: data.credentials.tmpSecretKey,
		    XCosSecurityToken: data.credentials.sessionToken,
		    StartTime: data.startTime,
		    ExpiredTime: data.expiredTime,
		    expiration: data.expiration
		  })
		}
		// TmpSecretId: data.credentials.tmpSecretId,
		// TmpSecretKey: data.credentials.tmpSecretKey,
		// XCosSecurityToken: data.credentials.sessionToken,
		// StartTime: data.startTime,
		// ExpiredTime: data.expiredTime,
		// expiration: data.expiration,
	});
	// //创建存储桶
	// cos.putBucket({
	//   Bucket:data.bucket,
	//   Region:data.region,
	// }, function (err, data) {
	//   console.log(err || data);
	// });
	
	// //查询存储桶列表
	// cos.getService(function (err, data) {
	// 	console.log("[查询存储桶列表]")
	//   console.log(data && data.Buckets);
	// });
 
	return new Promise((resolve,reject)=>{
 		cos.postObject({
 		    Bucket: data.bucket,
 		    Region: data.region,
 		    Key: 'wxFile/' + filename,
 		    FilePath: filePath,
 		    onProgress: function (info) {
 		        // console.log("[cos.postObject-seccess]",JSON.stringify(info));
 		    }      
 		}, 
 		function (err, data) {
 		    // console.log("[cos.postObject-err]",err || data);
 			resolve(data.headers.location)
 		})
 	})
 }
 
   export default uploadFile