import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import { getPrismicClient } from '../../services/prismic'

import styles from './styles.module.scss'

type Post = {
  excerpt: string
  slug: string
  title: string
  updatedAt: string
}

interface PostsProps {
  posts: Post[]
}

export default function Posts ({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | ignews</title>
      </Head>
      
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query(
    [
      Prismic.Predicates.at('document.type', 'post' )
    ],
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 100
    }
  )

  const posts = response.results.map((post) => {
    const excerpt =
      post.data.content.find((content) => content.type === 'paragraph')?.text ?? ''

    return {
      excerpt,
      slug: post.uid,
      title: RichText.asText(post.data.title),
      updatedAt: new Date(post.last_publication_date).toLocaleString('pt-br', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return {
    props: {
      posts
    }
  }
}