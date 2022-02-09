import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import { KYCTierType } from 'modules/kyc/type'
import querystring from 'querystring'

export type BankType = {
	bank_name: string
	bank_code: string
}

type KycProps = {
	amount?: number
	enabled?: boolean
}

export default ({ enabled = true, amount = 10000 }: KycProps) => {
	return useQueryAction<KYCTierType>({
		endpoint: `${ENDPOINTS.API_GET_KYC}${amount ? `?${querystring.stringify({ amount })}` : ''}`,
		enabled,
		queryKey: [amount],
	})
}
