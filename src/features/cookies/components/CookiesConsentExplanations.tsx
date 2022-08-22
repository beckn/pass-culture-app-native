import { t } from '@lingui/macro'
import React from 'react'
import styled from 'styled-components/native'

import { Spacer, Typo } from 'ui/theme'

export const CookiesConsentExplanations = () => (
  <React.Fragment>
    <Typo.Body>{t`Les cookies sont des petits fichiers stockés sur ton appareil lorsque tu navigues. Nous utilisons les données collectées par ces cookies et traceurs pour t’offrir la meilleure expérience possible.`}</Typo.Body>
    <Spacer.Column numberOfSpaces={4} />
    <Typo.Body>{t`Tu peux accéder aux réglages des cookies pour faire un choix éclairé et découvrir notre politique de gestion des cookies.`}</Typo.Body>
    <Spacer.Column numberOfSpaces={4} />
    <StyledCaption>{t`Ton choix est conservé pendant 6 mois et tu pourras le modifier dans les paramètres de confidentialité de ton profil à tout moment.`}</StyledCaption>
    <Spacer.Column numberOfSpaces={4} />
  </React.Fragment>
)

const StyledCaption = styled(Typo.Caption)(({ theme }) => ({
  color: theme.colors.greyDark,
}))
