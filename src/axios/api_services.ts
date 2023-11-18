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

export const editUserInformation = ({
  accessToken,
  firstname,
  lastname,
}: {
  accessToken: string;
  firstname: string;
  lastname: string;
}) => {
  return instance.put(
    "/user/edit",
    {
      name: firstname,
      surname: lastname,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const changeUserPassword = ({
  accessToken,
  oldPassword,
  newPassword,
  confirmPassword,
}: {
  accessToken: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  return instance.put(
    "/user/edit/password",
    {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
