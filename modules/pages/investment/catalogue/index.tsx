import Navigation from 'components/layout/dashboard'
import CatalogueWrapper from 'modules/products/catalogue/CatalogueWrapper'
import CataLogue from 'modules/products/catalogue/Catalogue'

const Index = () => {
	return (
		<Navigation>
			{/* <CatalogueWrapper> */}
			<CataLogue showCatalogue={true} />
			{/* </CatalogueWrapper> */}
		</Navigation>
	)
}

export default Index
