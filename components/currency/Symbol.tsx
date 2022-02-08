import symbols from './icon'

const currency = (props: { currency: keyof typeof symbols }) => symbols[props.currency.toUpperCase()]?.html
export default currency
