import UnAuthorizedError from "@/errors/unauthorized";

const checkPermissions = (requestUser, resourceUserId) => {
  console.log(requestUser, resourceUserId.toString());
  //   const slicedUserId = JSON.stringify(resourceUserId).slice(1, -1);

  if (requestUser === resourceUserId.toString()) return;
  else {
    throw new UnAuthorizedError("You cannot perform this action!");
  }
};

export default checkPermissions;
