import dynamicLinks from '@react-native-firebase/dynamic-links'
import { useEffect } from 'react'
import { Linking } from 'react-native'
import { omit } from 'search-params'

import { DeeplinkEvent } from './types'
import { useDeeplinkUrlHandler } from './useDeeplinkUrlHandler'
import { FIREBASE_DYNAMIC_LINK_DOMAIN, FIREBASE_DYNAMIC_LINK_PARAMS } from './utils'

export const isFirebaseDynamicLink = (url: string) => url.startsWith(FIREBASE_DYNAMIC_LINK_DOMAIN)
export const isFirebaseLongDynamicLink = (url: string): boolean | undefined => {
  if (!isFirebaseDynamicLink(url)) return undefined
  return url.includes('?link=')
}

/* For Firebase Dynamic Links with params (exemple /offer?id=234)
 * we must use long dynamic links, and there are not recognized by dynamicLinks().onLink
 * so we handle it manually
 */
export const extractUniversalLinkFromLongFirebaseDynamicLink = (event: DeeplinkEvent): string => {
  const searchParams = event.url.replace(`${FIREBASE_DYNAMIC_LINK_DOMAIN}?`, '')
  const paramsString = omit(searchParams, FIREBASE_DYNAMIC_LINK_PARAMS).querystring
  return paramsString.replace(/^link=/, '')
}

/**
 * Moved this function outside the useListenDeepLinksEffect to be able to test its behavior
 */
export const resolveHandler = (handleDeeplinkUrl: ReturnType<typeof useDeeplinkUrlHandler>) => (
  event: DeeplinkEvent
) => {
  const isFirebaseLongLink = isFirebaseLongDynamicLink(event.url)
  const isUniversalLink = isFirebaseLongLink === undefined
  if (isUniversalLink) {
    // Universal links: https://app.passculture-{env}.beta.gouv.fr/<routeName>
    return handleDeeplinkUrl(event)
  } else if (isFirebaseLongLink === true) {
    // Long Firebase Dynamic Links: https://passcultureapp{env}.page.link/?link=https://app.passculture-{env}.beta.gouv.fr/<routeName>?param=214906&apn=app.passculture.testing&isi=1557887412&ibi=app.passculture.test&efr=1
    return handleDeeplinkUrl({ url: extractUniversalLinkFromLongFirebaseDynamicLink(event) })
  }
  // Short Firebase Dynamic Links: https://passcultureapp{env}.page.link/<routeName>
  // => handled with dynamicLinks().onLink
}

export function useListenDeepLinksEffect() {
  const handleDeeplinkUrl = useDeeplinkUrlHandler()

  const handleDynamicLink = (event: DeeplinkEvent) => {
    handleDeeplinkUrl(event)
  }

  useEffect(() => {
    // Universal links
    Linking.addEventListener('url', resolveHandler(handleDeeplinkUrl))
    // Firebase Dynamic links
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink)
    return () => {
      Linking.removeEventListener('url', handleDeeplinkUrl)
      unsubscribe()
    }
  }, [])

  return null
}
