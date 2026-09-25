# Two Prototypes of Password Strength Checker

A simple and interactive **Password Strength Checker** built using **HTML, CSS, and JavaScript**.

The application analyzes a password in real time using multiple security criteria and provides a strength rating along with suggestions for improving the password.

---

## 📌 Project Overview

Weak and reused passwords are common security risks. This project demonstrates how a client-side application can provide users with immediate feedback about password quality.

The Password Strength Checker evaluates:

* Password length
* Uppercase letters
* Lowercase letters
* Numbers
* Special characters
* Common passwords
* Repeated characters
* Predictable/sequential patterns

The result is displayed through a real-time strength meter with five levels:

```text
Very Weak
Weak
Medium
Strong
Very Strong
```

---

## ✨ Features

### 🔐 Password Analysis

The application checks whether the password contains:

* At least 8 characters
* At least 12 characters
* At least 16 characters
* Lowercase letters
* Uppercase letters
* Numbers
* Special characters


## Cybersecurity Concepts

* Password security
* Password complexity
* Common-password detection
* Pattern detection
* Password reuse awareness
* Client-side security validation


---

# ⚙️ How It Works

The application follows this process:

```text
User enters password
        ↓
JavaScript captures input
        ↓
Password is analyzed
        ↓
Regular expressions check characters
        ↓
Length and pattern checks are performed
        ↓
Common password check
        ↓
Security score is calculated
        ↓
Strength level is determined
        ↓
Strength meter is updated
        ↓
Security suggestions are displayed
```
