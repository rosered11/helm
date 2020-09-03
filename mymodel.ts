import { model, Schema, Document } from "mongoose"

export interface ITodo extends Document {
    name: string
}

const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
)

export default model<ITodo>("Todo", todoSchema)