import { useEffect, useMemo } from "react";
import { validateToken } from "@helpers/validateToken";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { RootState } from "@store/store";
import { logOut } from "@store/reducers/user.reducer";
import { AuthOptions } from "@constants";

import Auth from "../Auth";
import Dashboard from "../Dashboard";

const Private = () => {
  const { token } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const isAuthenticated = useMemo(() => {
    return validateToken(token);
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(logOut());
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <Dashboard /> : <Auth mode={AuthOptions.SIGN_UP} />;
};
  
export default Private;
