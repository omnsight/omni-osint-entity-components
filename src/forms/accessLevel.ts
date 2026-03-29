import { useTranslation } from "react-i18next";


export const useReadOptions = (isAdmin: boolean) => {
  const { t } = useTranslation();
  return [
    { value: "private", label: t("access.private") },
    ...(isAdmin
      ? [
        { value: "paid", label: t("access.paid") },
        { value: "platform", label: t("access.platform") },
      ]
      : []),
    { value: "public", label: t("access.public") },
  ];
};

export const useWriteOptions = () => {
  const { t } = useTranslation();
  return [
    { value: "private", label: t("access.private") },
    { value: "paid", label: t("access.public") },
  ];
};

export const getAccessLevel = (roles: string[]) => {
  if (roles.includes("guest")) {
    return "public";
  } else if (roles.includes("user")) {
    return "platform";
  } else if (roles.includes("pro")) {
    return "paid";
  } else {
    return "private";
  }
}

export const getRoles = (accessLevel: string | null) => {
  if (accessLevel === "public") {
    return ["guest", "user", "pro", "admin"];
  } else if (accessLevel === "platform") {
    return ["user", "pro", "admin"];
  } else if (accessLevel === "paid") {
    return ["pro", "admin"];
  } else {
    return ["admin"];
  }
}
