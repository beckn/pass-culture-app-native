import { t } from '@lingui/macro'
import React from 'react'
import styled from 'styled-components/native'

import { CenteredTitle } from 'features/identityCheck/atoms/CenteredTitle'
import { PageWithHeader } from 'features/identityCheck/components/layout/PageWithHeader'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { BicolorIdCardWithMagnifyingClass } from 'ui/svg/icons/BicolorIdCardWithMagnifyingClass'
import { Spacer, Typo, ColorsEnum, getSpacing } from 'ui/theme'

export const IdentityCheckEduConnect = () => {
  return (
    <PageWithHeader
      title={t`Identification`}
      scrollChildren={
        <React.Fragment>
          <Center>
            <BicolorIdCardWithMagnifyingClass
              color={ColorsEnum.SECONDARY}
              color2={ColorsEnum.PRIMARY}
              size={getSpacing(47)}
            />
          </Center>

          <CenteredTitle title={t`Identification`} />

          <Spacer.Column numberOfSpaces={4} />

          <TextContent color={ColorsEnum.GREY_DARK}>
            {t`Pour t'identifier, nous allons te demander de te connecter à ÉduConnect. Pense bien à avoir ton identifiant et ton mot de passe pour continuer. Si tu ne les as pas, contacte ton établissement pour les récupérer.`}
          </TextContent>

          <Spacer.Column numberOfSpaces={8} />
        </React.Fragment>
      }
      fixedBottomChildren={
        <ButtonPrimary
          title={`Connexion avec ÉduConnect`}
          onPress={() => {
            /*
              TODO: Redirection EduConnect Form
              https://passculture.atlassian.net/browse/PC-12075

             */
          }}
        />
      }
    />
  )
}

const Center = styled.View({
  alignSelf: 'center',
})

const TextContent = styled(Typo.Body)({
  textAlign: 'center',
})
