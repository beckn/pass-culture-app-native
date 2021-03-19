import React from 'react'

import { Expense, UserProfileResponse } from 'api/gen'
import { ExpensesAndDepositVersion, ExpenseV2 } from 'features/profile/components/types'
import { computeWalletBalance } from 'features/profile/utils'
import { formatToSlashedFrenchDate } from 'libs/dates'

import { BeneficiaryHeader } from './BeneficiaryHeader'
import { ExBeneficiaryHeader } from './ExBeneficiaryHeader'
import { LoggedOutHeader } from './LoggedOutHeader'
import { NonBeneficiaryHeader } from './NonBeneficiaryHeader'

type ProfileHeaderProps = {
  user?: UserProfileResponse
}

export function ProfileHeader(props: ProfileHeaderProps) {
  const { user } = props

  if (!user) {
    return <LoggedOutHeader />
  }

  if (user.isBeneficiary) {
    const depositVersion = user.depositVersion && user.depositVersion === 1 ? 1 : 2
    const depositExpirationDate = user.depositExpirationDate
      ? formatToSlashedFrenchDate(user.depositExpirationDate.toString())
      : undefined

    const isExpired = user.depositExpirationDate
      ? new Date(user.depositExpirationDate) < new Date()
      : false

    if (isExpired) {
      return <ExBeneficiaryHeader depositExpirationDate={depositExpirationDate} />
    }

    return (
      <BeneficiaryHeader
        firstName={user.firstName}
        lastName={user.lastName}
        walletBalance={computeWalletBalance(user.expenses)}
        depositExpirationDate={depositExpirationDate}
        {...getBeneficiaryHeaderProps(depositVersion, user.expenses)}
      />
    )
  }

  if (!user.eligibilityStartDatetime || !user.eligibilityEndDatetime) {
    return null
  }

  return (
    <NonBeneficiaryHeader
      email={user.email}
      eligibilityStartDatetime={user.eligibilityStartDatetime.toString()}
      eligibilityEndDatetime={user.eligibilityEndDatetime.toString()}
    />
  )
}

export function getBeneficiaryHeaderProps(
  depositVersion: 1 | 2,
  expenses: Expense[] | ExpenseV2[]
) {
  let localProps: ExpensesAndDepositVersion
  if (depositVersion === 1) {
    localProps = {
      expenses: expenses as Expense[],
      depositVersion: depositVersion,
    }
  } else {
    localProps = {
      expenses: expenses as ExpenseV2[],
      depositVersion: depositVersion,
    }
  }
  return localProps
}
