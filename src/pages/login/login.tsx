import { useState } from "react";
import { Link } from "react-router";
import { paths } from "../../shared/constants/paths";
import { isValidContact } from "../../shared/lib/validation";
import styles from "./login.module.scss";

export default function Login() {
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validatePasswordLogin() {
    const next: Record<string, string> = {};

    if (!contact.trim()) {
      next.contact = "Email or mobile number is required";
    } else if (!isValidContact(contact)) {
      next.contact = "Enter a valid email or 10-digit mobile number";
    }

    if (!password) {
      next.password = "Password is required";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.left}>
          <h3 className={styles.leftTitle}>Login</h3>
          <p className={styles.leftText}>
            Get access to your Orders, Wishlist and Recommendations
          </p>
        </div>

        <div className={styles.right}>
          <div className={styles.passwordHeader}>
            <h3 className={styles.rightTitle}>Login</h3>
            <button type="button" className={styles.linkBtn}>
              Need help?
            </button>
          </div>

          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              validatePasswordLogin();
            }}
          >
            <input
              className={styles.boxInput}
              type="text"
              placeholder="Enter Email/Mobile number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            {errors.contact && (
              <span className={styles.error}>{errors.contact}</span>
            )}

            <div className={styles.passwordLabelRow}>
              <span className={styles.fieldLabel}>Password</span>
              <button type="button" className={styles.linkBtn}>
                Forgot Password?
              </button>
            </div>

            <input
              className={styles.boxInput}
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}

            <span className={styles.terms}>
              By continuing, you agree to DailyCart&apos;s Terms of Use and
              Privacy Policy.
            </span>

            <button type="submit" className={styles.primaryBtn}>
              LOG IN
            </button>
          </form>

          <p className={styles.createAccount}>
            New to DailyCart?{" "}
            <Link to={paths.register} className={styles.link}>
              Create an account
            </Link>
          </p>
        </div>
      </div>

      <div className={styles.trust}>
        <div className={styles.trustItem}>
          <p className={styles.trustTitle}>100% Authenticated Products</p>
          <p className={styles.trustText}>Products Sourced Dicrectly</p>
        </div>
        <div className={styles.trustItem}>
          <p className={styles.trustTitle}>Secure Payment Methods</p>
          <p className={styles.trustText}>256-bit SSL Encryption</p>
        </div>
        <div className={styles.trustItem}>
          <p className={styles.trustTitle}>Easy Returns and Refunds</p>
          <p className={styles.trustText}>100% Money Back Guarantee</p>
        </div>
      </div>
    </div>
  );
}
