import { Schema, model } from 'mongoose';

const JobSchema = new Schema({
  title: String,
  description: String,
  company: String,
  location: String,
  category: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model('Job', JobSchema);
