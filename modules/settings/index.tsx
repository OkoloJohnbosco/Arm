import React from 'react'
import { Box, Stack, Button, Kbd } from '@chakra-ui/react'
import SubHeading from 'components/typography/SubHeading'
import Body from 'components/typography/Body'
import SettingsSelector from './SettingsSelector'

export type RouteProps =
	| 'profile'
	| 'rm'
	| 'kyc'
	| 'options'
	| 'referral'
	| 'add-account'
	| 'referral'
	| 'next-of-kin'
	| 'direct-debit'
	| 'bank-details'

type LinkProps = {
	title: string
	path: RouteProps
}

const links: LinkProps[] = [
	{ title: 'Profile', path: 'profile' },
	{ title: 'Next-of-kin', path: 'next-of-kin' },
	{ title: 'Relationship Manager', path: 'rm' },
	{ title: 'Kyc Security', path: 'kyc' },
	{ title: 'Direct Debit', path: 'direct-debit' },
	{ title: 'Referral', path: 'referral' },
	// { title: 'Redemptions', path: 'redemption' },
	{ title: 'Security', path: 'options' },
	{ title: 'Bank Details', path: 'bank-details' },
	{ title: 'Add Account', path: 'add-account' },
]

function Settings() {
	const [activeRoute, setActiveRoute] = React.useState<RouteProps>('profile')

	return (
		<Box maxW="1200px" w="full" mx="auto">
			<Stack px={{ base: 4, md: 6 }}>
				<SubHeading>Settings</SubHeading>
				<Body color="neutral.800" variant="regular14">
					Frome here you can edit your account preferences
				</Body>
			</Stack>

			<Stack mt="60px" spacing={10}>
				<Stack px={{ base: 0, md: 6 }}>
					<Stack px={{ base: 3, md: 5 }} border="1px solid #DFE0EB" overflow="hidden" py={{ base: 4, md: 5 }} bg="neutral.0">
						<Box transform="translateY(-5px)" pb={0} zIndex={1} overflowX="auto" className="setting-link-container" position="relative">
							<Stack direction="row" spacing={{ base: 1, md: 1 }} borderBottom="2px solid rgba(0,0,0, .15)" w="max-content" minW="1000px">
								{links.map(({ title, path }) => (
									<Button
										rounded={0}
										minW="max-content"
										bg="transparent"
										_hover={{
											outline: 'none',
											backgroundColor: 'transparent',
										}}
										_active={{
											outline: 'none',
										}}
										_focus={{ outline: 'none' }}
										key={title}
										cursor="pointer"
										onClick={() => setActiveRoute(path)}
										className={`setting-link ${activeRoute === path ? 'active' : ''}`}
									>
										{title}
									</Button>
								))}
							</Stack>
						</Box>
					</Stack>
				</Stack>
				<Box px={{ base: 4, md: 6 }}>
					<SettingsSelector section={activeRoute} />
				</Box>
			</Stack>
		</Box>
	)
}

export default Settings
