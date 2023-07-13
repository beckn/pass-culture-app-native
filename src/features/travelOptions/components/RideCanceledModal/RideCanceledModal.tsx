import React from 'react'
import styled from 'styled-components/native'
import { ButtonWithLinearGradient } from 'ui/components/buttons/buttonWithLinearGradient/ButtonWithLinearGradient'
import { AppInformationModal } from 'ui/components/modals/AppInformationModal'

import { Spacer, Typo } from 'ui/theme'

type Props = {
    hideModal: () => void
    isModalVisible: boolean
    onPressModalButton: () => void
}

export const RideCanceledModal: React.FC<Props> = ({
  isModalVisible,
  hideModal,
  onPressModalButton,
}) => {

  const callToActionMessage = 'Fermer'
  return (
    <AppInformationModal
      title=""
      visible={isModalVisible}
      onCloseIconPress={hideModal}
      testIdSuffix="rFide-cancelled-modal">
      <MainContainer>
        <ModalImage source={require('../../assets/images/RideCanceledImage.png')}  />
        <TitleText>
            Votre trajet a été annulé
        </TitleText>
        <Spacer.Column numberOfSpaces={5} />
       
        <InformationText>
            Nous sommes désolés, mais votre trajet a été annulé. Pour reprogrammer la course, veuillez réessayer.
        </InformationText>
        <Spacer.Column numberOfSpaces={8} />
        
          <>
            <ButtonWithLinearGradient
              wording={callToActionMessage}
              onPress={onPressModalButton}
            />
          </>
      </MainContainer>
    </AppInformationModal>
  )
}

const InformationText = styled(Typo.Body)({
    fontFamily: 'Montserrat',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
  })
const TitleText = styled(Typo.Body)({
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 18,
    letterSpacing: 0,
  })
const MainContainer = styled.View({marginTop:-35,alignContent:'flex-start',})
const ModalImage = styled.Image({alignSelf:'center'})

