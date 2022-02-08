import Body from './Body'
import { BodyTypography } from './types'

const Caption = ({ alt, ...others }: BodyTypography) => <Body lineHeight={6} variant={alt ? 'semibold14' : 'semibold13'} {...others} />

export default Caption
