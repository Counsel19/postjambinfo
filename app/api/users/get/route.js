import Errorhandler from "@/utils/handleError";
import User from "@/model/user";
import { connectToDB } from "@/utils/connect";
import { StatusCodes } from "http-status-codes";
import auth from "@/middlewares/auth";
import checkAdminPermissions from "@/middlewares/checkAdmin";

export const GET = async (req) => {
  try {
    await connectToDB();

    const payload = await auth();

    checkAdminPermissions(payload);

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");
    const instituteFilter = searchParams.get("instituteFilter");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const pageQuery = searchParams.get("page");
    const limitQuery = searchParams.get("limit");
    let queryObject = {};
    let totalUsers;
    let numOfPages;

    let users;
    if (userId) {
      users = await User.findById(userId);
    } else {
      if (search) {
        const stringSearchFields = ["fullname", "email"];

        const query = {
          $or: [
            ...stringSearchFields.map((field) => ({
              [field]: new RegExp("^" + search, "i"),
            })),
          ],
        };
        queryObject = { ...queryObject, ...query };
      }

      if (instituteFilter && instituteFilter !== "all") {
        console.log(instituteFilter, "instituteFilter");
        queryObject = {
          ...queryObject,
          "institutions.institution": instituteFilter,
        };
      }

      // No AWAIT
      let result = User.find(queryObject);

      // CHAIN CONNDITIONS
      if (sort === "latest") {
        result = result.sort("-createdAt");
      }
      if (sort === "oldest") {
        result = result.sort("createdAt");
      }
      if (sort === "a-z") {
        result = result.sort("institution");
      }
      if (sort === "z-a") {
        result = result.sort("-institution");
      }

      const page = Number(pageQuery) || 1;
      const limit = Number(limitQuery) || 10;
      const skip = (page - 1) * limit;

      result = result.skip(skip).limit(limit);

      totalUsers = await User.countDocuments(queryObject);
      numOfPages = Math.ceil(totalUsers / limit);

      users = await result;
    }

    if (!users) return new Response("Users Not Found", { status: 404 });

    return new Response(JSON.stringify({ users, totalUsers, numOfPages }), {
      status: StatusCodes.OK,
    });
  } catch (error) {
    Errorhandler(error);
  }
};
