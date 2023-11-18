import instance from "./axios";

export const registerUser = ({
  emailAddress,
  password,
}: {
  emailAddress: string;
  password: string;
}) => {
  return instance.post("/auth/register", {
    emailAddress: emailAddress,
    password: password,
  });
};
