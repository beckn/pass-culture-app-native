import { t } from '@lingui/macro'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components/native'

import { useNotifyAccountSuspend } from 'features/auth/api'
import { useLogoutRoutine } from 'features/auth/AuthContext'
import { UseNavigationType } from 'features/navigation/RootNavigator'
import { analytics } from 'libs/analytics'
import { AppButton } from 'ui/components/buttons/AppButton'
import { Background } from 'ui/svg/Background'
import { Error } from 'ui/svg/icons/Error'
import { ColorsEnum, getSpacing, Spacer, Typo } from 'ui/theme'

export function ConfirmDeleteProfile() {
  const { navigate } = useNavigation<UseNavigationType>()
  const signOut = useLogoutRoutine()

  const { mutate: notifyAccountSuspend, isLoading } = useNotifyAccountSuspend(() => {
    navigate('DeleteProfileSuccess')
    analytics.logLogout()
    signOut()
  })

  const { goBack } = useNavigation<UseNavigationType>()
  return (
    <Container>
      <Background />
      <Spacer.TopScreen />
      <Spacer.Flex />
      <Error />

      <Spacer.Column numberOfSpaces={6} />

      <CenteredContainer>
        <CenteredText>
          <Typo.Title2 color={ColorsEnum.WHITE}>
            {t`Es-tu sûr de vouloir supprimer ton compte ?`}
          </Typo.Title2>
        </CenteredText>

        <Spacer.Column numberOfSpaces={4} />

        <CenteredText>
          <Typo.Body color={ColorsEnum.WHITE}>
            {t`Cela entraînera l'annulation de l'ensemble de tes réservations en cours, ainsi que la suppression définitive de ton crédit pass Culture si tu en bénéficies.`}
          </Typo.Body>
        </CenteredText>
      </CenteredContainer>

      <Spacer.Flex />

      <Row>
        <ButtonContainer>
          <AppButton
            title={t`Supprimer mon compte`}
            onPress={notifyAccountSuspend}
            backgroundColor={ColorsEnum.WHITE}
            textColor={ColorsEnum.PRIMARY}
            loadingIconColor={ColorsEnum.PRIMARY}
            buttonHeight="small"
            isLoading={isLoading}
          />
          <Spacer.Column numberOfSpaces={2} />
          <AppButton
            title={t`Abandonner`}
            onPress={goBack}
            backgroundColor={ColorsEnum.TRANSPARENT}
            textColor={ColorsEnum.WHITE}
            loadingIconColor={ColorsEnum.WHITE}
            buttonHeight="tall"
          />
        </ButtonContainer>
      </Row>
      <Spacer.BottomScreen />
    </Container>
  )
}

const Container = styled.View({
  flex: 1,
  alignItems: 'center',
})

const Row = styled.View({ flexDirection: 'row' })

const CenteredContainer = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  marginHorizontal: getSpacing(6),
})

const ButtonContainer = styled.View({
  flex: 1,
  marginHorizontal: getSpacing(6),
  paddingBottom: getSpacing(6),
})

const CenteredText = styled.Text({
  textAlign: 'center',
})
