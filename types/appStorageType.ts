import {appStorage} from "@/constants/appStorage";

export type AppStorageType = typeof appStorage[keyof typeof appStorage];
