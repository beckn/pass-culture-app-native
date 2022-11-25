import React, { FunctionComponent, useCallback, useMemo, useRef, useState } from 'react'
import { TextInput as RNTextInput } from 'react-native'
import styled from 'styled-components/native'
import { v4 as uuidv4 } from 'uuid'

import { AuthenticationButton } from 'features/auth/components/AuthenticationButton/AuthenticationButton'
import { AccessibilityRole } from 'libs/accessibilityRole/accessibilityRole'
import { analytics } from 'libs/firebase/analytics'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { Form } from 'ui/components/Form'
import { InputLabel } from 'ui/components/InputLabel/InputLabel'
import { CheckboxInput } from 'ui/components/inputs/CheckboxInput'
import { isEmailValid } from 'ui/components/inputs/emailCheck'
import { EmailInput } from 'ui/components/inputs/EmailInput'
import { isValueEmpty } from 'ui/components/inputs/helpers'
import { InputError } from 'ui/components/inputs/InputError'
import { TouchableOpacity } from 'ui/components/TouchableOpacity'
import { useSpaceBarAction } from 'ui/hooks/useSpaceBarAction'
import { padding, Spacer, Typo } from 'ui/theme'
import { HiddenCheckbox } from 'ui/web/inputs/HiddenCheckbox'

import { PreValidationSignupStepProps } from '../types'

export const SetEmail: FunctionComponent<PreValidationSignupStepProps> = (props) => {
  const [email, setEmail] = useState('')
  const [hasError, setHasError] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const [isNewsletterChecked, setIsNewsletterChecked] = useState(false)
  const emailInputErrorId = uuidv4()
  const shouldDisableValidateButton = isValueEmpty(email)

  const emailInput = useRef<RNTextInput | null>(null)
  const checkboxID = uuidv4()

  function onEmailChange(newEmailInput: string) {
    if (hasError) {
      setHasError(false)
    }
    setEmail(newEmailInput)
  }

  function validateEmail() {
    if (isEmailValid(email)) {
      props.goToNextStep({ email, marketingEmailSubscription: isNewsletterChecked })
    } else {
      setHasError(true)
    }
  }

  function onCheckboxPress() {
    setIsNewsletterChecked((prevIsNewsletterChecked) => !prevIsNewsletterChecked)
  }

  const onCheckboxFocus = useCallback(() => {
    setIsFocus(true)
  }, [])

  const onCheckboxBlur = useCallback(() => {
    setIsFocus(false)
  }, [])

  const onLogAnalytics = useCallback(() => {
    analytics.logLogin({ method: 'fromSetEmail' })
  }, [])

  const accessibilityState = useMemo(
    () => ({ checked: isNewsletterChecked }),
    [isNewsletterChecked]
  )

  const checkBoxlabel =
    'J’accepte de recevoir les newsletters, bons plans et recommandations personnalisées du pass Culture.'

  useSpaceBarAction(isFocus ? onCheckboxPress : undefined)

  return (
    <Form.MaxWidth>
      <EmailInput
        label="Adresse e-mail"
        email={email}
        onEmailChange={onEmailChange}
        autoFocus
        onSubmitEditing={validateEmail}
        ref={emailInput}
        accessibilityDescribedBy={emailInputErrorId}
      />
      <InputError
        visible={hasError}
        messageId="L’e-mail renseigné est incorrect. Exemple de format attendu&nbsp;: edith.piaf@email.fr"
        numberOfSpacesTop={2}
        relatedInputId={emailInputErrorId}
      />
      <Spacer.Column numberOfSpaces={4} />
      <StyledCheckBox
        onPress={onCheckboxPress}
        accessibilityRole={AccessibilityRole.CHECKBOX}
        accessibilityState={accessibilityState}
        onFocus={onCheckboxFocus}
        onBlur={onCheckboxBlur}>
        <CheckboxInput isChecked={isNewsletterChecked} />
        <CheckBoxText>
          <InputLabel htmlFor={checkboxID}>{checkBoxlabel}</InputLabel>
        </CheckBoxText>
        <HiddenCheckbox
          id={checkboxID}
          name="email"
          checked={isNewsletterChecked}
          accessibilityLabel="J’accepte de recevoir les newsletters, bons plans et recommandations personnalisées du pass Culture."
          onChange={onCheckboxPress}
        />
      </StyledCheckBox>
      <Spacer.Column numberOfSpaces={6} />
      <ButtonPrimary
        wording="Continuer"
        accessibilityLabel={props.accessibilityLabelForNextStep}
        onPress={validateEmail}
        isLoading={false}
        disabled={shouldDisableValidateButton}
      />
      <Spacer.Column numberOfSpaces={8} />
      <AuthenticationButton type="login" onAdditionalPress={onLogAnalytics} />
      <Spacer.Column numberOfSpaces={4} />
    </Form.MaxWidth>
  )
}

const CheckBoxText = styled(Typo.Body)({
  alignSelf: 'center',
  ...padding(0, 8, 0, 4),
})

const StyledCheckBox = styled(TouchableOpacity)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
})
