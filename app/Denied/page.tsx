
function Denied() {
  return (
    <div className="text-gray-900 bg-red-500 p-2 rounded-md">
        Denied: when the user is authenticated but somehow is denied access on the basis of role based authentication
        Maybe because the user is a normal user and not an admin!
    </div>
  )
}

export default Denied