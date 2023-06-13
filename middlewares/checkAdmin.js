import UnAuthorizedError from "@/errors/unauthorized";

const checkAdminPermissions = async (payload) => {
  if (payload.isAdmin) return;
  else {
    throw UnAuthorizedError("You cannot perform this action! ");
  }
};

export default checkAdminPermissions;
