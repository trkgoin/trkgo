import React from 'react'
import { CssBaseline } from '@mui/material'
import Meta from '../../components/Meta'
import PosLanding from '../../components/pos/PosLanding'
import { getCommonServerSideProps } from '@/helpers/serverSidePropsHelper'
import { processMetadata } from '@/utils/fetchPageMetadata'

/**
 * The POS page for restaurant owners.
 *
 * It sits on the customer site on purpose: this is the domain search engines index
 * and the one an owner can reach without a login. manage.trkgo.in is the panel they
 * sign in to afterwards, so it carries no marketing at all.
 */
const Index = ({ configData, metaData, pathName }) => {
    const metadata = processMetadata(metaData, {
        title: `Restaurant POS - ${configData?.business_name}`,
        description:
            'Billing, kitchen tickets, tables, stock and reports for restaurants and cloud kitchens. Keeps billing when the internet drops. Free while TrkGo is launching.',
        image: configData?.logo_full_url,
    })

    return (
        <>
            <CssBaseline />
            <Meta
                title={metadata.title}
                description={metadata.description}
                ogImage={metadata.image}
                pathName={pathName}
                robotsMeta={metadata.robotsMeta}
            />
            {/*
                Rendered on the server, unlike the rest of the site: this is the one
                page that has to be found on Google, and a NoSsr wrapper would serve
                search engines an empty body. Nothing here touches the browser, so
                there is nothing to defer.
            */}
            <PosLanding configData={configData} />
        </>
    )
}

export default Index

export const getServerSideProps = async (context) => {
    return await getCommonServerSideProps(context, 'restaurant_pos_page')
}
