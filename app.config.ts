export default {
    expo: {
        name: "Dhanmitra Mobile",
        slug: "dhanmitra-mobile",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        updates: {
            fallbackToCacheTimeout: 0
        },
        assetBundlePatterns: [
            "**/*"
        ],
        ios: {
            supportsTablet: true
        },
        // android: {
        //     adaptiveIcon: {
        //         foregroundImage: "./assets/adaptive-icon.png",
        //         backgroundColor: "#FFFFFF"
        //     }
        // },
        // web: {
        //     favicon: "./assets/favicon.png"
        // },
        extra: {
            apiUrl: process.env.API_URL,
            apiKey: process.env.API_KEY,
            appEnv: process.env.APP_ENV,
        }
    }
}