import { AuthContext } from "@/features/auth/AuthProvider";
import { useContext } from "react";

export const useAuth = () => {
	const authContext = useContext(AuthContext);
	if (authContext === undefined) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return authContext;
};
