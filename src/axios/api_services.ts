import instance from "./axios";

export const registerUser = ({
  emailAddress,
  password,
  firstname,
  lastname,
}: {
  emailAddress: string;
  password: string;
  firstname: string;
  lastname: string;
}) => {
  return instance.post("/auth/register", {
    emailAddress: emailAddress,
    password: password,
    firstName: firstname,
    surname: lastname,
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

export const verifyAccessToken = ({ accessToken }: { accessToken: string }) => {
  return instance.get("/user/profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
