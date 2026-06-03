const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
      default: () => `user_${Math.random().toString(36).slice(2, 8)}`,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    password: {
      type: String,
      required: false,
      minlength: 6,
    },

    storeName: {
      type: String,
      required: true,
      trim: true,
      default: "MyStore",
    },

    profileImage: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
  },
  {
    timestamps: true,
  },
);

// bcrypt password before save it
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});

// compare password when login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
