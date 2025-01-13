import Link from "next/link"
import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"

async function NavBar() {
    const session = await getServerSession(options)
    
    return (
        <header className="bg-gray-600 text-gray-100">
            <nav className="flex justify-between items-center w-full px-10 py-4">
                <div>My WebSite</div>
                <div className="flex gap-10">
                    <Link href={"/"}>Home</Link>
                    <Link href={"/Admin"}>Admin</Link>
                    <Link href={"/MemberClient"}>Client Member</Link>
                    <Link href={"/MemberServer"}>Server Member</Link>
                    <Link href={"/Denied"}>Denied</Link>
                    {session ? (
                        <Link href={"/api/auth/signout?callbackUrl=/"}>Signout</Link>
                    ):(
                        <Link href={"/api/auth/signin"}>Signin</Link>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default NavBar
//The "header" tag can be used to define the header section of a document or a section,
//whereas the "nav" tag is typically used to define a section of navigation links within the header or other parts of the web page.