import UnAuthorizedError from "@/errors/unauthorized";

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser === resourceUserId.toString()) return;
  else {
    throw new UnAuthorizedError("You cannot perform this action!");
  }
};

export default checkPermissions;
