import { GetStaticProps } from 'next'
import Head from 'next/head'

import { SubscribeButton } from '../components/SubscribeButton'

import { stripe } from '../services/stripe'

import styles from './home.module.scss'

interface HomeProps {
  product: {
    amount: number
    priceId: string
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>

          <h1>News about the <span>React</span> world.</h1>

          <p>
            Get access to all the publications <br />
            <span>
              for{' '}
              {new Intl.NumberFormat('en-us', {
                currency: 'USD',
                style: 'currency'
              }).format(product.amount)}{' '}
              month
            </span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JX60yBH5IRtAlM3aP3fPNVJ', {
    expand: ['product']
  })

  const product = {
    amount: price.unit_amount / 100,
    priceId: price.id
  }

  const TWO_MINUTES = 60 * 2

  return {
    props: {
      product
    },
    revalidate: TWO_MINUTES
  }
}
