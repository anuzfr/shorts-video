import mongoose , {Schema , model , models} from "mongoose" ;

export const VIDEO_DIMENSIONS = {
    width : 1080,
    height : 1920
}

const videoSchema = new Schema (
    {
        title: {type : String , required : true },
        description: {type : String , required : true },
        videoUrl: {type : String , required : true },
        thumbnailUrl: {type : String , required : true },
        controls: {type : Boolean , default : true },
        transformation: {
            height: { type : Number , default: VIDEO_DIMENSIONS.height}, 
            width: {type : Number , default: VIDEO_DIMENSIONS.width} , 
            quality: {type: Number , min:1 , max:100}}
    },
    {
        timestamps : true // The { timestamps: true } option in the schema tells Mongoose to 
        // automatically add and update the createdAt and updatedAt fields automatically for each document
    }
)

const Video = models.Video || model("Video" , videoSchema);

export default Video;