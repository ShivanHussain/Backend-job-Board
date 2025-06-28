import { Schema, model } from 'mongoose';

const ApplicationSchema = new Schema({
  job: { type: Schema.Types.ObjectId, ref: 'Job' },
  applicant: { type: Schema.Types.ObjectId, ref: 'User' },
  resumeUrl: String,
  appliedAt: { type: Date, default: Date.now }
});

export default model('Application', ApplicationSchema);
