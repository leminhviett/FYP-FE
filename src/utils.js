import jwtDecode from "jwt-decode";

export function checkValidToken() {
	const token = localStorage.getItem("token");
	if (!token) return false;

	const sec = jwtDecode(token)["exp"];
	const now = new Date();
	const exp = new Date(sec * 1000);

	if (now > exp) return false;

	return true;
}
