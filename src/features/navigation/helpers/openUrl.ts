import { Alert, Linking } from 'react-native'

import { getScreenFromDeeplink } from 'features/deeplinks/helpers'
import { navigateFromRef } from 'features/navigation/navigationRef'
import { analytics } from 'libs/analytics'
import { OfferAnalyticsData } from 'libs/analytics/logEventAnalytics'
import { eventMonitoring } from 'libs/monitoring'

import { isAppUrl } from './isAppUrl'
import { navigateToHome } from './navigateToHome'

const openAppUrl = (url: string) => {
  try {
    const { screen, params } = getScreenFromDeeplink(url)
    return navigateFromRef(screen, params)
  } catch {
    // If an error is thrown, that means that no routes were matched
    return navigateToHome()
  }
}

export type UrlParamsProps = {
  shouldLogEvent?: boolean
  fallbackUrl?: string
  analyticsData?: OfferAnalyticsData
}

const openExternalUrl = async (
  url: string,
  { shouldLogEvent = true, fallbackUrl, analyticsData }: UrlParamsProps
) => {
  try {
    await Linking.openURL(url)
    if (shouldLogEvent) analytics.logOpenExternalUrl(url, { ...analyticsData })
    return
  } catch (error) {
    if (error instanceof Error)
      eventMonitoring.captureMessage(`OpenExternalUrlError: ${error.message}`, 'info')
  }

  if (fallbackUrl) {
    try {
      await Linking.openURL(fallbackUrl)
      if (shouldLogEvent) analytics.logOpenExternalUrl(fallbackUrl, { ...analyticsData })
      return
    } catch (error) {
      if (error instanceof Error)
        eventMonitoring.captureMessage(`OpenExternalUrlError_FallbackUrl: ${error.message}`, 'info')
    }
  }
  showAlert(url)
}

const showAlert = (url: string) => {
  const alertTitle = 'Problème technique'
  const alertMessage = `Nous n’arrivons pas à ouvrir ce lien\u00a0: ${url}`
  const alertButtons = undefined
  const alertAndroidOptions = { cancelable: true }
  Alert.alert(alertTitle, alertMessage, alertButtons, alertAndroidOptions)
}

export async function openUrl(
  url: string,
  { shouldLogEvent = true, fallbackUrl, analyticsData }: UrlParamsProps = {},
  isExternal?: boolean
) {
  if (isAppUrl(url) && !isExternal) {
    return openAppUrl(url)
  }

  openExternalUrl(url, { shouldLogEvent, fallbackUrl, analyticsData })
}
