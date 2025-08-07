import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import Video from "@/models/Video"

export async function GET (){
    try {
        await connectToDatabase()
        const videos = await Video.find({})
            .sort({createdAt: -1}).lean()

            if(!videos || videos.length === 0){
                return NextResponse.json([] , {status: 200})
            }

            return NextResponse.json(videos)

    } catch (error) {
        return NextResponse.json(
            {error: "failed to fetch videos"},
            {status: 500}
        )
    }
}

export async function POST (request){
    try {

        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json(
            {error: "unauthorized"},
            {status: 401}
        )}

        await connectToDatabase()

        const body = await request.json()
        if(!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl ){
            return NextResponse.json(
            {error: "missing required field"},
            {status: 400}
        )}

        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation:{
                height:1920,
                width:1080,
                quality: body.transformation?.quality ?? 100
            }
        }
        const newVideo = await Video.create(videoData)

        return NextResponse.json(newVideo)
    } catch (error) {
        return NextResponse.json(
            {error: "failed to create video"},
            {status: 500}
        )
    }
}