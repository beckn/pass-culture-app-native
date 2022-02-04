import * as React from 'react'
import Svg, { Path, G } from 'react-native-svg'
import styled from 'styled-components/native'

import { RectangleIconInterface } from './types'

function LogoPassCultureSvg({ width, height, color, testID }: RectangleIconInterface) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 107 36"
      testID={testID}
      accessibilityLabel="pass culture"
      accessibilityRole="image">
      <G fill="none" fillRule="evenodd">
        <G fill={color} fillRule="nonzero">
          <Path
            d="M33.362 13.427c.677-.417 1.2-1.004 1.571-1.76s.557-1.632.557-2.627c0-1.007-.189-1.898-.565-2.672-.378-.774-.91-1.373-1.598-1.797-.688-.425-1.482-.637-2.379-.637-.646 0-1.229.133-1.75.397-.52.265-.954.648-1.3 1.153V4.027h-2.766V17.52h2.765v-5.013c.358.504.799.888 1.319 1.152.52.264 1.116.396 1.786.396.898 0 1.684-.209 2.36-.627zM28.57 10.94c-.448-.503-.672-1.167-.672-1.99 0-.8.224-1.454.672-1.964.45-.51 1.027-.765 1.733-.765.706 0 1.28.255 1.723.765.443.51.664 1.165.664 1.963 0 .811-.221 1.472-.664 1.982-.442.51-1.017.764-1.723.764-.706 0-1.283-.251-1.733-.755zm34.313.857c-.222.129-.517.194-.888.194-.539 0-1.11-.108-1.715-.324-.604-.214-1.152-.518-1.642-.91l-.898 1.915c.538.443 1.173.784 1.903 1.023.73.24 1.49.36 2.28.36 1.148 0 2.09-.273 2.827-.82.736-.547 1.104-1.312 1.104-2.295 0-.65-.163-1.176-.485-1.577-.324-.399-.707-.7-1.15-.902-.442-.203-1.004-.409-1.687-.618-.622-.184-1.07-.35-1.346-.497-.275-.148-.413-.357-.413-.627 0-.246.103-.43.305-.553.204-.122.474-.184.808-.184.407 0 .868.083 1.382.249.515.165 1.035.402 1.562.71l.952-1.935c-.539-.357-1.138-.631-1.796-.822-.658-.19-1.316-.285-1.973-.285-1.102 0-2.011.27-2.73.81-.717.541-1.076 1.303-1.076 2.287 0 .639.155 1.158.467 1.557.31.4.685.697 1.121.894.437.196.985.394 1.643.59.622.184 1.074.357 1.355.516.28.16.422.38.422.663 0 .259-.11.451-.332.581zm-37.75 20.111h2.765V18.231h-2.765v13.676zm-5.09-5.014c0 .737-.191 1.34-.575 1.807-.382.467-.903.707-1.561.718-.562 0-1.005-.177-1.329-.534-.322-.356-.485-.848-.485-1.474v-5.42h-2.764v6.23c0 1.168.314 2.093.943 2.775.628.682 1.475 1.023 2.54 1.023 1.495 0 2.573-.62 3.23-1.862v1.751h2.748V21.99h-2.747v4.903zM8.76 29.041c-.581.276-1.152.415-1.714.415-.706 0-1.353-.181-1.94-.544-.586-.363-1.046-.854-1.382-1.475-.335-.62-.502-1.305-.502-2.055 0-.75.167-1.432.502-2.045.336-.616.796-1.1 1.383-1.457.586-.357 1.233-.535 1.939-.535.585 0 1.169.151 1.75.452.58.302 1.085.716 1.516 1.244l1.651-2.083c-.622-.664-1.375-1.189-2.261-1.576-.885-.386-1.783-.58-2.693-.58-1.244 0-2.378.289-3.4.866-1.024.578-1.83 1.37-2.415 2.378-.586 1.007-.88 2.132-.88 3.373 0 1.254.288 2.39.862 3.41.574 1.02 1.364 1.822 2.37 2.405 1.004.584 2.123.876 3.356.876.909 0 1.815-.209 2.72-.627.903-.417 1.69-.983 2.36-1.696l-1.67-1.861c-.455.466-.973.838-1.552 1.115zm25.873.599c-.587 0-.88-.38-.88-1.143v-4.092h2.62v-1.972h-2.62v-2.728h-2.746v2.728h-1.347v1.954h1.347v4.59c0 .983.281 1.738.843 2.267.563.529 1.293.792 2.19.792.443 0 .883-.058 1.32-.175.436-.117.834-.286 1.193-.507l-.574-2.083c-.49.246-.94.369-1.346.369zm17.78-5.862V21.99h-2.763v9.917h2.764v-4.774c0-.786.248-1.416.745-1.889.496-.473 1.17-.71 2.019-.71.192 0 .335.007.43.019V21.88c-.717.012-1.345.178-1.884.497-.538.32-.975.787-1.31 1.4zm8.681-1.88c-.968 0-1.83.212-2.584.636-.753.424-1.34 1.02-1.759 1.788-.418.768-.628 1.656-.628 2.664 0 .995.207 1.873.62 2.635.412.763.999 1.353 1.759 1.77.759.417 1.648.627 2.665.627.862 0 1.643-.15 2.342-.452.7-.3 1.296-.734 1.786-1.3l-1.454-1.511c-.335.345-.712.605-1.13.783-.42.178-.856.268-1.311.268-.622 0-1.155-.176-1.597-.525-.443-.35-.742-.839-.897-1.466h6.928c.012-.16.018-.387.018-.682 0-1.647-.404-2.931-1.211-3.853-.808-.921-1.99-1.382-3.547-1.382zm-2.243 4.24c.109-.663.363-1.189.764-1.576.4-.387.9-.58 1.498-.58.634 0 1.143.196 1.526.589.383.393.586.915.61 1.567h-4.398zm-14.202.755c0 .737-.192 1.34-.575 1.807-.383.467-.903.707-1.562.718-.562 0-1.004-.177-1.328-.534-.322-.356-.485-.848-.485-1.474v-5.42h-2.764v6.23c0 1.168.314 2.093.943 2.775.628.682 1.474 1.023 2.54 1.023 1.495 0 2.573-.62 3.23-1.862v1.751h2.747V21.99H44.65v4.903zm8.511-15.097c-.22.129-.517.194-.889.194-.538 0-1.11-.108-1.713-.324-.605-.214-1.152-.518-1.643-.91l-.897 1.915c.538.443 1.172.784 1.902 1.023.73.24 1.49.36 2.28.36 1.149 0 2.09-.273 2.827-.82.736-.547 1.104-1.312 1.104-2.295 0-.65-.161-1.176-.485-1.577-.323-.399-.706-.7-1.149-.902-.442-.203-1.005-.409-1.686-.618-.624-.184-1.072-.35-1.347-.497-.276-.148-.413-.357-.413-.627 0-.246.102-.43.305-.553.203-.122.473-.184.808-.184.407 0 .868.083 1.382.249.515.165 1.036.402 1.562.71l.95-1.935c-.538-.357-1.136-.631-1.794-.822-.659-.19-1.317-.285-1.975-.285-1.1 0-2.01.27-2.728.81-.719.541-1.077 1.303-1.077 2.287 0 .639.156 1.158.467 1.557.31.4.685.697 1.122.894.436.196.984.394 1.642.59.622.184 1.074.357 1.355.516.281.16.422.38.422.663 0 .259-.11.451-.332.581zM40.786 7.99c-1.173.012-2.08.279-2.72.802-.64.522-.96 1.25-.96 2.184 0 .922.3 1.668.897 2.24.598.57 1.407.857 2.424.857.67 0 1.262-.111 1.777-.332.514-.221.933-.54 1.256-.959v1.161h2.71l-.017-6.47c-.012-1.118-.374-1.99-1.087-2.617-.711-.626-1.713-.94-3.006-.94-.802 0-1.538.093-2.208.277-.67.184-1.388.473-2.154.867l.862 1.953c1.017-.577 1.974-.867 2.872-.867.658 0 1.157.146 1.498.434.341.289.512.697.512 1.225v.185h-2.656zm2.656 2.562c-.084.43-.335.787-.754 1.069-.418.283-.915.424-1.49.424-.467 0-.835-.113-1.103-.342-.27-.226-.404-.53-.404-.911 0-.393.129-.679.386-.857.257-.179.654-.268 1.193-.268h2.172v.885zM82.516 9.44c.059.107.17.168.285.168.053 0 .106-.013.156-.04.156-.087.214-.284.127-.442l-2.272-4.143c-.086-.157-.284-.215-.44-.128-.157.086-.214.284-.128.441l2.272 4.143zM79.588 4.1c.06.108.17.169.285.169.053 0 .106-.013.155-.04.158-.087.215-.285.129-.442l-.93-1.694c-.085-.157-.283-.214-.44-.128-.157.086-.213.284-.127.442l.928 1.693zm6.066 7.826c.038.147.17.245.314.245.027 0 .054-.004.081-.01.173-.045.278-.222.233-.396L83.666 1.553c-.044-.174-.22-.279-.394-.234-.174.044-.278.222-.234.395l2.616 10.213zM83.4 10.38c-.156.086-.214.284-.128.442l.648 1.18c.059.108.17.17.284.17.053 0 .106-.013.156-.041.157-.086.214-.284.128-.441l-.647-1.182c-.087-.157-.284-.215-.44-.128zm-1.18 2.323c.064.068.15.102.236.102.08 0 .16-.03.222-.088.13-.123.137-.329.015-.46l-5.911-6.31c-.123-.13-.328-.137-.458-.014-.131.123-.138.328-.015.46l5.91 6.31zm6.755-.54c.027.006.054.01.08.01.145 0 .276-.098.314-.245l2.458-9.595c.045-.174-.06-.351-.233-.396-.174-.044-.35.06-.395.234l-2.458 9.596c-.044.174.06.35.234.396zm-8.844 9.52c.046 0 .093-.01.138-.032l1.367-.645c.162-.076.231-.27.155-.432-.076-.162-.27-.232-.431-.156l-1.367.645c-.163.076-.232.27-.156.432.055.118.172.187.294.187zm1.367-5.44c.136 0 .264-.088.308-.226.056-.17-.038-.354-.208-.41l-6.353-2.068c-.17-.055-.353.038-.408.208-.055.171.038.355.208.41l6.353 2.07c.033.01.067.015.1.015zm-2.817 5.439l-3.52 1.66c-.162.077-.232.27-.156.433.056.117.173.186.294.186.046 0 .093-.01.138-.03l3.52-1.661c.163-.077.232-.27.156-.433-.077-.162-.27-.232-.432-.155zm3.135-2.717c-.034-.177-.203-.292-.379-.259l-9.755 1.866c-.176.033-.292.203-.258.38.03.156.165.264.318.264.02 0 .04-.002.06-.006l9.757-1.865c.175-.034.291-.204.257-.38zm-4.622-1.415l4.284.27.02.001c.17 0 .313-.132.323-.304.012-.18-.124-.334-.303-.345l-4.284-.27c-.178-.012-.332.125-.343.304-.012.179.124.333.303.344zm16.016-3.298c.062.098.166.151.274.151.06 0 .12-.016.173-.05l8.228-5.236c.15-.096.196-.297.1-.45-.096-.15-.296-.195-.447-.1l-8.228 5.237c-.151.096-.196.297-.1.448zm6.54-.362c-.056-.171-.239-.265-.409-.21l-5.917 1.928c-.17.055-.263.239-.208.41.044.137.172.224.308.224.034 0 .068-.005.1-.016l5.917-1.927c.17-.055.264-.239.208-.41zm-6.246 3.282c-.178.011-.314.166-.303.345.01.172.153.304.323.304h.02l3.547-.224c.18-.011.315-.165.303-.345-.01-.179-.165-.315-.343-.304l-3.547.224zm-.118 3.834l6.2 2.924c.044.021.09.031.137.031.122 0 .238-.069.294-.186.076-.163.007-.356-.156-.433l-6.198-2.924c-.162-.076-.356-.006-.432.156-.076.162-.006.356.155.432zm-2.725-8.874c.05.028.103.04.156.04.114 0 .225-.06.284-.168l1.923-3.507c.087-.157.03-.355-.127-.441-.157-.087-.354-.03-.44.128l-1.924 3.507c-.087.157-.029.355.128.441zm-8.949 1.67l-1.408-.896c-.151-.096-.351-.051-.447.1-.096.152-.051.353.1.449l1.408.896c.053.034.114.05.173.05.108 0 .212-.053.274-.15.096-.152.051-.353-.1-.449zm19.148-.274c.045.137.172.225.308.225.034 0 .068-.006.1-.017l2.27-.739c.17-.055.263-.239.208-.41-.055-.17-.238-.263-.409-.208l-2.269.74c-.17.055-.263.238-.208.409zm-7.033-2.394c.063.058.143.088.222.088.086 0 .173-.035.237-.103l3.021-3.226c.123-.13.116-.336-.014-.46-.13-.122-.336-.116-.458.015l-3.022 3.226c-.123.131-.116.337.014.46zm-.557.594c-.13-.123-.336-.116-.458.015l-.483.514c-.123.13-.116.336.014.46.062.058.142.087.222.087.087 0 .173-.034.236-.102l.484-.514c.122-.131.116-.337-.015-.46zm.16-4.646c.05.028.103.04.156.04.115 0 .226-.06.285-.168l2.32-4.23c.086-.158.029-.356-.128-.442-.157-.086-.354-.03-.44.128l-2.32 4.23c-.087.158-.03.356.127.442zm-1.858 16.395c-.145.105-.178.308-.072.453l1.729 2.387c.063.087.162.134.262.134.066 0 .133-.02.19-.062.146-.106.177-.309.072-.454l-1.729-2.387c-.105-.145-.307-.177-.452-.071zM98.15 6.843c.086 0 .173-.034.236-.102l1.721-1.837c.123-.131.116-.337-.014-.46s-.336-.116-.459.014l-1.72 1.838c-.123.13-.117.336.013.46.063.058.143.087.223.087zM73.546 9.375l5.208 3.313c.054.034.114.05.174.05.107 0 .212-.053.274-.15.095-.152.05-.353-.1-.449l-5.208-3.313c-.152-.096-.352-.051-.448.1-.096.152-.051.353.1.449zm20.057 23.038c-.066-.166-.254-.248-.42-.182-.167.066-.249.255-.183.422l.626 1.584c.05.128.173.206.302.206.04 0 .08-.008.12-.023.165-.066.247-.255.181-.422l-.626-1.585zm-2.985-7.558l-.424-1.072c-.065-.167-.254-.249-.42-.183-.167.067-.248.256-.183.422l.424 1.072c.05.128.173.205.302.205.039 0 .08-.007.119-.022.166-.067.248-.256.182-.422zm-1.592 5.035c.178-.022.304-.185.281-.363l-.714-5.665c-.022-.178-.184-.304-.362-.282-.177.023-.303.185-.28.364l.713 5.664c.02.165.16.285.321.285.014 0 .028-.001.041-.003zm.114.902c-.178.022-.304.185-.28.363l.416 3.31c.021.165.16.285.321.285.014 0 .028 0 .042-.003.177-.022.303-.185.28-.363l-.416-3.31c-.023-.178-.185-.304-.363-.282zm4.23-8.48c-.137-.114-.341-.095-.456.043-.114.139-.095.344.043.458l6.931 5.747c.06.05.134.074.207.074.093 0 .185-.04.25-.118.114-.138.095-.343-.044-.457l-6.93-5.747zm11.55-5.86l-6.456.406c-.178.012-.314.166-.303.345.01.172.154.305.323.305h.021l6.455-.408c.179-.011.315-.166.303-.345-.011-.179-.164-.315-.344-.304zm-1.091 4.212l-10.242-1.959c-.177-.033-.346.082-.38.259-.033.176.082.346.258.38l10.242 1.958c.02.004.041.006.061.006.153 0 .289-.108.319-.264.033-.176-.083-.346-.258-.38zM87.512.08c-.179 0-.324.145-.324.325v2.458c0 .179.145.324.324.324.179 0 .324-.145.324-.324V.405c0-.18-.145-.325-.324-.325zm7.403 27.455c-.106-.145-.309-.177-.453-.072-.145.106-.177.309-.072.454l2.42 3.338c.063.088.162.134.262.134.066 0 .133-.02.19-.062.145-.105.178-.308.072-.454l-2.42-3.338zm8.662-2.442l-2.269-1.07c-.162-.077-.355-.007-.431.155-.077.163-.008.357.155.433l2.269 1.07c.045.021.091.032.138.032.121 0 .238-.07.293-.187.077-.163.007-.356-.155-.433zm-12.36 1.279c-.066-.167-.254-.249-.421-.183-.166.067-.248.255-.182.422l1.736 4.397c.051.127.173.205.302.205.04 0 .08-.007.12-.023.166-.066.247-.255.181-.422l-1.736-4.396zm-9.105-4.018c-.114-.139-.318-.158-.457-.043l-6.715 5.568c-.138.114-.158.32-.044.458.064.077.157.117.25.117.073 0 .146-.024.207-.074l6.716-5.569c.138-.114.157-.319.043-.457zm-8.277 1.613l-2.23 1.052c-.162.076-.231.27-.155.432.055.118.172.187.293.187.047 0 .094-.01.138-.031l2.23-1.052c.162-.076.231-.27.155-.432-.076-.162-.27-.232-.431-.156zm1.926-6.508c.17 0 .312-.133.323-.305.011-.18-.124-.334-.303-.345l-5.676-.358c-.179-.011-.333.125-.344.304-.011.18.125.334.303.345l5.676.358h.021zm-4.924-4.674l2.732.89c.033.01.067.016.1.016.137 0 .264-.087.309-.225.055-.17-.038-.354-.208-.41l-2.732-.889c-.17-.055-.354.038-.409.209-.055.17.038.354.208.41zm7.721 16.891l-1.552 2.141c-.105.145-.073.348.072.454.057.042.124.062.19.062.1 0 .2-.047.263-.134l1.552-2.14c.105-.146.073-.35-.072-.455-.145-.105-.348-.073-.453.072zm4.894-6.2c-.145-.105-.348-.073-.453.072l-3.502 4.832c-.105.145-.073.348.072.454.058.042.124.062.19.062.1 0 .2-.046.263-.134l3.502-4.832c.105-.145.073-.348-.072-.454zm1.798.124c-.166-.066-.354.016-.42.183l-1.385 3.507c-.066.167.015.356.182.422.039.015.08.023.119.023.13 0 .25-.078.301-.205l1.386-3.508c.065-.166-.016-.355-.183-.422zm1.543-.02c-.177-.022-.34.104-.362.282l-1.442 11.442c-.023.178.103.34.28.363l.042.003c.161 0 .3-.12.32-.285l1.443-11.441c.023-.179-.103-.341-.28-.364zm.72-18.765c-.18 0-.325.145-.325.325v6.707c0 .179.145.325.324.325.179 0 .324-.146.324-.325V5.14c0-.18-.145-.325-.324-.325zm-4.28 23.893c-.166-.066-.355.016-.42.183l-2.018 5.107c-.066.167.016.356.182.422.04.015.08.023.12.023.129 0 .25-.078.301-.206l2.018-5.107c.065-.167-.016-.356-.183-.422z"
            transform="translate(-134 -607) translate(134.741 607)"
          />
        </G>
      </G>
    </Svg>
  )
}

export const LogoPassCulture = styled(LogoPassCultureSvg).attrs(
  ({ color, width, height, theme }) => ({
    color: color ?? theme.colors.white,
    width: width ?? 107,
    height: height ?? 36,
  })
)``
