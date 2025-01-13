import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"

async function MemberServer() {

  const session = await getServerSession(options)
  
  if(!session) {
    redirect("/api/auth/signin?callbackUrl=/MemberServer")
  }

  return (
    <div className="text-gray-900">Member Server: Authenticated user page on the server side.</div>
  )
}

export default MemberServer