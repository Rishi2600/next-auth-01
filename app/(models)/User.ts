import mongoose, {Schema} from "mongoose"

mongoose.connect(process.env.MONGODB_URI ?? "")
mongoose.Promise = global.Promise

const userSchema = new Schema({
    name: String,
    email: String,
    password: String
}, {
    timestamps: true
}
)

const UserModel = mongoose.models.UserModel || mongoose.model("User", userSchema)

export default UserModel