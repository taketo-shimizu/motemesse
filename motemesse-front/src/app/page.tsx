import { redirect } from 'next/navigation'

export default async function Home() {
  // クッキー認証に移行したため、単純に/chatへリダイレクト
  redirect('/chat')
}