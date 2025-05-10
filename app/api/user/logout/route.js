import { logout } from "../../../controllers/user";
import connectDB from "../../../utils/database.js";

//http://localhost:3000/api/user/logout
export async function GET(req) {
  await connectDB();
  return logout(req);
}