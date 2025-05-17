import UserForm from "../(components)/Userform"

function Admin() {

  return (
    <>
      <div className="text-gray-900">
        Only access to Admins!
      </div>
      <br />
      <div>
        <UserForm />
      </div>
    </>
  )
}

export default Admin