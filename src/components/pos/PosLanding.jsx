import React from 'react'
import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import CustomContainer from '../container'

/**
 * The POS page restaurant owners read before they sign up.
 *
 * It lives on the customer site because that is the domain Google indexes and the
 * one an owner can reach; manage.trkgo.in is behind a login and sells nothing.
 *
 * Only what the POS can actually do today is listed as a feature. What is still
 * being built has its own short strip, named as such - a restaurant that finds out
 * in month two leaves in month two.
 */

const PANEL_URL = 'https://manage.trkgo.in'
const WHATSAPP_TEXT = 'Hi TrkGo, I want the POS for my restaurant.'

/**
 * The business phone as WhatsApp wants it: digits only, with the country code.
 * A ten-digit Indian number is stored without one, so add it rather than send the
 * owner to a dead wa.me link.
 */
const waNumber = (phone) => {
    const digits = String(phone || '').replace(/\D/g, '')

    if (!digits) return null
    if (digits.length === 10) return '91' + digits

    return digits
}

const PLANS = [
    {
        id: 'basic',
        name: 'Basic',
        who: 'Cloud kitchen',
        line: 'Billing, kitchen tickets, kitchen screen and your online orders in one place.',
        points: [
            'Billing, KOT and kitchen display',
            'Offline billing when the internet drops',
            'Zomato / Swiggy payout checking',
            'Menu, stock and basic reports',
        ],
    },
    {
        id: 'pro',
        name: 'Pro',
        who: 'Restaurant',
        line: 'Everything in Basic, plus tables, captain, QR ordering and full stock.',
        popular: true,
        points: [
            'Tables, floor plan and running bills',
            'Captain app and QR ordering',
            'Recipes, purchases and stock audit',
            'Loyalty, coupons and offers',
        ],
    },
    {
        id: 'advanced',
        name: 'Advanced',
        who: 'Premium restaurant / chain',
        line: 'Everything in Pro, plus multiple outlets and central kitchen.',
        points: [
            'Multi-outlet comparison',
            'Central kitchen and stock transfer',
            'Deeper reports and controls',
            'Everything in Pro',
        ],
    },
]

const FEATURES = [
    {
        title: 'Billing that does not stop',
        body: 'The till watches the server. If the line or the server goes down at 8 PM it moves to offline billing by itself, and the bills sync when the internet is back.',
    },
    {
        title: 'Kitchen tickets and kitchen screen',
        body: 'KOT printing, a live kitchen display with timers, and token numbers on a screen your customers can see.',
    },
    {
        title: 'Tables, captain and QR ordering',
        body: 'Floor plan, running bill per table, split and merge, a captain app on staff phones, and guests ordering from the table QR.',
    },
    {
        title: 'Stock that counts itself',
        body: 'Recipes take raw material out of stock as dishes are sold. Purchases, suppliers, stock count and low-stock warnings.',
    },
    {
        title: 'Know where the money went',
        body: 'Cash shift with opening and closing count, day-end report, expense book, khata for regulars, and an audit log of every void and discount.',
    },
    {
        title: 'Catch what Zomato did not pay',
        body: 'Upload the orders sheet and the payout sheet; the POS lists what was not paid, short paid or paid twice. Works for Swiggy and ONDC too.',
    },
    {
        title: 'Bills on WhatsApp, payment by UPI QR',
        body: 'Send the bill on WhatsApp instead of printing it, and print a UPI QR with the amount already in it so nobody types it wrong.',
    },
    {
        title: 'Training built in',
        body: 'Every feature has a page saying what it does, how to use it and when. Print it and hand it to a new cashier.',
    },
]

const SOON = [
    'Zomato and Swiggy orders landing straight in the POS',
    'ONDC selling',
    'Printer routing to kitchen, bar and counter',
    'Course and fire control for fine dining',
]

const FAQ = [
    {
        q: 'Is it really free?',
        a: 'Yes, while TrkGo is launching. You will be told well before anything changes, and nothing is charged without you agreeing first.',
    },
    {
        q: 'Do I have to take online delivery orders?',
        a: 'No. You can run only the POS. When you are ready for online orders you ask for it from your panel and we switch it on.',
    },
    {
        q: 'What happens when the internet goes?',
        a: 'Billing carries on. Bills are saved on the machine and sent up automatically when the connection returns.',
    },
    {
        q: 'What do I need to start?',
        a: 'A computer or tablet with a browser and a normal bill printer. Nothing to install - the POS runs in the browser and can be added to the desktop like an app.',
    },
]

const PosLanding = ({ configData }) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const phone = configData?.phone
    const wa = waNumber(phone)
    const waHref = wa ? `https://wa.me/${wa}?text=${encodeURIComponent(WHATSAPP_TEXT)}` : null

    const whatsappSx = {
        background: '#25D366',
        color: '#fff',
        fontWeight: 800,
        px: 3.5,
        py: 1.2,
        '&:hover': { background: '#1EBE5B' },
    }

    const card = {
        height: '100%',
        border: '1px solid',
        borderColor: theme.palette.neutral?.[200] || '#E9ECF3',
        borderRadius: '14px',
        background: theme.palette.background.paper,
        p: { xs: 2.5, md: 3 },
    }

    return (
        <Box sx={{ pb: { xs: '80px', md: '40px' } }}>
            {/* ---------------------------------------------------------- hero */}
            <Box
                sx={{
                    background: `linear-gradient(120deg, ${theme.palette.primary.main} 0%, #FF3D9A 55%, #FF7AB8 100%)`,
                    color: '#fff',
                    py: { xs: 5, md: 8 },
                    mb: { xs: 4, md: 6 },
                }}
            >
                <CustomContainer>
                    <Box sx={{ maxWidth: '760px' }}>
                        <Typography
                            sx={{ fontSize: '.78rem', fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', opacity: 0.9 }}
                        >
                            {t('For restaurants and cloud kitchens')}
                        </Typography>

                        <Typography
                            component="h1"
                            sx={{ fontSize: { xs: '1.9rem', md: '2.8rem' }, fontWeight: 800, lineHeight: 1.15, mt: 1.5 }}
                        >
                            {t('A restaurant POS that keeps billing when everything else stops')}
                        </Typography>

                        <Typography sx={{ fontSize: { xs: '.95rem', md: '1.05rem' }, mt: 2, lineHeight: 1.7, opacity: 0.95 }}>
                            {t('Counter billing, kitchen tickets, tables, stock, reports and your online orders in one place. Free while TrkGo is launching.')}
                        </Typography>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3.5 }}>
                            <Link href="/restaurant-registration" style={{ textDecoration: 'none' }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        background: '#fff',
                                        color: theme.palette.primary.main,
                                        fontWeight: 800,
                                        px: 3.5,
                                        py: 1.2,
                                        '&:hover': { background: '#fff', opacity: 0.9 },
                                    }}
                                >
                                    {t('Start free')}
                                </Button>
                            </Link>

                            {waHref && (
                                <Button href={waHref} target="_blank" rel="noopener" variant="contained" sx={whatsappSx}>
                                    {t('WhatsApp us')}
                                </Button>
                            )}

                            <Button
                                href={PANEL_URL}
                                target="_blank"
                                rel="noopener"
                                variant="outlined"
                                sx={{
                                    color: '#fff',
                                    borderColor: 'rgba(255,255,255,.7)',
                                    fontWeight: 700,
                                    px: 3.5,
                                    py: 1.2,
                                    '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.1)' },
                                }}
                            >
                                {t('Restaurant sign in')}
                            </Button>
                        </Stack>

                        {phone && (
                            <Typography sx={{ mt: 2, fontSize: '.88rem', opacity: 0.95 }}>
                                {t('Or call us')}:{' '}
                                <Box
                                    component="a"
                                    href={`tel:${phone}`}
                                    sx={{ color: '#fff', fontWeight: 800, textDecoration: 'underline' }}
                                >
                                    {phone}
                                </Box>
                            </Typography>
                        )}
                    </Box>
                </CustomContainer>
            </Box>

            <CustomContainer>
                {/* ------------------------------------------------------ plans */}
                <Typography component="h2" sx={{ fontSize: { xs: '1.3rem', md: '1.6rem' }, fontWeight: 800, mb: 1 }}>
                    {t('Three plans. All free for now.')}
                </Typography>
                <Typography sx={{ color: theme.palette.neutral?.[400] || '#5B627A', fontSize: '.92rem', mb: 3 }}>
                    {t('Pick the one that matches your kitchen. You can move up later without losing anything.')}
                </Typography>

                <Grid container spacing={2.5}>
                    {PLANS.map((plan) => (
                        <Grid item xs={12} md={4} key={plan.id}>
                            <Box
                                sx={{
                                    ...card,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderColor: plan.popular ? theme.palette.primary.main : card.borderColor,
                                    boxShadow: plan.popular ? '0 0 0 2px #FBD9EC' : 'none',
                                }}
                            >
                                <Typography sx={{ fontSize: '.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em', color: theme.palette.primary.main }}>
                                    {t(plan.who)}
                                </Typography>
                                <Typography sx={{ fontSize: '1.45rem', fontWeight: 800, mt: 0.5 }}>{plan.name}</Typography>
                                <Typography sx={{ fontSize: '.86rem', color: theme.palette.neutral?.[400] || '#5B627A', mt: 1, lineHeight: 1.6 }}>
                                    {t(plan.line)}
                                </Typography>

                                <Box sx={{ my: 2.5, py: 1.5, borderTop: '1px solid', borderBottom: '1px solid', borderColor: card.borderColor }}>
                                    <Typography sx={{ fontSize: '1.7rem', fontWeight: 800, color: '#12B76A', lineHeight: 1.1 }}>
                                        {t('Free')}
                                    </Typography>
                                    <Typography sx={{ fontSize: '.75rem', color: theme.palette.neutral?.[400] || '#949AAE' }}>
                                        {t('while TrkGo is launching')}
                                    </Typography>
                                </Box>

                                <Stack spacing={1.2} sx={{ flex: 1 }}>
                                    {plan.points.map((point) => (
                                        <Stack direction="row" spacing={1} key={point} alignItems="flex-start">
                                            <Box component="span" sx={{ color: theme.palette.primary.main, fontWeight: 800, lineHeight: 1.5 }}>
                                                &#10003;
                                            </Box>
                                            <Typography sx={{ fontSize: '.85rem', lineHeight: 1.55 }}>{t(point)}</Typography>
                                        </Stack>
                                    ))}
                                </Stack>

                                <Link href="/restaurant-registration" style={{ textDecoration: 'none' }}>
                                    {/*
                                        The colour is set here on purpose: the site theme paints every
                                        MuiButton label white, which leaves an outlined button reading
                                        white-on-white - a blank box where "Start free" should be.
                                    */}
                                    <Button
                                        variant={plan.popular ? 'contained' : 'outlined'}
                                        fullWidth
                                        sx={{
                                            mt: 3,
                                            fontWeight: 700,
                                            ...(plan.popular
                                                ? { color: '#fff' }
                                                : {
                                                      color: theme.palette.primary.main,
                                                      borderColor: theme.palette.primary.main,
                                                      '&:hover': {
                                                          color: theme.palette.primary.main,
                                                          borderColor: theme.palette.primary.main,
                                                          background: 'rgba(239,120,34,.06)',
                                                      },
                                                  }),
                                        }}
                                    >
                                        {t('Start free')}
                                    </Button>
                                </Link>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* --------------------------------------------------- features */}
                <Typography component="h2" sx={{ fontSize: { xs: '1.3rem', md: '1.6rem' }, fontWeight: 800, mt: { xs: 5, md: 7 }, mb: 3 }}>
                    {t('What you get on day one')}
                </Typography>

                <Grid container spacing={2.5}>
                    {FEATURES.map((feature) => (
                        <Grid item xs={12} sm={6} md={3} key={feature.title}>
                            <Box sx={card}>
                                <Typography sx={{ fontSize: '.95rem', fontWeight: 800, mb: 1 }}>{t(feature.title)}</Typography>
                                <Typography sx={{ fontSize: '.84rem', color: theme.palette.neutral?.[400] || '#5B627A', lineHeight: 1.65 }}>
                                    {t(feature.body)}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* ------------------------------------------------ being built */}
                <Box sx={{ ...card, mt: 3, background: '#FFFAEB', borderColor: '#FEDF89' }}>
                    <Typography sx={{ fontSize: '.95rem', fontWeight: 800, mb: 1 }}>{t('Being built now')}</Typography>
                    <Typography sx={{ fontSize: '.84rem', color: '#B54708', lineHeight: 1.7 }}>
                        {SOON.map((item) => t(item)).join(' · ')}
                    </Typography>
                    <Typography sx={{ fontSize: '.78rem', color: '#B54708', mt: 1, opacity: 0.85 }}>
                        {t('Listed here on purpose: these are not working yet, so nobody is promised them today.')}
                    </Typography>
                </Box>

                {/* --------------------------------------------------------- faq */}
                <Typography component="h2" sx={{ fontSize: { xs: '1.3rem', md: '1.6rem' }, fontWeight: 800, mt: { xs: 5, md: 7 }, mb: 3 }}>
                    {t('Questions restaurants ask')}
                </Typography>

                <Grid container spacing={2.5}>
                    {FAQ.map((item) => (
                        <Grid item xs={12} md={6} key={item.q}>
                            <Box sx={card}>
                                <Typography sx={{ fontSize: '.92rem', fontWeight: 800, mb: 1 }}>{t(item.q)}</Typography>
                                <Typography sx={{ fontSize: '.85rem', color: theme.palette.neutral?.[400] || '#5B627A', lineHeight: 1.65 }}>
                                    {t(item.a)}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* ---------------------------------------------------- last cta */}
                <Box
                    sx={{
                        ...card,
                        mt: { xs: 5, md: 7 },
                        textAlign: 'center',
                        background: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                        color: '#fff',
                        py: { xs: 4, md: 5 },
                    }}
                >
                    <Typography sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' }, fontWeight: 800 }}>
                        {t('Start with the POS today, add online orders when you are ready')}
                    </Typography>
                    <Typography sx={{ fontSize: '.9rem', mt: 1, opacity: 0.95 }}>
                        {t('Fill one form. We set the shop up and show your team how to use it.')}
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center" sx={{ mt: 3 }}>
                        <Link href="/restaurant-registration" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    background: '#fff',
                                    color: theme.palette.primary.main,
                                    fontWeight: 800,
                                    px: 3.5,
                                    py: 1.2,
                                    '&:hover': { background: '#fff', opacity: 0.9 },
                                }}
                            >
                                {t('Start free')}
                            </Button>
                        </Link>

                        {waHref && (
                            <Button href={waHref} target="_blank" rel="noopener" variant="contained" sx={whatsappSx}>
                                {t('WhatsApp us')}
                            </Button>
                        )}

                        <Button
                            href={phone ? `tel:${phone}` : '/help-and-support'}
                            variant="outlined"
                            sx={{
                                color: '#fff',
                                borderColor: 'rgba(255,255,255,.7)',
                                fontWeight: 700,
                                px: 3.5,
                                py: 1.2,
                                '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,.1)' },
                            }}
                        >
                            {phone ? `${t('Call')} ${phone}` : t('Talk to us')}
                        </Button>
                    </Stack>
                </Box>
            </CustomContainer>
        </Box>
    )
}

export default PosLanding
