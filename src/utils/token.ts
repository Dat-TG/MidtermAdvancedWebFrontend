export const removeFullToken = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
}
