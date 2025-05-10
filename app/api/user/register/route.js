import connectDB from "../../../utils/database.js";
import { register}  from "../../../controllers/user.js";

//http://localhost:3000/api/user
export async function POST(req) {
  await connectDB();
  return register(req)
}



