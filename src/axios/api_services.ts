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

export const loginUser = ({
  emailAddress,
  password,
}: {
  emailAddress: string;
  password: string;
}) => {
  return instance.post("/auth/login", {
    userName: emailAddress,
    password: password,
  });
};
