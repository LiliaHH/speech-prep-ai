import mongoose, { Schema, model, Document, Model } from 'mongoose';

interface IUser extends Document {
  clerkId: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  photo: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User: Model<IUser> = mongoose.models.User || model<IUser>('User', userSchema);

export default User;