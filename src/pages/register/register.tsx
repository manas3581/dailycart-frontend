import { useState } from "react";
import { Link } from "react-router";
import { paths } from "../../shared/constants/paths";
import { isValidEmail, isValidPhone } from "../../shared/lib/validation";
import styles from "./register.module.scss";

type Step = "account" | "profile";

export default function Register() {
  const [step, setStep] = useState<Step>("account");
  const [gender, setGender] = useState("");

  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validateAccount() {
    const next: Record<string, string> = {};

    if (!mobile.trim()) {
      next.mobile = "Mobile number is required";
    } else if (!isValidPhone(mobile)) {
      next.mobile = "Enter a valid 10-digit mobile number";
    }

    if (email.trim() && !isValidEmail(email)) {
      next.email = "Enter a valid email address";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleContinue() {
    if (!validateAccount()) return;
    setErrors({});
    setStep("profile");
  }

  function validateProfile() {
    const next: Record<string, string> = {};

    if (!fullName.trim()) {
      next.fullName = "Full name is required";
    }

    if (!password) {
      next.password = "Password is required";
    } else if (password.length < 8) {
      next.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      next.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      next.confirmPassword = "Passwords do not match";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleComplete() {
    if (!validateProfile()) return;
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {step === "account" ? (
          <>
            <div className={styles.left}>
              <p className={styles.badge}>New member access</p>
              <h3 className={styles.leftTitle}>Looks like you&apos;re new here!</h3>
              <p className={styles.leftText}>
                Sign up with your mobile number to get started and unlock member
                benefits.
              </p>
              <ul className={styles.benefits}>
                <li>Earn rewards on your 1st order</li>
                <li>Early access to big sale events</li>
                <li>Personalized recommendations &amp; deals</li>
              </ul>
            </div>

            <div className={styles.right}>
              <h3 className={styles.rightTitle}>Create an Account</h3>
              <p className={styles.rightHint}>
                Enter your mobile number to create your DailyCart account.
              </p>

              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleContinue();
                }}
              >
                <label className={styles.field}>
                  <span className={styles.fieldTop}>
                    <span>Mobile Number *</span>
                    <span className={styles.counter}>{mobile.length}/10</span>
                  </span>
                  <div className={styles.mobileRow}>
                    <span className={styles.country}>+91</span>
                    <input
                      className={styles.boxInput}
                      type="text"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="Enter 10-digit mobile number"
                      value={mobile}
                      onChange={(e) =>
                        setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                    />
                  </div>
                  {errors.mobile && (
                    <span className={styles.error}>{errors.mobile}</span>
                  )}
                </label>

                <label className={styles.field}>
                  <span className={styles.fieldTop}>
                    <span>Email Address (Optional)</span>
                  </span>
                  <span className={styles.fieldSub}>For order invoices</span>
                  <input
                    className={styles.boxInput}
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <span className={styles.error}>{errors.email}</span>
                  )}
                </label>

                <span className={styles.terms}>
                  By continuing, you agree to DailyCart&apos;s Terms of Use and
                  Privacy Policy.
                </span>

                <button type="submit" className={styles.primaryBtn}>
                  CONTINUE →
                </button>
              </form>

              <p className={styles.or}>OR</p>
              <Link to={paths.login} className={styles.secondaryBtn}>
                Existing User? Log in
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={styles.left}>
              <p className={styles.badge}>Step 2 of 2 — almost there!</p>
              <h3 className={styles.leftTitle}>Complete your profile</h3>
              <p className={styles.leftText}>
                A few details help us personalize your shopping experience.
              </p>
              <ul className={styles.benefits}>
                <li>Personalized recommendations &amp; deals</li>
                <li>Faster checkout with saved details</li>
                <li>Exclusive member offers</li>
              </ul>
              <p className={styles.secureNote}>Secured by 256-bit SSL encryption</p>
            </div>

            <div className={styles.right}>
              <button
                type="button"
                className={styles.backLink}
                onClick={() => {
                  setErrors({});
                  setStep("account");
                }}
              >
                ← Back
              </button>

              <div className={styles.passwordHeader}>
                <div>
                  <h3 className={styles.rightTitle}>Set Up Your Profile</h3>
                  <p className={styles.rightHint}>
                    Fill in your details to finalize your account setup.
                  </p>
                </div>
                <span className={styles.stepPill}>Step 2 of 2</span>
              </div>

              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleComplete();
                }}
              >
                <label className={styles.field}>
                  <span className={styles.fieldTop}>
                    <span>Full Name *</span>
                    <span className={styles.counter}>{fullName.length}/50</span>
                  </span>
                  <input
                    className={styles.boxInput}
                    type="text"
                    maxLength={50}
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {errors.fullName && (
                    <span className={styles.error}>{errors.fullName}</span>
                  )}
                </label>

                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Select Gender (Optional)</span>
                  <div className={styles.genderRow}>
                    {["male", "female", "other"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        className={
                          gender === g ? styles.genderActive : styles.genderBtn
                        }
                        onClick={() => setGender(g)}
                      >
                        {g.charAt(0).toUpperCase() + g.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <label className={styles.field}>
                  <span className={styles.fieldTop}>
                    <span>Set a Password *</span>
                    <span className={styles.fieldSub}>Min 8 chars</span>
                  </span>
                  <input
                    className={styles.boxInput}
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <span className={styles.error}>{errors.password}</span>
                  )}
                </label>

                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Confirm Password *</span>
                  <input
                    className={styles.boxInput}
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirmPassword && (
                    <span className={styles.error}>{errors.confirmPassword}</span>
                  )}
                </label>

                <label className={styles.checkRow}>
                  <input type="checkbox" />
                  <span>
                    Keep me updated on sales, price drops, coupons, and order
                    tracking on WhatsApp &amp; SMS.
                  </span>
                </label>

                <button type="submit" className={styles.primaryBtn}>
                  COMPLETE SETUP &amp; START SHOPPING →
                </button>
              </form>

              <p className={styles.footerNote}>
                You can update these details anytime in Account Settings.
              </p>
            </div>
          </>
        )}
      </div>

      <div className={styles.trust}>
        <div className={styles.trustItem}>
          <p className={styles.trustTitle}>100% Authentic</p>
          <p className={styles.trustText}>Products sourced directly</p>
        </div>
        <div className={styles.trustItem}>
          <p className={styles.trustTitle}>Secure Payments</p>
          <p className={styles.trustText}>256-bit encrypted checkout</p>
        </div>
        <div className={styles.trustItem}>
          <p className={styles.trustTitle}>Easy Returns</p>
          <p className={styles.trustText}>Fast instant refunds</p>
        </div>
      </div>
    </div>
  );
}
