import AsyncStorage from "@react-native-async-storage/async-storage"

export const getToken = async () => {
    return await AsyncStorage.getItem("ssid")
}
export const deleteToken = async () => {
    await AsyncStorage.removeItem("ssid")
}
export const getApiResponse = <T>(data: T, status: "SUCCESS" | "FAILURE", message: string) => {
    return {
        data,
        status,
        message
    }
}

const getDeviceLocale = (): string => {
    return Intl.NumberFormat().resolvedOptions().locale
}

const getDeviceCurrency = (): string => {
    const locale = getDeviceLocale()
    try {
        const currencyFormatter = new Intl.NumberFormat(locale, { 
            style: 'currency', 
            currency: 'INR'
        })
        const parts = currencyFormatter.formatToParts(1)
        const currencyPart = parts.find(part => part.type === 'currency')
        
        if (currencyPart) {
            return currencyPart.value === '$' ? 'USD' : 
                   currencyPart.value === '€' ? 'EUR' :
                   currencyPart.value === '£' ? 'GBP' :
                   currencyPart.value === '¥' ? 'JPY' :
                   currencyPart.value === '₹' ? 'INR' :
                   'USD'
        }
        
        const localeMap: { [key: string]: string } = {
            'en-US': 'USD', 'en-GB': 'GBP', 'en-CA': 'CAD', 'en-AU': 'AUD',
            'de': 'EUR', 'de-DE': 'EUR', 'fr': 'EUR', 'fr-FR': 'EUR',
            'es': 'EUR', 'es-ES': 'EUR', 'it': 'EUR', 'it-IT': 'EUR',
            'ja': 'JPY', 'ja-JP': 'JPY', 'zh': 'CNY', 'zh-CN': 'CNY',
            'hi': 'INR', 'hi-IN': 'INR', 'en-IN': 'INR'
        }
        
        return localeMap[locale] || localeMap[locale.split('-')[0]] || 'USD'
    } catch {
        return 'USD'
    }
}

export const formatCurrency = (
    amount: number, 
    currency?: string, 
    locale?: string
): string => {
    const userCurrency =getDeviceCurrency()
    const deviceLocale = locale || getDeviceLocale()
    return new Intl.NumberFormat(deviceLocale, {
        style: 'currency',
        currency: userCurrency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

export const formatNumber = (
    value: number, 
    locale?: string,
    options?: Intl.NumberFormatOptions
): string => {
    const deviceLocale = locale || getDeviceLocale()
    return new Intl.NumberFormat(deviceLocale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        ...options
    }).format(value)
}

export const formatCompactNumber = (
    value: number, 
    locale?: string
): string => {
    const deviceLocale = locale || getDeviceLocale()
    return new Intl.NumberFormat(deviceLocale, {
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 1,
    }).format(value)
}

export const parseLocalizedNumber = (
    value: string, 
    locale?: string
): number => {
    const deviceLocale = locale || getDeviceLocale()
    const parts = new Intl.NumberFormat(deviceLocale).formatToParts(12345.67)
    const numerals = Array.from({ length: 10 }).map((_, i) => 
        new Intl.NumberFormat(deviceLocale).format(i)
    )
    
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.'
    const groupSeparator = parts.find(part => part.type === 'group')?.value || ','
    
    let normalizedValue = value
    for (let i = 0; i < 10; i++) {
        normalizedValue = normalizedValue.replace(new RegExp(numerals[i], 'g'), i.toString())
    }
    
    normalizedValue = normalizedValue
        .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
        .replace(new RegExp(`\\${decimalSeparator}`), '.')
    
    return parseFloat(normalizedValue) || 0
}