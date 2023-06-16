import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please provide firstname"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email`,
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide passowrd"],
      minlength: 6,
      select: false,
    },
    institutions: [
      {
        state: String,
        institution: String,
      },
    ],
    phone: {
      type: String,
      required: [true, "Please provide A Phone "],
    },
    bank: {
      type: String,
    },
    amount: {
      type: Number,
    },
    reference: {
      type: String,
    },
    transactionId: {
      type: Number,
    },
    status: {
      type: String,
    },
    cardType: {
      type: String,
    },
    hasPaid: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//Mongoose document middleware for the "save" hook
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Instance method to create JWT
UserSchema.methods.createJWT = async function () {
  const payload = { userId: this._id, isAdmin: this.isAdmin };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(process.env.JWT_LIFETIME)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  return token;
};

//Instance method to create JWT
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
