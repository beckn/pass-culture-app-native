import React from 'react'

import { ButtonSecondary } from 'ui/components/buttons/ButtonSecondary'

export interface ViewTripDetailsButtonProps {
  onClick?: () => void
  fullWidth?: boolean
  disabled?: boolean
  isLoading?: boolean

}

export const ViewTripDetailsButton = ({
  onClick,
  fullWidth = false,
  isLoading = false,
  disabled = false,

}: ViewTripDetailsButtonProps) => {
  return (
    <ButtonSecondary
      wording="Afficher les détails du voyage"
      onPress={onClick}
      fullWidth={fullWidth}
      disabled={isLoading || disabled}
      isLoading={isLoading}
    />
  )
}
