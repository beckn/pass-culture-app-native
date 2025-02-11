import React, { useState } from 'react'
import { Animated } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled, { useTheme } from 'styled-components/native'

import { getTabNavConfig } from 'features/navigation/TabBar/helpers'
import { useGoBack } from 'features/navigation/useGoBack'
import { useShareVenue } from 'features/share/helpers/useShareVenue'
import { WebShareModal } from 'features/share/pages/WebShareModal'
import { analytics } from 'libs/analytics'
import { getAnimationState } from 'ui/animations/helpers/getAnimationState'
import { RoundedButton } from 'ui/components/buttons/RoundedButton'
import { BlurHeader } from 'ui/components/headers/BlurHeader'
import { useModal } from 'ui/components/modals/useModal'
import { Spacer, Typo } from 'ui/theme'

interface Props {
  headerTransition: Animated.AnimatedInterpolation
  title: string
  venueId: number
}

/**
 * @param props.headerTransition should be between animated between 0 and 1
 */
export const VenueHeader: React.FC<Props> = (props) => {
  const theme = useTheme()
  const { headerTransition, title, venueId } = props
  const { goBack } = useGoBack(...getTabNavConfig('Search'))

  const { share: shareVenue, shareContent } = useShareVenue(venueId)
  const {
    visible: shareVenueModalVisible,
    showModal: showShareVenueModal,
    hideModal: hideShareVenueModal,
  } = useModal(false)

  const onSharePress = () => {
    analytics.logShare({ type: 'Venue', from: 'venue', id: venueId })
    shareVenue()
    showShareVenueModal()
  }

  const [ariaHiddenTitle, setAriaHiddenTitle] = useState(true)
  headerTransition.addListener((opacity) => setAriaHiddenTitle(opacity.value !== 1))

  const { animationState, containerStyle, blurContainerNative } = getAnimationState(
    theme,
    headerTransition
  )
  const { top } = useSafeAreaInsets()

  return (
    <React.Fragment>
      <HeaderContainer style={containerStyle} safeAreaTop={top}>
        <Spacer.TopScreen />
        <BlurNativeContainer style={blurContainerNative} safeAreaTop={top}>
          <BlurHeader />
        </BlurNativeContainer>
        <Spacer.Column numberOfSpaces={2} />
        <Row>
          <Spacer.Row numberOfSpaces={6} />
          <RoundedButton
            animationState={animationState}
            iconName="back"
            onPress={goBack}
            accessibilityLabel="Revenir en arrière"
          />
          <Spacer.Flex />

          <Title
            testID="venueHeaderName"
            style={{ opacity: headerTransition }}
            accessibilityHidden={ariaHiddenTitle}>
            <Body>{title}</Body>
          </Title>

          <Spacer.Flex />
          <RoundedButton
            animationState={animationState}
            iconName="share"
            onPress={onSharePress}
            accessibilityLabel="Partager"
          />
          <Spacer.Row numberOfSpaces={6} />
        </Row>
        <Spacer.Column numberOfSpaces={2} />
      </HeaderContainer>
      {shareContent ? (
        <WebShareModal
          visible={shareVenueModalVisible}
          headerTitle="Partager le lieu"
          shareContent={shareContent}
          dismissModal={hideShareVenueModal}
        />
      ) : null}
    </React.Fragment>
  )
}

const Body = styled(Typo.Body)(({ theme }) => ({
  color: theme.colors.black,
}))

const HeaderContainer = styled(Animated.View)<{ safeAreaTop: number }>(
  ({ theme, safeAreaTop }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: theme.appBarHeight + safeAreaTop,
    zIndex: theme.zIndex.header,
    borderBottomColor: theme.colors.greyLight,
    borderBottomWidth: 1,
  })
)

const BlurNativeContainer = styled(Animated.View)<{ safeAreaTop: number }>(
  ({ theme, safeAreaTop }) => ({
    position: 'absolute',
    height: theme.appBarHeight + safeAreaTop,
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  })
)

const Row = styled.View({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
})

const Title = styled(Animated.Text).attrs({
  numberOfLines: 2,
})({
  flexShrink: 1,
  textAlign: 'center',
})
