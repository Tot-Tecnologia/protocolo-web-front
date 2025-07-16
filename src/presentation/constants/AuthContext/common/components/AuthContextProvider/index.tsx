import { useCallback, useEffect, useMemo, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../AuthContext";
import { Authentication, UiNotification } from "@/domain/usecases";
import { firebaseAuth } from "@/infra/frameworks/firebase";
import { useLoadUserDetailQuery } from "@/presentation/constants/AuthContext/common/hooks/useLoadUserDetailQuery";
import { useAccessToken } from "@/presentation/hooks/useAccessToken";
import { LoadUserDetail } from "@/domain/usecases/loadUserDetail";

type AuthContextProviderProps = {
  authentication: Authentication;
  loadUserDetail: LoadUserDetail;
  uiNotification: UiNotification;
  children: React.ReactNode;
};

export function AuthContextProvider({
  authentication,
  loadUserDetail,
  uiNotification,
  children,
}: AuthContextProviderProps) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loadingFirebaseUser, setLoadingFirebaseUser] = useState(true);

  const [, setAccessToken] = useAccessToken();

  const isAuthenticated = useMemo(() => firebaseUser != null, [firebaseUser]);

  const loadUserDetailQuery = useLoadUserDetailQuery({
    loadUserDetail: loadUserDetail,
    userEmail: firebaseUser?.email,
    enabled: !loadingFirebaseUser && isAuthenticated,
  });

  const signOut = useCallback(async () => {
    await authentication.signOut();
  }, [authentication]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (newFirebaseUser) => {
        if (newFirebaseUser?.emailVerified) {
          setFirebaseUser(newFirebaseUser);
          const newAccessToken = await newFirebaseUser?.getIdToken();
          setAccessToken(newAccessToken ?? "");
        } else {
          setFirebaseUser(null);
          setAccessToken("");
        }
        setLoadingFirebaseUser(false);
      },
    );
    return unsubscribe;
  }, [setAccessToken]);

  useEffect(() => {
    if (loadUserDetailQuery.error) {
      uiNotification.error(loadUserDetailQuery.error?.message);
    }
  }, [loadUserDetailQuery.isError, loadUserDetailQuery.error, uiNotification]);

  const value = useMemo(
    () => ({
      firebaseUser: firebaseUser!,
      protocoloWebUser: loadUserDetailQuery.data!,
      loading: loadingFirebaseUser || loadUserDetailQuery.isFetching,
      signOut: signOut,
      isAuthenticated: isAuthenticated,
    }),
    [
      firebaseUser,
      loadUserDetailQuery.data,
      loadUserDetailQuery.isFetching,
      loadingFirebaseUser,
      isAuthenticated,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
