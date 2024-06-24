import { GraphQLError } from "graphql";
import { Context } from "./interfaces";

export const authResolverWrapper = async (
  context: Context,
  roles: (string | null)[],
  queryFunction: Function,
) => {
  console.log(context);
  console.log(roles);
  console.log(context.role);
  console.log(context.isAuthenticated);
  console.log(roles.find((role) => role === context.role));
  if (context.isAuthenticated && context.role && context.role in roles) {
    console.log(context.role);
    console.log(context.isAuthenticated);
    console.log(context.role in roles);
    return await queryFunction();
  } else {
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
};
