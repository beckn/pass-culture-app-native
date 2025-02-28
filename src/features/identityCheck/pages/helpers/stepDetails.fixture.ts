import { IdentityCheckStep, StepButtonState, StepDetails } from 'features/identityCheck/types'
import { BicolorIdCard } from 'ui/svg/icons/BicolorIdCard'
import { BicolorProfile } from 'ui/svg/icons/BicolorProfile'
import { BicolorSmartphone } from 'ui/svg/icons/BicolorSmartphone'

export const stepsDetailsFixture: StepDetails[] = [
  {
    name: IdentityCheckStep.PHONE_VALIDATION,
    icon: {
      disabled: BicolorSmartphone,
      current: BicolorSmartphone,
      completed: BicolorSmartphone,
      retry: BicolorSmartphone,
    },
    screens: ['SetPhoneNumber'],
    title: 'Numéro de téléphone',
    stepState: StepButtonState.COMPLETED,
  },
  {
    name: IdentityCheckStep.IDENTIFICATION,
    icon: {
      disabled: BicolorIdCard,
      current: BicolorIdCard,
      completed: BicolorIdCard,
      retry: BicolorIdCard,
    },
    screens: ['BeneficiaryRequestSent'],
    title: 'Identification',
    subtitle: 'Confirme tes informations',
    stepState: StepButtonState.CURRENT,
  },
  {
    name: IdentityCheckStep.PROFILE,
    title: 'Profil',
    icon: {
      disabled: BicolorProfile,
      current: BicolorProfile,
      completed: BicolorProfile,
      retry: BicolorProfile,
    },
    screens: [],
    stepState: StepButtonState.DISABLED,
  },
  {
    name: IdentityCheckStep.CONFIRMATION,
    title: 'Confirmation',
    icon: {
      disabled: BicolorProfile,
      current: BicolorProfile,
      completed: BicolorProfile,
      retry: BicolorProfile,
    },
    screens: [],
    stepState: StepButtonState.DISABLED,
  },
]
