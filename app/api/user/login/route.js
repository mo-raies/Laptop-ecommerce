import { login } from "../../../controllers/user";
import connectDB from "../../../utils/database.js";

// http://localhost:3000/api/user/login
export async function POST(req) {
  await connectDB();
  return login(req)
}


