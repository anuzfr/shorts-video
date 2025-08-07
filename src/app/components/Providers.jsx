'use client'

import {SessionProvider} from "next-auth/react";
import { ImageKitProvider } from "@imagekit/next";
import { NotificationProvider } from "./Notification";

const urlEndpoint = "https://ik.imagekit.io/anuj11"; 

export default function Providers ({children}) {
    return (
    <SessionProvider refetchInterval={5 * 60}>
        <ImageKitProvider urlEndpoint={urlEndpoint}>
            <NotificationProvider>
                {children}
            </NotificationProvider>
        </ImageKitProvider>
    </SessionProvider>
    )
}