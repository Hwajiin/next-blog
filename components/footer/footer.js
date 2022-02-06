import { useAuth } from "../../context/auth";
import styles from "./footer.module.scss";
import Button from "../../module/button/button";
import CustomLink from "../../module/link/link";
import { useRouter } from "next/router";

export default function Footer() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const logoutHandler = () => {
    logout();
    if (!isAuthenticated) {
      router.push("/");
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col_sm_4}>
            {isAuthenticated ? (
              <>
                <CustomLink name="✏️" path="/write" label="글쓰기" />
                <Button name="로그아웃" clickHandler={logoutHandler} />
              </>
            ) : (
              <CustomLink name="로그인" path="/login" />
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
