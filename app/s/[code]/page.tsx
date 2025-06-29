import db from '@/lib/db'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { redirect } from 'next/navigation'

export default async function RedirectPage({ params }: { params: Promise<{ code: string }> }) {
    const { code } = await params
    const docRef = doc(db, "shortUrls", code)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) {
        return <p>Short URL not found.</p>
    }

    const data = snapshot.data()
    await updateDoc(docRef, { clicks: increment(1) })

    redirect(data.originalUrl)
}
