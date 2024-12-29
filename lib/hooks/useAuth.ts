import { AuthContext } from "@/lib/context/AuthContext";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);
